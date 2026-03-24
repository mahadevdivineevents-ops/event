import Link from 'next/link';
import { FaPhone, FaWhatsapp, FaInstagram, FaFacebook, FaYoutube, FaOm, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative mt-20 md:mt-28 lg:mt-32 pt-12 md:pt-16 lg:pt-24 bg-dark-500 overflow-hidden border-t border-amber-500/20">
      {/* Background gradient accent */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,148,10,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Top section */}
      <div className="relative z-10 max-w-full mx-auto px-4 md:px-6 py-32 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 group">
            <div className="flex items-center gap-3 mb-6 transform transition-transform duration-300 group-hover:-translate-y-1">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #b8860b, #ffd700)' }}>
                <FaOm className="text-black text-xl" />
              </div>
              <div>
                <div className="font-display font-bold text-base tracking-widest bg-linear-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">MAHADEV</div>
                <div className="font-sans text-xs tracking-[0.2em] text-amber-500/70 uppercase font-semibold">Divine Events</div>
              </div>
            </div>
            <p className="font-sans text-sm text-amber-100/60 leading-relaxed mb-6 transition-colors duration-300">
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
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 backdrop-blur-sm border group"
                  style={{ 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(212,160,23,0.3)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = color;
                    e.currentTarget.style.background = `rgba(${parseInt(color.slice(1,3),16)},${parseInt(color.slice(3,5),16)},${parseInt(color.slice(5,7),16)},0.15)`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(212,160,23,0.3)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  <Icon style={{ color }} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-amber-400 mb-6 flex items-center gap-2 transition-all duration-300">
              <span className="w-6 h-px bg-linear-to-r from-amber-500 to-transparent" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Gallery', 'Contact', 'Admin Panel'].map((item) => (
                <li key={item} className="transform transition-all duration-300 hover:translate-x-1">
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
                    className="font-sans text-sm text-amber-100/60 hover:text-amber-300 transition-colors duration-300 flex items-center gap-2 relative"
                  >
                    <span className="text-amber-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">◆</span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="group">
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-amber-400 mb-6 flex items-center gap-2 transition-all duration-300">
              <span className="w-6 h-px bg-linear-to-r from-amber-500 to-transparent" />
              Our Services
            </h4>
            <ul className="space-y-3">
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
                  <li key={s} className="transform transition-all duration-300 hover:translate-x-1">
                    <Link href="/services" className="font-sans text-sm text-amber-100/60 hover:text-amber-300 transition-colors duration-300 flex items-center gap-2">
                      <span className="text-amber-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">◆</span>
                      {s}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* service area */}
          <div className="group">
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-amber-400 mb-6 flex items-center gap-2 transition-all duration-300">
              <span className="w-6 h-px bg-linear-to-r from-amber-500 to-transparent" />
              SERVICE AREA
            </h4>
            <ul className="space-y-3">
              {['Madhubani','Darbhanga', 'Sithmarhi','We proudly serve Madhubani,Darbhanga,Sitamarhi and surrounding regions. Contact us to discuss your event location and how we can assist you'].map((s) => (
                  <li key={s} className="transform transition-all duration-300 hover:translate-x-1">
                    <Link href="#" className="font-sans text-sm text-amber-100/60 hover:text-amber-300 transition-colors duration-300 flex  gap-2">
                      <span className="text-amber-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">◆</span>
                      {s}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="group">
            <h4 className="font-display text-sm tracking-[0.2em] uppercase text-amber-400 mb-6 flex items-center gap-2 transition-all duration-300">
              <span className="w-6 h-px bg-linear-to-r from-amber-500 to-transparent" />
              Get In Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group/item transform transition-all duration-300 hover:translate-x-1">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-amber-700 flex items-center justify-center shrink-0 group-hover/item:shadow-lg group-hover/item:shadow-amber-500/30 transition-all duration-300">
                  <FaOm className="text-white text-sm" />
                </div>
                <span className="font-sans text-sm text-amber-100/60 hover:text-amber-300 transition-colors">A Vision By- Gautam Kumar Sahu</span>
              </li>
              <li className="flex items-start gap-3 group/item transform transition-all duration-300 hover:translate-x-1">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-amber-700 flex items-center justify-center shrink-0 mt-1 group-hover/item:shadow-lg group-hover/item:shadow-amber-500/30 transition-all duration-300">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                <span className="font-sans text-sm text-amber-100/60">Barhuliya, Arer, Madhubani-847222</span>
              </li>
              <li className="flex items-center gap-3 group/item transform transition-all duration-300 hover:translate-x-1">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-amber-500 to-amber-700 flex items-center justify-center shrink-0 group-hover/item:shadow-lg group-hover/item:shadow-amber-500/30 transition-all duration-300">
                  <FaPhone className="text-white text-sm" />
                </div>
                <a href="tel:+917296095910" className="font-sans text-sm text-amber-100/60 hover:text-amber-300 transition-colors">+91 7296095910</a>
              </li>
              <li className="flex items-center gap-3 group/item transform transition-all duration-300 hover:translate-x-1">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-green-500 to-green-700 flex items-center justify-center shrink-0 group-hover/item:shadow-lg group-hover/item:shadow-green-500/30 transition-all duration-300">
                  <FaWhatsapp className="text-white text-sm" />
                </div>
                <a href="https://wa.me/917296095910" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-amber-100/60 hover:text-amber-300 transition-colors">WhatsApp Us</a>
              </li>
              <li className="flex items-center gap-3 group/item transform transition-all duration-300 hover:translate-x-1">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-500 to-red-700 flex items-center justify-center shrink-0 group-hover/item:shadow-lg group-hover/item:shadow-red-500/30 transition-all duration-300">
                  <FaEnvelope className="text-white text-sm" />
                </div>
                <a href="mailto:mahadevdivineevents@gmail.com" className="font-sans text-sm text-amber-100/60 hover:text-amber-300 transition-colors break-all">mahadevdivineevents@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-amber-100/40 tracking-wide text-center sm:text-left transition-colors duration-300 hover:text-amber-100/60">
            © {new Date().getFullYear()} Mahadev Divine Events. All Rights Reserved.
          </p>
          <p className="font-sans text-xs text-amber-100/40 tracking-wide flex items-center gap-1 transition-colors duration-300 hover:text-amber-100/60">
            Crafted with <span className="text-amber-400 animate-pulse">♥</span> for Divine Celebrations
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