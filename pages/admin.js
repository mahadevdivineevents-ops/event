import { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import { FaUpload, FaTrash, FaImage, FaTimes, FaCheck, FaFilter } from 'react-icons/fa';
import { GiDiamondRing } from 'react-icons/gi';

const SERVICES = [
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

export default function Admin() {
  const [selectedService, setSelectedService] = useState('');
  const [caption, setCaption] = useState('');
  const [previews, setPreviews] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [images, setImages] = useState([]);
  const [filterService, setFilterService] = useState('All');
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/images');
      const data = await res.json();
      if (data.success) setImages(data.images);
    } catch { }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    const newPreviews = selected.map(f => ({
      file: f,
      url: URL.createObjectURL(f),
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB',
    }));
    setPreviews(newPreviews);
  };

  const removePreview = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (!selectedService) { setUploadStatus({ type: 'error', msg: 'Please select a service first.' }); return; }
    if (files.length === 0) { setUploadStatus({ type: 'error', msg: 'Please select at least one image.' }); return; }

    setUploading(true);
    setUploadStatus(null);
    let successCount = 0;

    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('service', selectedService);
      formData.append('caption', caption);

      try {
        const res = await fetch('/api/images/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) successCount++;
      } catch { }
    }

    setUploading(false);
    if (successCount > 0) {
      setUploadStatus({ type: 'success', msg: `${successCount} image(s) uploaded successfully!` });
      setPreviews([]);
      setFiles([]);
      setCaption('');
      if (fileRef.current) fileRef.current.value = '';
      loadImages();
    } else {
      setUploadStatus({ type: 'error', msg: 'Upload failed. Check your MongoDB connection.' });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image permanently?')) return;
    setDeleteId(id);
    try {
      const res = await fetch(`/api/images/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setImages(imgs => imgs.filter(img => img._id !== id));
      }
    } catch { }
    setDeleteId(null);
  };

  const filtered = filterService === 'All' ? images : images.filter(img => img.service === filterService);

  return (
    <Layout title="Admin Panel - Mahadev Divine Events">
      {/* Hero */}
      <section className="relative pt-40 pb-16 px-6" style={{ background: 'linear-gradient(180deg, #0a0500 0%, #0a0a0a 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0" style={{ background: 'rgba(10,5,0,0.9)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #d4a017)' }} />
            <GiDiamondRing className="text-amber-400" size={18} />
            <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #d4a017, transparent)' }} />
          </div>
          <h1 className="section-title text-gold-gradient mb-3">Admin Panel</h1>
          <p className="font-sans text-sm text-amber-100/50">Manage gallery images for all services</p>
        </div>
      </section>

      <section className="py-12 px-6" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Upload Panel */}
            <div className="lg:col-span-2 space-y-6">
              <div className="luxury-card p-8">
                <h2 className="font-display text-xl font-bold text-amber-300 mb-6 flex items-center gap-3">
                  <FaUpload className="text-amber-500" size={18} /> Upload Images
                </h2>

                {/* Service Select */}
                <div className="mb-5">
                  <label className="font-sans text-xs text-amber-400/60 tracking-widest uppercase mb-2 block">Service *</label>
                  <select
                    className="luxury-input"
                    value={selectedService}
                    onChange={e => setSelectedService(e.target.value)}
                    style={{ background: '#111', cursor: 'pointer' }}
                  >
                    <option value="" style={{ background: '#1a1a1a' }}>-- Select Service --</option>
                    {SERVICES.map(s => <option key={s} value={s} style={{ background: '#1a1a1a' }}>{s}</option>)}
                  </select>
                </div>

                {/* Caption */}
                <div className="mb-5">
                  <label className="font-sans text-xs text-amber-400/60 tracking-widest uppercase mb-2 block">Caption (optional)</label>
                  <input
                    className="luxury-input"
                    value={caption}
                    onChange={e => setCaption(e.target.value)}
                    placeholder="Image caption..."
                  />
                </div>

                {/* File Input */}
                <div className="mb-5">
                  <label className="font-sans text-xs text-amber-400/60 tracking-widest uppercase mb-2 block">Images *</label>
                  <div
                    className="border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 hover:border-amber-400/50"
                    style={{ borderColor: 'rgba(212,160,23,0.25)', background: 'rgba(212,160,23,0.02)' }}
                    onClick={() => fileRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); const dt = e.dataTransfer; if (dt.files.length) { fileRef.current.files = dt.files; handleFileChange({ target: dt }); } }}
                  >
                    <FaImage className="text-amber-600/40 text-3xl mx-auto mb-3" />
                    <p className="font-sans text-sm text-amber-100/40">Click to select or drag & drop</p>
                    <p className="font-sans text-xs text-amber-100/25 mt-1">JPG, PNG, WebP supported</p>
                    {/* <input ref={fileRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} /> */}
                    <input
                      ref={fileRef}
                      type="file"
                      multiple
                      accept="image/*,image/heic,image/heif"
                      capture={false}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* Previews */}
                {previews.length > 0 && (
                  <div className="mb-5">
                    <p className="font-sans text-xs text-amber-400/60 tracking-widest uppercase mb-3">{previews.length} File(s) Selected</p>
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                      {previews.map((p, i) => (
                        <div key={i} className="relative group" style={{ border: '1px solid rgba(212,160,23,0.2)' }}>
                          <img src={p.url} alt={p.name} className="w-full h-24 object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: 'rgba(0,0,0,0.6)' }}>
                            <button onClick={() => removePreview(i)} className="w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center">
                              <FaTimes className="text-white" size={12} />
                            </button>
                          </div>
                          <p className="font-sans text-xs text-amber-100/40 px-2 py-1 truncate">{p.size}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status */}
                {uploadStatus && (
                  <div className={`mb-4 p-3 flex items-center gap-2 font-sans text-sm ${uploadStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}
                    style={{ background: uploadStatus.type === 'success' ? 'rgba(37,211,102,0.1)' : 'rgba(255,100,100,0.1)', border: `1px solid ${uploadStatus.type === 'success' ? 'rgba(37,211,102,0.3)' : 'rgba(255,100,100,0.3)'}` }}>
                    {uploadStatus.type === 'success' ? <FaCheck size={12} /> : <FaTimes size={12} />}
                    {uploadStatus.msg}
                  </div>
                )}

                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="btn-gold w-full flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <><span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Uploading...</>
                  ) : (
                    <><FaUpload size={14} /> Upload Images</>
                  )}
                </button>
              </div>

              {/* Stats */}
              <div className="luxury-card p-6">
                <h3 className="font-display text-base text-amber-400 mb-4">Gallery Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-amber-100/50">Total Images</span>
                    <span className="text-amber-300 font-semibold">{images.length}</span>
                  </div>
                  {SERVICES.map(s => {
                    const count = images.filter(img => img.service === s).length;
                    if (count === 0) return null;
                    return (
                      <div key={s} className="flex justify-between font-sans text-xs">
                        <span className="text-amber-100/40 truncate pr-2">{s}</span>
                        <span className="text-amber-400/70 flex-shrink-0">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Gallery Management */}
            <div className="lg:col-span-3">
              <div className="luxury-card p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                  <h2 className="font-display text-xl font-bold text-amber-300 flex items-center gap-3">
                    <FaImage className="text-amber-500" size={18} /> Uploaded Images
                    <span className="font-sans text-xs text-amber-400/40 font-normal ml-1">({filtered.length})</span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <FaFilter className="text-amber-600" size={12} />
                    <select
                      className="luxury-input py-1 px-3 text-xs"
                      value={filterService}
                      onChange={e => setFilterService(e.target.value)}
                      style={{ background: '#111', width: 'auto', minWidth: '160px' }}
                    >
                      <option value="All" style={{ background: '#1a1a1a' }}>All Services</option>
                      {SERVICES.map(s => <option key={s} value={s} style={{ background: '#1a1a1a' }}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-16">
                    <div className="w-10 h-10 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mx-auto mb-4" />
                    <p className="font-sans text-sm text-amber-100/40">Loading images...</p>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="text-center py-16">
                    <FaImage className="text-amber-600/20 text-5xl mx-auto mb-4" />
                    <p className="font-display text-lg text-amber-400/40">No images found</p>
                    <p className="font-sans text-sm text-amber-100/25 mt-2">
                      {images.length === 0 ? 'Upload your first image using the panel on the left.' : 'Try selecting a different service filter.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[700px] overflow-y-auto pr-1">
                    {filtered.map((img) => (
                      <div key={img._id} className="group relative" style={{ border: '1px solid rgba(212,160,23,0.15)' }}>
                        <div className="aspect-square overflow-hidden">
                          <img src={img.url} alt={img.caption || img.service} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)' }}>
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleDelete(img._id)}
                              disabled={deleteId === img._id}
                              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                              style={{ background: 'rgba(220,38,38,0.8)' }}
                            >
                              {deleteId === img._id ? (
                                <span className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <FaTrash className="text-white" size={11} />
                              )}
                            </button>
                          </div>
                          <div>
                            <p className="font-sans text-xs text-amber-300 truncate">{img.caption || 'No caption'}</p>
                          </div>
                        </div>
                        <div className="px-2 py-1.5" style={{ background: '#111', borderTop: '1px solid rgba(212,160,23,0.1)' }}>
                          <p className="font-sans text-xs text-amber-400/60 truncate">{img.service}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}