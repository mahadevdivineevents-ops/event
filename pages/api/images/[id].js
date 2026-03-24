import dbConnect from '../../../lib/mongodb';
import ImageModel from '../../../lib/models/Image';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'DELETE') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    const image = await ImageModel.findById(id);
    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Delete physical file if stored locally
    if (image.url && image.url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', image.url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await ImageModel.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ success: false, message: 'Delete failed: ' + error.message });
  }
}