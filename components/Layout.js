import Navbar from './Navbar';
import Footer from './Footer';
import Head from 'next/head';

export default function Layout({ children, title = 'Mahadev Divine Events - Making Every Celebration Divine', description = 'Premium wedding and event planning services' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <div className="noise-overlay" />
      <Navbar />
      <main className="pb-12 md:pb-16 lg:pb-20">{children}</main>
      <Footer />
    </>
  );
}