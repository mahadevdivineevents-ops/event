import Link from 'next/link';
import Layout from '../components/Layout';
import { GiDiamondRing } from 'react-icons/gi';

export default function Custom404() {
  return (
    <Layout title="Page Not Found - Mahadev Divine Events">
      <section className="min-h-screen flex items-center justify-center px-6" style={{ background: 'linear-gradient(135deg, #0a0a0a, #0f0a00)' }}>
        <div className="text-center max-w-2xl">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #d4a017)' }} />
            <GiDiamondRing className="text-amber-400 animate-pulse" size={24} />
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
          </div>
          
          <h1 className="font-display font-black text-gold-gradient mb-6"
            style={{ fontSize: 'clamp(5rem, 25vw, 12rem)', lineHeight: 1, animation: 'fadeInScale 0.8s ease forwards' }}>
            404
          </h1>
          
          <p className="font-display text-3xl md:text-4xl text-amber-300/80 mb-4 font-semibold animate-pulse">
            Page Not Found
          </p>
          
          <p className="font-sans text-base text-amber-100/60 max-w-md mx-auto mb-12 leading-relaxed">
            The page you're looking for seems to have wandered off to a divine celebration. Let us guide you back.
          </p>
          
          <Link href="/" className="btn-gold inline-flex items-center gap-2 text-lg h-12 px-8">
            ← Return Home
          </Link>
          
          <div className="mt-16 space-y-4">
            <p className="font-sans text-sm text-amber-100/40">Other Pages:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/" className="btn-outline-gold text-sm py-2 px-4">Home</Link>
              <Link href="/services" className="btn-outline-gold text-sm py-2 px-4">Services</Link>
              <Link href="/gallery" className="btn-outline-gold text-sm py-2 px-4">Gallery</Link>
              <Link href="/contact" className="btn-outline-gold text-sm py-2 px-4">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}