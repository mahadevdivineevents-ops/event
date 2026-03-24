import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';
import { GiDiamondRing} from 'react-icons/gi';

const SERVICE_CATEGORIES = [
  'All',
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
];

// Static gallery images (will be augmented by DB images)
const STATIC_GALLERY = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', service: 'Wedding Planning', caption: 'Grand Wedding Ceremony' },
  { id: 2, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', service: 'Wedding Planning', caption: 'Floral Arch Décor' },
  { id: 3, src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', service: 'Engagement Ceremony', caption: 'Ring Ceremony Stage' },
  { id: 4, src: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=800&q=80', service: 'Haldi Mehendi Decoration', caption: 'Haldi Ceremony Setup' },
  { id: 5, src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', service: 'Photography', caption: 'Wedding Photography' },
  { id: 6, src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80', service: 'Pre Wedding Photoshoot', caption: 'Pre-Wedding Shoot' },
  { id: 7, src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80', service: 'Pre Wedding Photoshoot', caption: 'Romantic Couple Shot' },
  { id: 8, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', service: 'DJ & Sound System', caption: 'DJ Night Setup' },
  { id: 9, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', service: 'Catering', caption: 'Grand Feast' },
  { id: 10, src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', service: 'Birthday Decoration', caption: 'Birthday Setup' },
  { id: 11, src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', service: 'Event Management', caption: 'Corporate Event' },
  { id: 12, src: 'https://images.unsplash.com/photo-1487530811015-780f1b92fb3c?w=800&q=80', service: 'Bridal Makeup', caption: 'Bridal Glam Look' },
  { id: 13, src: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=800&q=80', service: 'Wedding Car Booking', caption: 'Bridal Car Décor' },
  { id: 14, src: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80', service: 'Catering', caption: 'Dessert Station' },
  { id: 15, src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', service: 'DJ & Sound System', caption: 'Dance Floor Lighting' },
  { id: 16, src: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80', service: 'Event Management', caption: 'Stage & Lighting' },
  { id: 17, src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80', service: 'Birthday Decoration', caption: 'Balloon Art' },
  { id: 18, src: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&q=80', service: 'Bridal Makeup', caption: 'Traditional Bridal Look' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [dbImages, setDbImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/images')
      .then(r => r.json())
      .then(data => {
        if (data.success) setDbImages(data.images);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allImages = [
    ...STATIC_GALLERY,
    ...dbImages.map((img, i) => ({
      id: `db-${i}`,
      src: img.url,
      service: img.service,
      caption: img.caption || img.service,
    })),
  ];

  const filtered = activeFilter === 'All' ? allImages : allImages.filter(img => img.service === activeFilter);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const prev = () => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightboxIndex(i => (i + 1) % filtered.length);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  return (
    <Layout title="Gallery - Mahadev Divine Events" description="View our portfolio of divine wedding celebrations">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6" style={{ background: 'linear-gradient(180deg, #0a0500 0%, #0a0a0a 100%)' }}>
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,5,0,0.9) 0%, rgba(10,10,10,0.98) 100%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #d4a017)' }} />
            <GiDiamondRing className="text-amber-400" size={18} />
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
          </div>
          <p className="section-subtitle mb-3">Our Portfolio</p>
          <h1 className="section-title text-gold-gradient mb-5">Gallery of Divine Moments</h1>
          <p className="font-sans text-sm text-amber-100/50 max-w-2xl mx-auto leading-relaxed">
            Every photograph tells a love story. Browse through our collection of beautiful celebrations we've had the honour of creating.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="px-6 py-8 sticky top-16 md:top-20 z-40" style={{ background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,160,23,0.15)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-sans tracking-widest uppercase transition-all duration-300 border ${
                  activeFilter === cat
                    ? 'text-black border-amber-400'
                    : 'text-amber-400/60 border-amber-400/20 hover:border-amber-400/50 hover:text-amber-400/80'
                }`}
                style={activeFilter === cat ? { background: 'linear-gradient(135deg, #b8860b, #ffd700)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-10 h-10 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              <p className="font-sans text-sm text-amber-100/40 mt-4">Loading gallery...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <FaSearch className="text-amber-600/30 text-5xl mx-auto mb-4" />
              <p className="font-display text-xl text-amber-400/50">No images found</p>
              <p className="font-sans text-sm text-amber-100/30 mt-2">Try selecting a different category</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
              {filtered.map((img, i) => (
                <div
                  key={img.id}
                  className="gallery-item cursor-pointer break-inside-avoid mb-3 overflow-hidden"
                  style={{ border: '1px solid rgba(212,160,23,0.15)' }}
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full block"
                    loading="lazy"
                    style={{ display: 'block' }}
                  />
                  <div className="gallery-overlay">
                    <div>
                      <p className="font-display text-sm text-amber-300 font-medium">{img.caption}</p>
                      <p className="font-sans text-xs text-amber-400/60 tracking-wide mt-1">{img.service}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: 'rgba(212,160,23,0.2)', border: '1px solid rgba(212,160,23,0.4)' }}
            onClick={closeLightbox}
          >
            <FaTimes className="text-amber-400" />
          </button>

          <button
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: 'rgba(212,160,23,0.2)', border: '1px solid rgba(212,160,23,0.4)' }}
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <FaChevronLeft className="text-amber-400" />
          </button>

          <div
            className="max-w-4xl max-h-screen p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex]?.src}
              alt={filtered[lightboxIndex]?.caption}
              className="max-h-[75vh] max-w-full object-contain"
              style={{ border: '1px solid rgba(212,160,23,0.3)' }}
            />
            <div className="mt-4 text-center">
              <p className="font-display text-lg text-amber-300">{filtered[lightboxIndex]?.caption}</p>
              <p className="font-sans text-xs text-amber-400/60 tracking-widest uppercase mt-1">{filtered[lightboxIndex]?.service}</p>
              <p className="font-sans text-xs text-amber-100/30 mt-2">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>

          <button
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 z-10"
            style={{ background: 'rgba(212,160,23,0.2)', border: '1px solid rgba(212,160,23,0.4)' }}
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <FaChevronRight className="text-amber-400" />
          </button>
        </div>
      )}
    </Layout>
  );
}