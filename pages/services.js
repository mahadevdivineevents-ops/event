import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import { GiDiamondRing} from 'react-icons/gi';

const SERVICES = [
  {
    id: 'wedding-planning',
    title: 'Wedding Planning',
    subtitle: 'Complete Wedding Management',
    description: 'From the first meeting to the final farewell, our expert wedding planners craft every detail of your special day. We handle venue selection, vendor coordination, decor, catering, and more — so you can focus on the joy of the moment.',
    features: ['Venue selection & booking', 'Full decor & theme design', 'Vendor coordination', 'Day-of event management', 'Guest management'],
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
    ],
  },
  {
    id: 'haldi-mehendi',
    title: 'Haldi Mehendi Decoration',
    subtitle: 'Vibrant Traditional Ceremonies',
    description: 'Celebrate the beautiful traditional ceremonies with our vibrant, colourful decorations. We create authentic and Instagram-worthy setups for Haldi and Mehendi functions that bring together tradition and modern aesthetics.',
    features: ['Floral backdrops & stages', 'Traditional props & setup', 'Marigold flower arrangements', 'Photography-ready setups', 'Customised colour themes'],
    images: [
      'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=600&q=80',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
    ],
  },
  {
    id: 'engagement',
    title: 'Engagement Ceremony',
    subtitle: 'Romantic & Elegant Settings',
    description: 'Make your engagement as memorable as your wedding. We design luxurious, romantic spaces that tell your love story perfectly. Our engagement packages include stage decor, lighting, floral arrangements, and complete event coordination.',
    features: ['Ring ceremony stage design', 'Romantic lighting setups', 'Premium floral décor', 'Cake & dessert table', 'Photo booth & backdrops'],
    images: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
    ],
  },
  {
    id: 'birthday',
    title: 'Birthday Decoration',
    subtitle: 'Celebrate Every Year in Style',
    description: 'From children\'s fairy-tale birthdays to milestone adult celebrations, we create custom birthday setups that wow. Our team handles balloon art, thematic backdrops, lighting, table setups, and more for a perfect celebration.',
    features: ['Theme-based decoration', 'Balloon art & garlands', 'LED lighting setups', 'Backdrop & photo booths', 'Cake & dessert tables'],
    images: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80',
    ],
  },
  {
    id: 'bridal-makeup',
    title: 'Bridal Makeup',
    subtitle: 'Flawless Bridal Beauty',
    description: 'Look and feel absolutely stunning on your special day with our expert bridal makeup artists. We offer complete bridal beauty packages that include traditional and contemporary styles tailored to your skin tone and preferences.',
    features: ['Traditional & contemporary looks', 'HD airbrush makeup', 'Hair styling & setting', 'Full bridal trousseau help', 'Pre-wedding trial session'],
    images: [
      'https://images.unsplash.com/photo-1487530811015-780f1b92fb3c?w=600&q=80',
      'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&q=80',
    ],
  },
  {
    id: 'car-booking',
    title: 'Wedding Car Booking',
    subtitle: 'Luxury Rides for Your Big Day',
    description: 'Arrive in style with our exclusive range of decorated wedding cars. From vintage classics to modern luxury vehicles, we provide the perfect chariot for the couple with elegant floral decorations and professional drivers.',
    features: ['Vintage & luxury car fleet', 'Custom floral decoration', 'Chauffeur-driven service', 'Airport & venue transfers', 'Baraat procession vehicles'],
    images: [
      'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&q=80',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',
    ],
  },
  {
    id: 'dj-sound',
    title: 'DJ & Sound System',
    subtitle: 'Premium Audio Experiences',
    description: 'Set the perfect mood with our professional DJ services and state-of-the-art sound systems. Our experienced DJs read the crowd and mix the perfect soundtrack for every moment of your celebration — from emotional first dances to high-energy dance floors.',
    features: ['Professional DJ & MC', 'Premium sound systems', 'LED dance floors & lighting', 'Custom playlist curation', 'Live music integration'],
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    ],
  },
  {
    id: 'photography',
    title: 'Photography',
    subtitle: 'Timeless Memories Captured',
    description: 'Our award-winning photographers and videographers capture every emotion, every stolen glance, every laugh with cinematic artistry. We deliver stunning galleries, highlight films, and same-day edits that you\'ll treasure for a lifetime.',
    features: ['Pre-wedding photoshoots', 'Cinematic videography', 'Drone photography', 'Album design & printing', 'Same-day edit reels'],
    images: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
    ],
  },
  {
    id: 'catering',
    title: 'Catering',
    subtitle: 'Culinary Excellence',
    description: 'Delight your guests with exquisite culinary experiences. From traditional Indian feasts to multi-cuisine spreads, our expert chefs craft menus that are as memorable as the occasion. We handle everything from live counters to elaborate buffets.',
    features: ['Multi-cuisine menus', 'Live food stations', 'Dessert & sweet counters', 'Bar & beverage service', 'Dietary accommodations'],
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80',
    ],
  },
  {
    id: 'event-management',
    title: 'Event Management',
    subtitle: 'Flawless Execution Every Time',
    description: 'Beyond weddings, we manage corporate events, social gatherings, product launches, and milestone celebrations. Our end-to-end event management ensures every event is executed flawlessly from conception to completion.',
    features: ['Corporate event planning', 'Brand activations', 'Stage & AV management', 'Guest management systems', 'Full logistical support'],
    images: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80',
    ],
  },
  {
    id: 'pre-wedding',
    title: 'Pre Wedding Photoshoot',
    subtitle: 'Your Love Story in Frames',
    description: 'Celebrate your journey together with a stunning pre-wedding photoshoot. We scout breathtaking locations, handle styling, and create a cinematic story that perfectly captures your bond before the big day.',
    features: ['Location scouting & booking', 'Outfit & styling guidance', 'Creative concept design', 'Professional editing', 'Teaser videos & reels'],
    images: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    ],
  },
];

function AnimatedSection({ children, className = '', style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`animate-on-scroll ${className}`} style={style}>{children}</div>;
}

export default function Services() {
  const [activeService, setActiveService] = useState(null);

  return (
    <Layout title="Our Services - Mahadev Divine Events" description="Premium wedding and event planning services">
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6" style={{ background: 'linear-gradient(180deg, #0a0500 0%, #0a0a0a 100%)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,5,0,0.85) 0%, rgba(10,10,10,0.98) 100%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #d4a017)' }} />
            <GiDiamondRing className="text-amber-400" size={18} />
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
          </div>
          <p className="section-subtitle mb-3">What We Offer</p>
          <h1 className="section-title text-gold-gradient mb-5">Our Premium Services</h1>
          <p className="font-sans text-sm text-amber-100/50 max-w-2xl mx-auto leading-relaxed">
            Eleven signature services crafted to make your celebration absolutely divine. Each offering is thoughtfully designed to bring your dream event to life.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto space-y-20">
          {SERVICES.map((svc, i) => (
            <AnimatedSection key={svc.id} style={{ transitionDelay: '0.1s' }}>
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Images */}
                <div className={`grid grid-cols-2 gap-3 ${i % 2 !== 0 ? 'lg:col-start-2' : ''}`}>
                  {svc.images.map((src, j) => (
                    <div
                      key={j}
                      className="gallery-item overflow-hidden"
                      style={{
                        aspectRatio: j === 0 ? '3/4' : '4/3',
                        border: '1px solid rgba(212,160,23,0.2)',
                        marginTop: j === 1 ? '2rem' : '0',
                      }}
                    >
                      <img src={src} alt={svc.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className={i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <span className="service-tag mb-4 inline-block">{svc.subtitle}</span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-gold-gradient mb-4">{svc.title}</h2>
                  <div style={{ height: '2px', width: '60px', background: 'linear-gradient(90deg, #d4a017, transparent)', marginBottom: '1.5rem' }} />
                  <p className="font-sans text-sm text-amber-100/60 leading-relaxed mb-6">{svc.description}</p>
                  <ul className="space-y-2 mb-8">
                    {svc.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 font-sans text-sm text-amber-100/70">
                        <span className="text-amber-500 text-xs flex-shrink-0">◆</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/917296095910?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(svc.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold flex items-center gap-2 no-underline"
                    >
                      <FaWhatsapp size={16} /> Book Now
                    </a>
                    <Link href="/contact" className="btn-outline-gold flex items-center gap-2 no-underline">
                      Get Quote <FaArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Divider */}
              {i < SERVICES.length - 1 && (
                <div className="mt-16" style={{ borderBottom: '1px solid rgba(212,160,23,0.1)' }} />
              )}
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #0d0800, #1a1000, #0d0800)', borderTop: '1px solid rgba(212,160,23,0.2)' }}>
        <AnimatedSection>
          <p className="section-subtitle mb-3">Ready to Begin?</p>
          <h2 className="section-title text-gold-gradient mb-5">Let's Plan Your Dream Event</h2>
          <p className="font-sans text-sm text-amber-100/50 max-w-xl mx-auto mb-10">
            Contact us today for a free consultation and let our experts craft the perfect celebration for you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">Contact Us</Link>
            <a href="https://wa.me/917296095910" target="_blank" rel="noopener noreferrer" className="btn-outline-gold flex items-center gap-2 no-underline">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </AnimatedSection>
      </section>
    </Layout>
  );
}