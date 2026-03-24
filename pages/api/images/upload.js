import dbConnect from '../../../lib/mongodb';
import ImageModel from '../../../lib/models/Image';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: { bodyParser: false },
};

// Pure Node.js multipart parser — no external dependencies
function parseForm(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const boundary = req.headers['content-type']?.split('boundary=')[1];
    if (!boundary) return reject(new Error('No boundary found'));

    req.on('data', chunk => chunks.push(chunk));
    req.on('error', reject);
    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const fields = {};
      const files = {};

      const boundaryBuf = Buffer.from('--' + boundary);
      const parts = [];
      let start = 0;

      for (let i = 0; i <= buffer.length - boundaryBuf.length; i++) {
        if (buffer.slice(i, i + boundaryBuf.length).equals(boundaryBuf)) {
          if (start > 0) parts.push(buffer.slice(start, i - 2));
          start = i + boundaryBuf.length + 2;
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
          files[name] = { buffer: data, originalFilename: filenameMatch[1] };
        } else {
          fields[name] = data.toString().trim();
        }
      });

      resolve({ fields, files });
    });
  });
}

// Buffer to Cloudinary using upload_stream
function uploadToCloudinary(buffer, folder = 'mahadev-divine-events') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
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

    // Upload to Cloudinary
    const cloudResult = await uploadToCloudinary(imageFile.buffer);

    // Save to MongoDB
    const newImage = await ImageModel.create({
      service,
      filename: imageFile.originalFilename,
      url: cloudResult.secure_url,
      publicId: cloudResult.public_id,
      caption,
    });

    return res.status(201).json({ success: true, image: newImage });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: 'Upload failed: ' + error.message });
  }
}