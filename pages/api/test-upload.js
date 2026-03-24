import { v2 as cloudinary } from 'cloudinary';

export default async function handler(req, res) {
  const results = {};

  // 1. Check env variables
  results.env = {
    MONGODB_URI: process.env.MONGODB_URI ? '✅ Set' : '❌ Missing',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing',
  };

  // 2. Check MongoDB
  try {
    const dbConnect = (await import('../../lib/mongodb')).default;
    await dbConnect();
    results.mongodb = '✅ Connected';
  } catch (e) {
    results.mongodb = '❌ ' + e.message;
  }

  // 3. Check Cloudinary
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const ping = await cloudinary.api.ping();
    results.cloudinary = '✅ Connected - ' + JSON.stringify(ping);
  } catch (e) {
    results.cloudinary = '❌ ' + e.message;
  }

  return res.status(200).json(results);
}