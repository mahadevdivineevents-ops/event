export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, phone, email, service, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Fields missing.' });
  }

  const whatsappNumber = '917296095910'; // 👈 Apna number daalo

  const whatsappMessage =
`🌟 *New Enquiry — Mahadev Divine Events* 🌟

👤 *Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email || 'Not provided'}
💍 *Service:* ${service || 'Not specified'}

💬 *Message:*
${message}

⏰ *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

  return res.status(200).json({ success: true, whatsappUrl });
}