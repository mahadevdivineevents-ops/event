import dbConnect from '../../../lib/mongodb';
import ImageModel from '../../../lib/models/Image';
import { v2 as cloudinary } from 'cloudinary';

export const config = {
  api: { 
    bodyParser: false,
    sizeLimit: '10mb',
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Robust multipart parser — works on all browsers including mobile
function parseForm(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on('data', chunk => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on('error', reject);
    req.on('end', () => {
      try {
        const buffer = Buffer.concat(chunks);
        const contentType = req.headers['content-type'] || '';

        // Extract boundary — handle different formats
        let boundary = '';
        const boundaryMatch = contentType.match(/boundary=([^\s;]+)/i);
        if (boundaryMatch) {
          boundary = boundaryMatch[1].replace(/"/g, '');
        }

        if (!boundary) {
          return reject(new Error('No boundary in content-type: ' + contentType));
        }

        const fields = {};
        const files = {};

        // Split by boundary
        const boundaryBuf = Buffer.from('--' + boundary);
        const CRLF = Buffer.from('\r\n');
        const doubleCRLF = Buffer.from('\r\n\r\n');

        let searchStart = 0;
        const partStarts = [];

        // Find all boundary positions
        while (searchStart < buffer.length) {
          const pos = buffer.indexOf(boundaryBuf, searchStart);
          if (pos === -1) break;
          partStarts.push(pos + boundaryBuf.length);
          searchStart = pos + 1;
        }

        // Parse each part
        for (let i = 0; i < partStarts.length; i++) {
          let start = partStarts[i];

          // Skip \r\n after boundary
          if (buffer[start] === 13 && buffer[start + 1] === 10) start += 2;
          // Skip -- (end boundary)
          if (buffer[start] === 45 && buffer[start + 1] === 45) continue;

          const end = i + 1 < partStarts.length
            ? partStarts[i + 1] - boundaryBuf.length - 2
            : buffer.length;

          const part = buffer.slice(start, end);
          const headerEnd = part.indexOf(doubleCRLF);
          if (headerEnd === -1) continue;

          const headers = part.slice(0, headerEnd).toString('utf8');
          let data = part.slice(headerEnd + 4);

          // Remove trailing \r\n
          if (data[data.length - 2] === 13 && data[data.length - 1] === 10) {
            data = data.slice(0, -2);
          }

          const nameMatch = headers.match(/name="([^"]+)"/i);
          const filenameMatch = headers.match(/filename="([^"]*)"/) ||
                                headers.match(/filename\*=UTF-8''([^\r\n;]+)/i);
          const contentTypeMatch = headers.match(/Content-Type:\s*([^\r\n]+)/i);

          if (!nameMatch) continue;

          const fieldName = nameMatch[1];

          if (filenameMatch) {
            const mimeType = contentTypeMatch
              ? contentTypeMatch[1].trim()
              : 'image/jpeg';
            let filename = filenameMatch[1];
            try { filename = decodeURIComponent(filename); } catch {}

            files[fieldName] = {
              buffer: data,
              originalFilename: filename || 'upload.jpg',
              mimeType,
            };
          } else {
            fields[fieldName] = data.toString('utf8').trim();
          }
        }

        resolve({ fields, files });
      } catch (err) {
        reject(err);
      }
    });
  });
}

function uploadToCloudinary(buffer, mimeType) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'mahadev-divine-events',
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'],
      },
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
    if (!imageFile || !imageFile.buffer || imageFile.buffer.length === 0) {
      return res.status(400).json({ success: false, message: 'Image file is required' });
    }

    // Upload to Cloudinary
    const cloudResult = await uploadToCloudinary(imageFile.buffer, imageFile.mimeType);

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
    console.error('Upload error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Upload failed: ' + error.message,
    });
  }
}