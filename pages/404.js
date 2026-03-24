import Link from 'next/link';
import Layout from '../components/Layout';
import { GiDiamondRing } from 'react-icons/gi';

export default function Custom404() {
  return (
    <Layout title="Page Not Found - Mahadev Divine Events">
      <section className="min-h-screen flex items-center justify-center px-6" style={{ background: '#0a0a0a' }}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #d4a017)' }} />
            <GiDiamondRing className="text-amber-400" size={18} />
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
          </div>
          <h1
            className="font-display font-black text-gold-gradient mb-4"
            style={{ fontSize: 'clamp(5rem, 20vw, 12rem)', lineHeight: 1 }}
          >
            404
          </h1>
          <p className="font-display text-2xl text-amber-300/70 mb-3">Page Not Found</p>
          <p className="font-sans text-sm text-amber-100/40 max-w-md mx-auto mb-10 leading-relaxed">
            The page you're looking for seems to have wandered off to a divine celebration. Let us guide you back.
          </p>
          <Link href="/" className="btn-gold">
            Return Home
          </Link>
        </div>
      </section>
    </Layout>
  );
}