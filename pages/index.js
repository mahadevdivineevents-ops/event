import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';
import { FaHeart, FaCamera, FaMusic, FaUtensils, FaRing, FaCar, FaStar, FaArrowRight, FaChevronDown } from 'react-icons/fa';
import { GiFlowerEmblem, GiDiamondRing } from 'react-icons/gi';

const services = [
  { icon: FaRing, title: 'Wedding Planning', desc: 'Complete end-to-end wedding planning with divine attention to detail.' },
  { icon: GiFlowerEmblem, title: 'Haldi Mehendi', desc: 'Vibrant, traditional ceremonies filled with colour and joy.' },
  { icon: FaHeart, title: 'Engagement Ceremony', desc: 'Romantic and elegant settings for your perfect engagement.' },
  { icon: FaStar, title: 'Birthday Decoration', desc: 'Stunning setups that make every birthday unforgettable.' },
  { icon: FaCamera, title: 'Photography', desc: 'Timeless memories captured by our expert photographers.' },
  { icon: FaMusic, title: 'DJ & Sound System', desc: 'Premium sound experiences that keep the celebration alive.' },
];

const stats = [
  { value: '100+', label: 'Weddings Planned' },
  { value: '5+', label: 'Years of Excellence' },
  { value: '50+', label: 'Expert Team Members' },
  { value: '100%', label: 'Client Satisfaction' },
];

const testimonials = [
  { name: 'Priya & Arjun Sharma', text: 'Mahadev Divine Events turned our wedding into a magical fairy tale. Every detail was perfect!', rating: 5 },
  { name: 'Sneha & Rahul Verma', text: 'Exceptional service and stunning décor. Our guests still talk about how beautiful everything was.', rating: 5 },
  { name: 'Kavya & Vikram Patel', text: 'The team went above and beyond. Our engagement ceremony was absolutely divine!', rating: 5 },
];

// Unsplash image URLs for placeholder content
const galleryImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
  'uploads/video.png',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
];

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

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("uploads/bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        />
        <div className="absolute inset-0 hero-overlay" />
        {/* Golden vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)' }} />

        {/* Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mb-6" style={{ animationDelay: '0.1s', animation: 'fadeInUp 1s ease forwards', opacity: 0 }}>
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #d4a017)' }} />
            <GiDiamondRing className="text-amber-400" size={20} />
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
          </div>

          <p className="font-serif italic text-amber-300/80 text-lg md:text-xl tracking-[0.3em] mb-4"
            style={{ animation: 'fadeInUp 1s 0.2s ease forwards', opacity: 0 }}>
            Welcome to
          </p>

          <h1
            className="font-display font-black text-gold-gradient leading-tight mb-4"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', animation: 'fadeInUp 1s 0.4s ease forwards', opacity: 0 }}
          >
            MAHADEV
          </h1>
          <h2
            className="font-display font-semibold tracking-[0.4em] text-amber-200/90 mb-6"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.8rem)', animation: 'fadeInUp 1s 0.55s ease forwards', opacity: 0 }}
          >
            DIVINE EVENTS
          </h2>

          <div className="gold-divider my-6" style={{ animation: 'fadeInUp 1s 0.65s ease forwards', opacity: 0 }}>
            <span className="ornament">✦</span>
            <span className="font-serif italic text-amber-300/70 text-base tracking-widest">Making Every Celebration Divine</span>
            <span className="ornament">✦</span>
          </div>

          <p className="font-sans text-amber-100/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10"
            style={{ animation: 'fadeInUp 1s 0.75s ease forwards', opacity: 0 }}>
            Where love meets artistry. We craft extraordinary wedding experiences that linger in hearts forever.
          </p>

          <div className="flex flex-wrap gap-4 justify-center"
            style={{ animation: 'fadeInUp 1s 0.9s ease forwards', opacity: 0 }}>
            <Link href="/services" className="btn-gold">
              View Services
            </Link>
            <Link href="/contact" className="btn-outline-gold">
              Contact Now
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-amber-400/50"
          style={{ animation: 'fadeInUp 1s 1.2s ease forwards', opacity: 0 }}>
          <span className="font-sans text-xs tracking-[0.3em] uppercase">Scroll</span>
          <FaChevronDown className="animate-bounce" size={14} />
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'linear-gradient(135deg, #0f0a00, #1a1000, #0f0a00)', borderTop: '1px solid rgba(212,160,23,0.2)', borderBottom: '1px solid rgba(212,160,23,0.2)' }}>
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} className="text-center">
                <div className="font-display font-black text-gold-gradient text-4xl md:text-5xl mb-2">{stat.value}</div>
                <div className="font-sans text-xs tracking-[0.2em] uppercase text-amber-400/60">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="section-subtitle mb-3">What We Offer</p>
            <div className="gold-divider mb-4"><span className="ornament">✦</span></div>
            <h2 className="section-title text-gold-gradient mb-4">Our Premium Services</h2>
            <p className="font-sans text-sm text-amber-100/50 max-w-2xl mx-auto leading-relaxed">
              From intimate gatherings to grand celebrations, we bring your vision to life with unmatched elegance and precision.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="luxury-card p-8 h-full flex flex-col group cursor-pointer">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, rgba(184,134,11,0.2), rgba(255,215,0,0.1))', border: '1px solid rgba(212,160,23,0.3)' }}>
                    <svc.icon className="text-amber-400 text-xl" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-amber-200 mb-3 group-hover:text-gold-gradient transition-all">{svc.title}</h3>
                  <p className="font-sans text-sm text-amber-100/50 leading-relaxed flex-1">{svc.desc}</p>
                  <Link href="/services" className="inline-flex items-center gap-2 mt-6 text-amber-400 text-xs font-sans tracking-widest uppercase hover:gap-3 transition-all duration-300">
                    Learn More <FaArrowRight size={10} />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link href="/services" className="btn-gold">
              View All Services
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d0800 0%, #1a1000 50%, #0d0800 100%)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #d4a017 0, #d4a017 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="section-subtitle mb-3">Why Choose Us</p>
              <div className="gold-divider justify-start mb-4 gap-3">
                <span className="ornament">✦</span>
                <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
              </div>
              <h2 className="section-title text-gold-gradient mb-6">
                A Legacy of<br />Divine Celebrations
              </h2>
              <p className="font-sans text-sm text-amber-100/50 leading-relaxed mb-8">
                With over 15 years of experience and 500+ weddings beautifully executed, Mahadev Divine Events has become synonymous with luxury, trust, and perfection. Our dedicated team ensures every moment of your celebration is absolutely magical.
              </p>
              <ul className="space-y-4">
                {['Personalised planning for every event', 'Experienced team of 50+ professionals', '24/7 dedicated support throughout your event', 'Premium vendor network across the city', 'Transparent pricing, no hidden costs'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-amber-400 text-sm">◆</span>
                    <span className="font-sans text-sm text-amber-100/70">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/contact" className="btn-gold inline-block">Book A Consultation</Link>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80',
                  'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80',
                  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80',
                  'uploads/haldi2.png',
                ].map((src, i) => (
                  <div key={i} className={`gallery-item rounded-sm overflow-hidden ${i === 0 ? 'row-span-1' : ''}`}
                    style={{ aspectRatio: i % 2 === 0 ? '3/4' : '4/3', border: '1px solid rgba(212,160,23,0.2)' }}>
                    <img src={src} alt="Wedding" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section className="py-24 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="section-subtitle mb-3">Our Portfolio</p>
            <div className="gold-divider mb-4"><span className="ornament">✦</span></div>
            <h2 className="section-title text-gold-gradient">Moments We've Crafted</h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {galleryImages.map((src, i) => (
              <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="gallery-item cursor-pointer"
                  style={{ aspectRatio: i % 3 === 1 ? '1/1.2' : '1/1', border: '1px solid rgba(212,160,23,0.15)' }}>
                  <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  <div className="gallery-overlay">
                    <span className="font-sans text-xs text-amber-300 tracking-widest uppercase">View More</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <Link href="/gallery" className="btn-outline-gold">
              View Full Gallery
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(180deg, #0d0800, #0a0a0a)' }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="section-subtitle mb-3">Happy Couples</p>
            <div className="gold-divider mb-6"><span className="ornament">✦</span></div>
            <h2 className="section-title text-gold-gradient mb-4">Love Stories We've Told</h2>
            <p className="font-sans text-sm text-amber-100/50 max-w-2xl mx-auto">Hear from the couples whose celebrations we've had the honor of creating.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="testimonial-card group h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(t.rating)].map((_, j) => <FaStar key={j} className="text-amber-400 drop-shadow-lg" size={16} />)}
                  </div>
                  <p className="font-serif italic text-amber-100/75 text-base leading-relaxed flex-1 mb-8 relative">
                    <span className="text-amber-500/40 text-3xl absolute -top-2 -left-2">"</span>
                    {t.text}
                    <span className="text-amber-500/40 text-3xl absolute -bottom-6 -right-2">"</span>
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-amber-500/10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg transition-all duration-300 group-hover:shadow-xl"
                      style={{ background: 'linear-gradient(135deg, #b8860b, #ffd700)' }}>
                      <FaHeart className="text-black text-lg" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-semibold text-amber-300">{t.name}</div>
                      <div className="font-sans text-xs text-amber-400/50 tracking-widest uppercase">Happy Clients</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a0f00, #2a1800, #1a0f00)', borderTop: '1px solid rgba(212,160,23,0.3)', borderBottom: '1px solid rgba(212,160,23,0.3)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a017' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <AnimatedSection className="text-center relative">
          <p className="section-subtitle mb-4">Start Planning Today</p>
          <h2 className="section-title text-gold-gradient mb-4">
            Your Dream Wedding<br />Awaits
          </h2>
          <p className="font-sans text-sm text-amber-100/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Let us transform your vision into an unforgettable celebration. Contact us today for a free consultation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-gold">Get Free Quote</Link>
            <a href="https://wa.me/917296095910" target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
              WhatsApp Us
            </a>
          </div>
        </AnimatedSection>
      </section>
    </Layout>
  );
}