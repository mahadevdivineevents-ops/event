import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { GiDiamondRing} from 'react-icons/gi';

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`animate-on-scroll ${className}`}>{children}</div>;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('sending');
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (data.success) {
      setStatus('success');
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
      window.open(data.whatsappUrl, '_blank'); // WhatsApp open hoga
    } else {
      setStatus('error');
    }
  } catch {
    setStatus('error');
  }
};

  return (
    <Layout title="Contact Us - Mahadev Divine Events" description="Get in touch with Mahadev Divine Events for your dream wedding">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6" style={{ background: 'linear-gradient(180deg, #0a0500 0%, #0a0a0a 100%)' }}>
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,5,0,0.9) 0%, rgba(10,10,10,1) 100%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #d4a017)' }} />
            <GiDiamondRing className="text-amber-400" size={18} />
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
          </div>
          <p className="section-subtitle mb-3">Reach Out to Us</p>
          <h1 className="section-title text-gold-gradient mb-5">Let's Create Something Divine</h1>
          <p className="font-sans text-sm text-amber-100/50 max-w-2xl mx-auto leading-relaxed">
            Ready to plan your perfect celebration? We'd love to hear from you. Reach out through any channel below and our team will respond within 2 hours.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              {
                icon: FaPhone,
                title: 'Call Us',
                line1: '+917296095910',
                href: 'tel:+917296095910',
                action: 'Call Now',
              },
              {
                icon: FaWhatsapp,
                title: 'WhatsApp',
                line1: '+917296095910',
                line2: 'Chat with us instantly',
                href: 'https://wa.me/917296095910',
                action: 'Chat Now',
                green: true,
              },
              {
                icon: FaEnvelope,
                title: 'Email Us',
                line1: 'mahadevdivineevents@gmail.com',
                line2: 'We reply within 2 hours',
                href: 'mailto:mahadevdivineevents@gmail.com',
                action: 'Send Email',
              },
              {
                icon: FaClock,
                title: 'Working Hours',
                line1: 'Mon–Sat: 9am – 9pm',
                line2: 'Sun: 10am – 6pm',
                href: null,
                action: null,
              },
            ].map((card, i) => (
              <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="contact-card group">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: card.green ? 'rgba(37,211,102,0.15)' : 'rgba(212,160,23,0.15)',
                      border: card.green ? '1px solid rgba(37,211,102,0.35)' : '1px solid rgba(212,160,23,0.35)',
                    }}>
                    <card.icon className={card.green ? 'text-green-400 text-2xl' : 'text-amber-400 text-2xl'} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-amber-300 mb-3 group-hover:text-amber-200 transition-colors">{card.title}</h3>
                  <p className="font-sans text-sm text-amber-100/75 font-medium mb-1">{card.line1}</p>
                  <p className="font-sans text-xs text-amber-100/50 mb-5">{card.line2}</p>
                  {card.href && card.action && (
                    <a
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 hover:gap-2 ${
                        card.green ? 'text-green-400 hover:text-green-300' : 'text-amber-400 hover:text-amber-300'
                      }`}
                    >
                      {card.action} →
                    </a>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Form + Map Grid */}
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="admin-card">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-gold-gradient mb-2">Send a Message</h2>
                <p className="font-sans text-sm text-amber-100/50 mb-10">Fill in your details and we'll get back to you shortly.</p>

                {status === 'success' ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"
                      style={{ background: 'linear-gradient(135deg,rgba(212,160,23,0.3),rgba(255,215,0,0.1))', border: '2px solid rgba(212,160,23,0.5)' }}>
                      <FaPaperPlane className="text-amber-400 text-3xl" />
                    </div>
                    <h3 className="font-display text-2xl text-amber-300 mb-3">Message Sent!</h3>
                    <p className="font-sans text-sm text-amber-100/60 mb-8">Thank you for reaching out. We'll contact you within 2 hours and open WhatsApp if available.</p>
                    <button onClick={() => setStatus('idle')} className="btn-gold">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="font-sans text-xs text-amber-400/70 tracking-widest uppercase font-semibold mb-3 block">Your Name *</label>
                        <input
                          className="admin-input"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="font-sans text-xs text-amber-400/70 tracking-widest uppercase font-semibold mb-3 block">Phone Number *</label>
                        <input
                          className="admin-input"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 00000 00000"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-sans text-xs text-amber-400/70 tracking-widest uppercase font-semibold mb-3 block">Email Address</label>
                      <input
                        className="admin-input"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="font-sans text-xs text-amber-400/70 tracking-widest uppercase font-semibold mb-3 block">Service Interested In</label>
                      <select
                        className="admin-input"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="" style={{ background: '#1a1a1a' }}>Select a Service</option>
                        {['Wedding Planning','Haldi Mehendi Decoration','Engagement Ceremony','Birthday Decoration','Bridal Makeup','Wedding Car Booking','DJ & Sound System','Photography','Catering','Event Management','Pre Wedding Photoshoot'].map(s => (
                          <option key={s} value={s} style={{ background: '#1a1a1a' }}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-sans text-xs text-amber-400/70 tracking-widest uppercase font-semibold mb-3 block">Your Message *</label>
                      <textarea
                        className="admin-input resize-none"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your event, date, venue ideas..."
                        rows={5}
                        required
                      />
                    </div>
                    {status === 'error' && (
                      <p className="font-sans text-sm text-red-400/80 bg-red-400/10 border border-red-400/30 px-4 py-3">Something went wrong. Please try WhatsApp or call us directly.</p>
                    )}
                    <button
                      type="submit"
                      className="btn-gold w-full flex items-center justify-center gap-2 h-12"
                      disabled={status === 'sending'}
                    >
                      {status === 'sending' ? (
                        <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Sending...</>
                      ) : (
                        <><FaPaperPlane size={16} /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Map + Address */}
            <AnimatedSection>
              <div className="space-y-6">
                {/* Map */}
                <div style={{ border: '1px solid rgba(212,160,23,0.25)', overflow: 'hidden', height: '320px' }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d424.50172268306005!2d85.98498970095845!3d26.43016933391405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1774251207079!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'grayscale(1) invert(0.85) contrast(1.1)' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mahadev Divine Events Location"
                  />
                </div>

                {/* Address Card */}
                <div className="luxury-card p-7">
                  <h3 className="font-display text-xl font-bold text-amber-300 mb-5">Visit Our Office</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <FaMapMarkerAlt className="text-amber-500 mt-1 shrink-0" size={16} />
                      <div>
                        <p className="font-sans text-sm font-medium text-amber-200">Address</p>
                        <p className="font-sans text-sm text-amber-100/50 mt-1">Barhuliya, Arer, Madhubani-847222</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <FaPhone className="text-amber-500 mt-1 shrink-0" size={16} />
                      <div>
                        <p className="font-sans text-sm font-medium text-amber-200">Phone</p>
                        <a href="tel:+917296095910" className="font-sans text-sm text-amber-100/50 hover:text-amber-300 transition-colors">+91 7296095910</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <FaWhatsapp className="text-amber-500 mt-1 shrink-0" size={16} />
                      <div>
                        <p className="font-sans text-sm font-medium text-amber-200">WhatsApp</p>
                        <a href="https://wa.me/917296095910" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-amber-100/50 hover:text-amber-300 transition-colors">
                          Chat Instantly
                        </a>
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/917296095910?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold flex items-center justify-center gap-2 w-full mt-6 no-underline"
                    style={{ background: 'linear-gradient(135deg, #1a8a40, #25D366)' }}
                  >
                    <FaWhatsapp size={18} /> WhatsApp Us Now
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}