import dbConnect from '../../../lib/mongodb';
import ImageModel from '../../../lib/models/Image';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    await dbConnect();

    const image = await ImageModel.findById(id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Delete from Cloudinary if publicId exists
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await ImageModel.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Image deleted' });

  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ success: false, message: 'Delete failed: ' + error.message });
  }
}