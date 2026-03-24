import dbConnect from '../../../lib/mongodb';
import ImageModel from '../../../lib/models/Image';
import path from 'path';
import fs from 'fs';

export const config = {
  api: { bodyParser: false },
};

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let body = '';
    const boundary = req.headers['content-type']?.split('boundary=')[1];

    if (!boundary) return reject(new Error('No boundary found'));

    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const fields = {};
      const files = {};

      const boundaryBuffer = Buffer.from('--' + boundary);
      const parts = [];
      let start = 0;

      for (let i = 0; i <= buffer.length - boundaryBuffer.length; i++) {
        if (buffer.slice(i, i + boundaryBuffer.length).equals(boundaryBuffer)) {
          if (start > 0) parts.push(buffer.slice(start, i - 2));
          start = i + boundaryBuffer.length + 2;
        }
      }

      parts.forEach(part => {
        const headerEnd = part.indexOf('\r\n\r\n');
        if (headerEnd === -1) return;

        const headerStr = part.slice(0, headerEnd).toString();
        const data = part.slice(headerEnd + 4);

        const nameMatch = headerStr.match(/name="([^"]+)"/);
        const filenameMatch = headerStr.match(/filename="([^"]+)"/);

        if (!nameMatch) return;
        const name = nameMatch[1];

        if (filenameMatch) {
          const filename = filenameMatch[1];
          const ext = path.extname(filename);
          const newFilename = `upload_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
          const uploadDir = path.join(process.cwd(), 'public', 'uploads');
          if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
          const filepath = path.join(uploadDir, newFilename);
          fs.writeFileSync(filepath, data);
          files[name] = { filepath, originalFilename: filename, newFilename };
        } else {
          fields[name] = data.toString().trim();
        }
      });

      resolve({ fields, files });
    });

    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const { fields, files } = await parseForm(req);

    const service = fields.service;
    const caption = fields.caption || '';

    if (!service) {
      return res.status(400).json({ success: false, message: 'Service is required' });
    }

    const imageFile = files.image;
    if (!imageFile) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }

    const url = `/uploads/${imageFile.newFilename}`;

    const newImage = await ImageModel.create({
      service,
      filename: imageFile.originalFilename,
      url,
      caption,
    });

    return res.status(201).json({ success: true, image: newImage });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: 'Upload failed: ' + error.message });
  }
}