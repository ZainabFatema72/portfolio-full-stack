import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminManager = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('project');

  const [formData, setFormData] = useState({
    title: '', category: '', provider: '', link: '', desc: '', file: null, percentage: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "Zainab@2026") setIsAuthenticated(true);
    else alert("Wrong Password!");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let publicUrl = "";
      if (formData.file && (tab === 'project' || tab === 'certificate')) {
        const fileExt = formData.file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${tab}s/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('portfolio').upload(filePath, formData.file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(filePath);
        publicUrl = urlData.publicUrl;
      }

      let error;
      if (tab === 'project') {
        ({ error } = await supabase.from('projects').insert([{ title: formData.title, category: formData.category, image_url: publicUrl, project_link: formData.link }]));
      } else if (tab === 'certificate') {
        ({ error } = await supabase.from('certificates').insert([{ title: formData.title, provider: formData.provider, image_url: publicUrl, link: formData.link }]));
      } else if (tab === 'experience') {
        ({ error } = await supabase.from('resume_entries').insert([{ title: formData.title, sub_title: formData.category, duration: formData.link, description: formData.desc, type: 'experience' }]));
      } else if (tab === 'skill') {
        ({ error } = await supabase.from('skills').insert([{ name: formData.title, percentage: parseInt(formData.percentage) }]));
      } else if (tab === 'about') {
        ({ error } = await supabase.from('about_me').upsert({ id: 1, main_text: formData.title, sub_text_1: formData.desc }));
      }

      if (error) throw error;
      alert(`${tab.toUpperCase()} Updated! 🚀`);
      setFormData({ title: '', category: '', provider: '', link: '', desc: '', file: null, percentage: '' });
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  const inputClass = "w-full bg-onyx border border-jet text-white p-3 rounded-xl outline-none focus:border-orange-yellow-crayola transition-all placeholder:text-light-gray-70";

  if (!isAuthenticated) {
    return (
      <article className="animate-fadeIn p-4">
        <header className="relative pb-2 mb-8">
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <div className="absolute bottom-0 left-0 w-10 h-1 bg-orange-yellow-crayola rounded-full"></div>
        </header>
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm">
          <input type="password" className={inputClass} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="bg-gradient-jet text-orange-yellow-crayola font-bold py-3 px-8 rounded-xl border border-jet shadow-lg hover:opacity-80">Login</button>
        </form>
      </article>
    );
  }

  return (
    <article className="animate-fadeIn p-4">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h2>
        <div className="flex flex-wrap gap-2">
          {['project', 'certificate', 'experience', 'skill', 'about'].map(t => (
            <button key={t} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? 'bg-orange-yellow-crayola text-smoky-black' : 'bg-onyx text-light-gray border border-jet hover:bg-jet'}`} onClick={() => setTab(t)}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <form onSubmit={handleUpload} className="grid grid-cols-1 gap-5 max-w-2xl">
        <input type="text" placeholder={tab === 'skill' ? "Skill Name" : "Title / Designation"} className={inputClass} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        
        {tab === 'project' && <input type="text" placeholder="Category (e.g. MERN)" className={inputClass} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />}
        {tab === 'certificate' && <input type="text" placeholder="Provider (e.g. Forage)" className={inputClass} value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} />}
        {tab === 'experience' && <input type="text" placeholder="Company & Location" className={inputClass} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />}
        {tab === 'skill' && <input type="number" placeholder="Percentage (0-100)" className={inputClass} value={formData.percentage} onChange={e => setFormData({...formData, percentage: e.target.value})} required />}
        
        {(tab !== 'about' && tab !== 'skill') && <input type="text" placeholder={tab === 'experience' ? "Duration (e.g. 2026 — Present)" : "Link (Optional)"} className={inputClass} value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />}
        {(tab === 'experience' || tab === 'about') && <textarea placeholder="Description..." className={`${inputClass} min-h-[120px]`} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />}
        {(tab === 'project' || tab === 'certificate') && <input type="file" className={inputClass} onChange={e => setFormData({...formData, file: e.target.files[0]})} required />}

        <button type="submit" className="bg-gradient-jet text-orange-yellow-crayola font-bold py-4 rounded-xl border border-jet hover:opacity-90 shadow-xl transition-all" disabled={loading}>
          {loading ? 'Processing...' : `Add to ${tab.toUpperCase()}`}
        </button>
      </form>
    </article>
  );
};

export default AdminManager;