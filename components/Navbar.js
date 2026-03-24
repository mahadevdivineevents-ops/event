import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaOm } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin', isAdmin: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'navbar-glass shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-full  sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #b8860b, #ffd700)' }}>
              <FaOm className="text-black text-lg" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-sm tracking-widest text-gold-gradient">
                MAHADEV
              </div>
              <div className="font-bold text-xs tracking-[0.2em] text-amber-400/70 uppercase">
                Divine Events
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-xs font-sans font-medium tracking-widest uppercase transition-all duration-300 group ${
                    link.isAdmin
                      ? 'btn-gold ml-3 py-2! px-4!'
                      : isActive
                      ? 'text-amber-300'
                      : 'text-amber-100/70 hover:text-amber-300'
                  }`}
                >
                  {!link.isAdmin && (
                    <>
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-0 h-px bg-linear-to-r from-transparent via-amber-400 to-transparent transition-all duration-300 ${
                          isActive ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </>
                  )}
                  {link.isAdmin && link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-amber-400 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(10,10,10,0.98)', borderTop: '1px solid rgba(212,160,23,0.2)' }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`py-3 px-4 text-sm font-sans tracking-widest uppercase transition-all duration-300 border-b ${
                  link.isAdmin
                    ? 'text-black btn-gold text-center mt-3 border-0'
                    : isActive
                    ? 'text-amber-300 border-amber-400/20'
                    : 'text-amber-100/70 hover:text-amber-300 border-amber-400/10'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}