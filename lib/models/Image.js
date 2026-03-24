import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
    enum: [
      'Wedding Planning',
      'Haldi Mehendi Decoration',
      'Engagement Ceremony',
      'Birthday Decoration',
      'Bridal Makeup',
      'Wedding Car Booking',
      'DJ & Sound System',
      'Photography',
      'Catering',
      'Event Management',
      'Pre Wedding Photoshoot',
    ],
  },
  filename: { type: String, required: true },
  url: { type: String, required: true },
  publicId: { type: String },
  caption: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);