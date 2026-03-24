import { v2 as cloudinary } from 'cloudinary';

export default async function handler(req, res) {

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload a tiny 1x1 red pixel PNG to test
  const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==';

  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'mahadev-test',
      public_id: 'test-pixel',
      overwrite: true,
    });
    return res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (e) {
    return res.status(200).json({
      success: false,
      error: e.message,
      http_code: e.http_code,
    });
  }
}