import dbConnect from '../../lib/mongodb';
import Image from '../../lib/models/Image';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const { service } = req.query;
    const filter = service ? { service } : {};
    const images = await Image.find(filter).sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, images });
  } catch (error) {
    console.error('GET /api/images error:', error);
    return res.status(500).json({ success: false, message: 'Server error', images: [] });
  }
}