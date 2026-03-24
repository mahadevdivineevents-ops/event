import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { FaUpload, FaTrash, FaImage, FaTimes, FaCheck, FaFilter, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';

const SERVICES = ['Wedding Planning','Haldi Mehendi Decoration','Engagement Ceremony','Birthday Decoration','Bridal Makeup','Wedding Car Booking','DJ & Sound System','Photography','Catering','Event Management','Pre Wedding Photoshoot'];

export default function Admin() {
  const [authed, setAuthed]           = useState(false);
  const [password, setPassword]       = useState('');
  const [showPass, setShowPass]       = useState(false);
  const [authError, setAuthError]     = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [service, setService]     = useState('');
  const [caption, setCaption]     = useState('');
  const [previews, setPreviews]   = useState([]);
  const [files, setFiles]         = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState(null);
  const [images, setImages]       = useState([]);
  const [filter, setFilter]       = useState('All');
  const [loading, setLoading]     = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const fileRef = useRef(null);

  // Check session on mount
  useEffect(() => {
    const session = sessionStorage.getItem('admin_authed');
    if (session === 'true') setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) loadImages();
  }, [authed]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem('admin_authed', 'true');
        setAuthed(true);
      } else {
        setAuthError('Galat password hai. Dobara try karo.');
      }
    } catch {
      setAuthError('Server error. Please try again.');
    }
    setAuthLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authed');
    setAuthed(false);
    setPassword('');
  };

  const loadImages = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/images');
      const d = await r.json();
      if (d.success) setImages(d.images);
    } catch {}
    setLoading(false);
  };

  const handleFiles = (e) => {
    const sel = Array.from(e.target.files);
    setFiles(sel);
    setPreviews(sel.map(f => ({
      url: URL.createObjectURL(f),
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB',
    })));
  };

  const removePreview = (i) => {
    setPreviews(p => p.filter((_, j) => j !== i));
    setFiles(f => f.filter((_, j) => j !== i));
  };

  const handleUpload = async () => {
    if (!service) { setUploadMsg({ ok: false, text: 'Please select a service.' }); return; }
    if (!files.length) { setUploadMsg({ ok: false, text: 'Please select images.' }); return; }
    setUploading(true); setUploadMsg(null);
    let ok = 0;
    for (const file of files) {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('service', service);
      fd.append('caption', caption);
      try {
        const r = await fetch('/api/images/upload', { method: 'POST', body: fd });
        const d = await r.json();
        if (d.success) ok++;
      } catch {}
    }
    setUploading(false);
    if (ok > 0) {
      setUploadMsg({ ok: true, text: `${ok} image(s) uploaded!` });
      setPreviews([]); setFiles([]); setCaption('');
      if (fileRef.current) fileRef.current.value = '';
      loadImages();
    } else {
      setUploadMsg({ ok: false, text: 'Upload failed. Try again.' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image permanently?')) return;
    setDeletingId(id);
    try {
      const r = await fetch(`/api/images/${id}`, { method: 'DELETE' });
      const d = await r.json();
      if (d.success) setImages(imgs => imgs.filter(i => i._id !== id));
    } catch {}
    setDeletingId(null);
  };

  const filtered = filter === 'All' ? images : images.filter(img => img.service === filter);

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(200,148,10,0.25)', color: '#e8d5a3',
    padding: '0.9rem 1.2rem', fontFamily: 'Jost,sans-serif',
    fontSize: '0.9rem', fontWeight: 300, outline: 'none', transition: 'all 0.3s ease', borderRadius: '2px',
  };
  const labelStyle = {
    fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', fontWeight: 600,
    letterSpacing: '0.22em', textTransform: 'uppercase',
    color: 'rgba(200,148,10,0.6)', display: 'block', marginBottom: '0.6rem',
  };

  // ── LOGIN SCREEN ──
  if (!authed) {
    return (
      <Layout title="Admin Login — Mahadev Divine Events">
        <section style={{
          minHeight: '100vh', display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: '#080808', padding: '2rem',
        }}>
          <div style={{ width: '100%', maxWidth: '420px' }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: 'linear-gradient(135deg,#8B6508,#ffd700)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: '0 0 30px rgba(200,148,10,0.4)',
              }}>
                <FaLock style={{ color: '#0a0800', fontSize: '1.4rem' }} />
              </div>
              <h1 style={{
                fontFamily: 'Playfair Display,serif', fontSize: '1.6rem',
                fontWeight: 700, color: '#e8d5a3', marginBottom: '0.4rem',
              }}>
                Admin Panel
              </h1>
              <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.82rem', color: 'rgba(200,148,10,0.5)', letterSpacing: '0.1em' }}>
                Mahadev Divine Events
              </p>
            </div>

            {/* Login Card */}
            <div style={{
              background: 'linear-gradient(135deg,rgba(15,10,0,0.8),rgba(20,15,5,0.8))',
              border: '1px solid rgba(200,148,10,0.25)',
              padding: '2.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)',
            }}>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      required
                      style={{ ...inputStyle, paddingRight: '3rem' }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(255,215,0,0.6)'; e.target.style.background = 'rgba(255,215,0,0.04)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(200,148,10,0.25)'; e.target.style.background = 'rgba(255,255,255,0.03)'; }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{
                        position: 'absolute', right: '1rem', top: '50%',
                        transform: 'translateY(-50%)', background: 'none',
                        border: 'none', cursor: 'pointer', color: 'rgba(200,148,10,0.6)',
                        padding: 0, transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = 'rgba(200,148,10,0.9)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,148,10,0.6)'}
                    >
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div style={{
                    padding: '0.75rem 1rem', background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    fontFamily: 'Jost,sans-serif', fontSize: '0.82rem', color: '#ef4444',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    <FaTimes style={{ flexShrink: 0 }} /> {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  style={{
                    background: 'linear-gradient(135deg,#8B6508,#ffd700,#8B6508)',
                    backgroundSize: '200% auto', color: '#0a0800',
                    fontFamily: 'Jost,sans-serif', fontSize: '0.75rem',
                    fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
                    padding: '0.95rem', border: 'none', cursor: 'pointer',
                    width: '100%', transition: 'all 0.35s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundPosition = 'right center'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,215,0,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundPosition = 'left center'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {authLoading
                    ? <><span style={{ width: '14px', height: '14px', border: '2px solid #0a0800', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /> Verifying...</>
                    : <><FaLock style={{ fontSize: '0.8rem' }} /> Login</>
                  }
                </button>
              </form>
            </div>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: 'Jost,sans-serif', fontSize: '0.75rem', color: 'rgba(200,148,10,0.3)' }}>
              Mahadev Divine Events © {new Date().getFullYear()}
            </p>
          </div>
          <style jsx>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </section>
      </Layout>
    );
  }

  // ── ADMIN PANEL (after login) ──
  return (
    <Layout title="Admin Panel — Mahadev Divine Events">
      <section style={{ position: 'relative', paddingTop: '11rem', paddingBottom: '4rem', background: '#060400' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(6,4,0,0.92)' }} />
        <div className="wrap-md" style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '1px', width: '55px', background: 'linear-gradient(90deg,transparent,#c8940a)' }} />
            <GiDiamondRing style={{ color: '#c8940a', fontSize: '1.1rem' }} />
            <div style={{ height: '1px', width: '55px', background: 'linear-gradient(90deg,#c8940a,transparent)' }} />
          </div>
          <h1 className="heading-lg gold-text" style={{ marginBottom: '0.75rem' }}>Admin Panel</h1>
          <p className="body-text" style={{ marginBottom: '1.5rem' }}>Manage gallery images for all services</p>
          <button onClick={handleLogout} style={{
            background: 'transparent', border: '1px solid rgba(200,148,10,0.3)',
            color: 'rgba(200,148,10,0.6)', fontFamily: 'Jost,sans-serif',
            fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            padding: '0.5rem 1.25rem', cursor: 'pointer', transition: 'all 0.3s ease',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,148,10,0.7)'; e.currentTarget.style.color = '#c8940a'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,148,10,0.3)'; e.currentTarget.style.color = 'rgba(200,148,10,0.6)'; }}
          >
            Logout
          </button>
        </div>
      </section>

      <section className="section" style={{ background: '#080808' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '2.5rem', alignItems: 'start' }}>

            {/* Upload Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="card" style={{ padding: '2.5rem' }}>
                <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.15rem', color: '#c8940a', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <FaUpload style={{ fontSize: '0.9rem' }} /> Upload Images
                </h2>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>Service *</label>
                  <select value={service} onChange={e => setService(e.target.value)}
                    style={{ ...inputStyle, background: '#0f0f0f', cursor: 'pointer' }}>
                    <option value="" style={{ background: '#111' }}>-- Select Service --</option>
                    {SERVICES.map(s => <option key={s} value={s} style={{ background: '#111' }}>{s}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={labelStyle}>Caption (optional)</label>
                  <input value={caption} onChange={e => setCaption(e.target.value)}
                    placeholder="Image caption..." style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(255,215,0,0.55)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(200,148,10,0.22)'} />
                </div>

                <div style={{ marginBottom: previews.length ? '1.25rem' : '0' }}>
                  <label style={labelStyle}>Images *</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); if (e.dataTransfer.files.length) handleFiles({ target: e.dataTransfer }); }}
                    style={{
                      border: '1px dashed rgba(200,148,10,0.25)', background: 'rgba(200,148,10,0.02)',
                      padding: '2.5rem 1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,148,10,0.5)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(200,148,10,0.25)'}
                  >
                    <FaImage style={{ color: 'rgba(200,148,10,0.3)', fontSize: '2rem', display: 'block', margin: '0 auto 0.85rem' }} />
                    <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.82rem', fontWeight: 300, color: 'rgba(232,213,163,0.35)' }}>Click or drag & drop</p>
                    <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.7rem', fontWeight: 300, color: 'rgba(232,213,163,0.2)', marginTop: '0.3rem' }}>JPG, PNG, WebP · Max 10MB</p>
                    <input
                      ref={fileRef} type="file" multiple
                      accept="image/*,image/heic,image/heif"
                      style={{ display: 'none' }} onChange={handleFiles}
                    />
                  </div>
                </div>

                {previews.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ ...labelStyle, marginBottom: '0.75rem' }}>{previews.length} File(s) Selected</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.6rem', maxHeight: '220px', overflowY: 'auto' }}>
                      {previews.map((p, i) => (
                        <div key={i} style={{ position: 'relative', border: '1px solid rgba(200,148,10,0.18)' }}>
                          <img src={p.url} alt={p.name} style={{ width: '100%', height: '70px', objectFit: 'cover', display: 'block' }} />
                          <button onClick={() => removePreview(i)} style={{
                            position: 'absolute', top: '3px', right: '3px', width: '20px', height: '20px',
                            borderRadius: '50%', background: 'rgba(220,38,38,0.85)', border: 'none',
                            color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem',
                          }}>
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {uploadMsg && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    border: `1px solid ${uploadMsg.ok ? 'rgba(37,211,102,0.3)' : 'rgba(239,68,68,0.3)'}`,
                    background: uploadMsg.ok ? 'rgba(37,211,102,0.06)' : 'rgba(239,68,68,0.06)',
                    display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem',
                    fontFamily: 'Jost,sans-serif', fontSize: '0.82rem',
                    color: uploadMsg.ok ? '#4ade80' : '#ef4444',
                  }}>
                    {uploadMsg.ok ? <FaCheck style={{ flexShrink: 0 }} /> : <FaTimes style={{ flexShrink: 0 }} />}
                    {uploadMsg.text}
                  </div>
                )}

                <button onClick={handleUpload} disabled={uploading} style={{
                  background: 'linear-gradient(135deg,#8B6508,#ffd700,#8B6508)', backgroundSize: '200% auto',
                  color: '#0a0800', fontFamily: 'Jost,sans-serif', fontSize: '0.72rem', fontWeight: 600,
                  letterSpacing: '0.2em', textTransform: 'uppercase', padding: '0.9rem', border: 'none',
                  cursor: uploading ? 'not-allowed' : 'pointer', width: '100%', transition: 'all 0.35s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  opacity: uploading ? 0.7 : 1,
                }}>
                  {uploading
                    ? <><span style={{ width: '14px', height: '14px', border: '2px solid #0a0800', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /> Uploading...</>
                    : <><FaUpload /> Upload Images</>
                  }
                </button>
                <style jsx>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              </div>

              {/* Stats */}
              <div className="card" style={{ padding: '1.75rem 2rem' }}>
                <p style={{ fontFamily: 'Playfair Display,serif', fontSize: '0.9rem', color: '#c8940a', marginBottom: '1.25rem' }}>Gallery Stats</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Jost,sans-serif', fontSize: '0.85rem', color: 'rgba(232,213,163,0.55)', marginBottom: '0.85rem', paddingBottom: '0.85rem', borderBottom: '1px solid rgba(200,148,10,0.1)' }}>
                  <span>Total Images</span>
                  <span style={{ color: '#c8940a', fontWeight: 500 }}>{images.length}</span>
                </div>
                {SERVICES.filter(s => images.some(img => img.service === s)).map(s => (
                  <div key={s} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Jost,sans-serif', fontSize: '0.75rem', color: 'rgba(232,213,163,0.35)', marginBottom: '0.5rem' }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{s}</span>
                    <span style={{ color: 'rgba(200,148,10,0.6)', flexShrink: 0 }}>{images.filter(img => img.service === s).length}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery Management */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.15rem', color: '#c8940a', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <FaImage style={{ fontSize: '0.9rem' }} /> Uploaded Images
                  <span style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.7rem', color: 'rgba(200,148,10,0.35)', fontWeight: 400 }}>({filtered.length})</span>
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <FaFilter style={{ color: '#c8940a', fontSize: '0.75rem' }} />
                  <select value={filter} onChange={e => setFilter(e.target.value)} style={{
                    background: '#0f0f0f', border: '1px solid rgba(200,148,10,0.2)', color: '#e8d5a3',
                    padding: '0.45rem 0.85rem', fontFamily: 'Jost,sans-serif', fontSize: '0.75rem', outline: 'none', cursor: 'pointer',
                  }}>
                    <option value="All" style={{ background: '#111' }}>All Services</option>
                    {SERVICES.map(s => <option key={s} value={s} style={{ background: '#111' }}>{s}</option>)}
                  </select>
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(200,148,10,0.3)', borderTopColor: '#c8940a', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
                  <p className="body-text" style={{ fontSize: '0.82rem' }}>Loading images...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                  <FaImage style={{ color: 'rgba(200,148,10,0.15)', fontSize: '3rem', display: 'block', margin: '0 auto 1.25rem' }} />
                  <p style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.1rem', color: 'rgba(200,148,10,0.3)' }}>
                    {images.length === 0 ? 'No images yet' : 'No images found'}
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '0.85rem', maxHeight: '680px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                  {filtered.map(img => (
                    <div key={img._id} style={{ position: 'relative', border: '1px solid rgba(200,148,10,0.15)', overflow: 'hidden' }}
                      onMouseEnter={e => e.currentTarget.querySelector('.img-overlay').style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.querySelector('.img-overlay').style.opacity = '0'}>
                      <div style={{ aspectRatio: '1', overflow: 'hidden' }}>
                        <img src={img.url} alt={img.caption || img.service}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} loading="lazy" />
                      </div>
                      <div className="img-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button onClick={() => handleDelete(img._id)} disabled={deletingId === img._id}
                          style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(220,38,38,0.85)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {deletingId === img._id
                            ? <span style={{ width: '12px', height: '12px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                            : <FaTrash style={{ fontSize: '0.8rem' }} />}
                        </button>
                      </div>
                      <div style={{ background: '#0f0f0f', borderTop: '1px solid rgba(200,148,10,0.1)', padding: '0.5rem 0.65rem' }}>
                        <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', color: 'rgba(200,148,10,0.55)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>{img.service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}