import Link from 'next/link';
import { FaPhone, FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaOm, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(212,160,23,0.2)' }}>
      {/* Top section */}
      <div className="max-w-full mx-auto px-3 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #b8860b, #ffd700)' }}>
                <FaOm className="text-black text-xl" />
              </div>
              <div>
                <div className="font-display font-bold text-base tracking-widest text-gold-gradient">MAHADEV</div>
                <div className="font-sans text-xs tracking-[0.2em] text-amber-400/60 uppercase">Divine Events</div>
              </div>
            </div>
            <p className="font-sans text-sm text-amber-100/50 leading-relaxed mb-5">
              Transforming your dreams into divine celebrations. Every detail crafted with love and artistry.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaInstagram, href: '#', color: '#E1306C' },
                { icon: FaFacebook, href: '#', color: '#1877F2' },
                { icon: FaYoutube, href: '#', color: '#FF0000' },
                { icon: FaWhatsapp, href: 'https://wa.me/917296095910', color: '#25D366' },
              ].map(({ icon: Icon, href, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,160,23,0.2)' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,160,23,0.2)'}
                >
                  <Icon style={{ color }} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-amber-400 mb-5">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Services', 'Gallery', 'Contact', 'Admin Panel'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                    className="font-sans text-sm text-amber-100/50 hover:text-amber-300 transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="text-amber-600 text-xs">◆</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-amber-400 mb-5">Our Services</h4>
            <ul className="space-y-2">
              {['Wedding Planning',
                'Haldi Mehendi Decoration',
                'Engagement Ceremony',
                'Birthday Decoration',
                'Bridal Makeup',
                'Wedding Car Booking',
                'DJ & Sound System',
                'Photography',
                'Catering',
                'Event Management',
                'Pre Wedding Photoshoot',].map((s) => (
                  <li key={s}>
                    <Link href="/services" className="font-sans text-sm text-amber-100/50 hover:text-amber-300 transition-colors duration-300 flex items-center gap-2">
                      <span className="text-amber-600 text-xs">◆</span>
                      {s}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* service area */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-amber-400 mb-5">SERVICE AREA</h4>
            <ul className="space-y-2">
              {['Madhubani','Darbhanga', 'Sithmarhi','We proudly serve Madhubani,Darbhanga,Sitamarhi and surrounding regions. Contact us to discuss your event location and how we can assist you'].map((s) => (
                  <li key={s}>
                    <Link href="#" className="font-sans text-sm text-amber-100/50 hover:text-amber-300 transition-colors duration-300 flex  gap-2">
                      <span className="text-amber-600 text-xs">◆</span>
                      {s}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-amber-400 mb-5">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" size={14} />
                <span className="font-sans text-sm text-amber-100/50">Barhuliya, Arer, Madhubani-847222</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-amber-500 flex-shrink-0" size={14} />
                <a href="tel:+917296095910" className="font-sans text-sm text-amber-100/50 hover:text-amber-300 transition-colors">+91 7296095910</a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-amber-500 flex-shrink-0" size={14} />
                <a href="https://wa.me/917296095910" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-amber-100/50 hover:text-amber-300 transition-colors">WhatsApp Us</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-amber-500 flex-shrink-0" size={14} />
                <a href="mailto:mahadevdivineevents@gmail.com" className="font-sans text-sm text-amber-100/50 hover:text-amber-300 transition-colors">mahadevdivineevents@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(212,160,23,0.1)' }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-amber-100/30 tracking-wide">
            © {new Date().getFullYear()} Mahadev Divine Events. All Rights Reserved.
          </p>
          <p className="font-sans text-xs text-amber-100/30 tracking-wide flex items-center gap-1">
            Crafted with <span className="text-amber-500">♥</span> for Divine Celebrations
          </p>
        </div>
      </div>

      {/* Floating buttons */}
      <a
        href="https://wa.me/917296095910?text=Hello%2C%20I%20am%20interested%20in%20your%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp"
      >
        <FaWhatsapp color="white" size={28} />
      </a>
      <a href="tel:+917296095910" className="call-float" aria-label="Call Us">
        <FaPhone color="#0a0a0a" size={22} />
      </a>
    </footer>
  );
}