import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';

const AdminManager = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('project');
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null); // Track kar rha hai ki hum update kar rahe hain ya add

  const [formData, setFormData] = useState({
    title: '', category: '', provider: '', link: '', desc: '', file: null, percentage: ''
  });

  const tableMap = { 
    project: 'projects', 
    certificate: 'certificates', 
    skill: 'skills', 
    experience: 'resume_entries',
    about: 'about_me'
  };

  // Warning fix: useCallback ka use kiya taaki function rebuild na ho baar baar
  const fetchItems = useCallback(async () => {
    const tableName = tableMap[tab];
    if (!tableName || tableName === 'about_me') return;

    const { data, error } = await supabase.from(tableName).select('*').order('created_at', { ascending: false });
    if (!error) setItems(data);
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { 
    if (isAuthenticated) fetchItems(); 
  }, [isAuthenticated, fetchItems]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "Zainab@2026") setIsAuthenticated(true);
    else alert("Wrong Password!");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let publicUrl = formData.image_url || ""; // Purani image rakhein agar nayi upload nahi ki

      // 1. Image Upload (Sirf agar nayi file select ki ho)
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
      const tableName = tableMap[tab];
      
      // Data Object Taiyar Karein
      let payload = {};
      if (tab === 'project') payload = { title: formData.title, category: formData.category, image_url: publicUrl, project_link: formData.link };
      else if (tab === 'certificate') payload = { title: formData.title, provider: formData.provider, image_url: publicUrl, link: formData.link };
      else if (tab === 'experience') payload = { title: formData.title, sub_title: formData.category, duration: formData.link, description: formData.desc, type: 'experience' };
      else if (tab === 'skill') payload = { name: formData.title, percentage: parseInt(formData.percentage) };
      else if (tab === 'about') payload = { id: 1, main_text: formData.title, sub_text_1: formData.desc };

      // 2. Add vs Update Logic
      if (editId) {
        ({ error } = await supabase.from(tableName).update(payload).eq('id', editId));
      } else {
        if (tab === 'about') ({ error } = await supabase.from(tableName).upsert(payload));
        else ({ error } = await supabase.from(tableName).insert([payload]));
      }

      if (error) throw error;
      
      alert(`${tab.toUpperCase()} ${editId ? 'Updated' : 'Added'} Successfully! 🚀`);
      resetForm();
      fetchItems();
    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  const resetForm = () => {
    setFormData({ title: '', category: '', provider: '', link: '', desc: '', file: null, percentage: '' });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      title: item.title || item.name || '',
      category: item.category || item.sub_title || '',
      provider: item.provider || '',
      link: item.link || item.project_link || item.duration || '',
      desc: item.description || item.sub_text_1 || '',
      percentage: item.percentage || '',
      image_url: item.image_url || null,
      file: null
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Kyu Zainab, isse delete karna hai?")) return;
    const { error } = await supabase.from(tableMap[tab]).delete().eq('id', id);
    if (!error) fetchItems();
    else alert(error.message);
  };

  const inputClass = "w-full bg-onyx border border-jet text-white p-3 rounded-xl outline-none focus:border-orange-yellow-crayola transition-all placeholder:text-light-gray-70";

  if (!isAuthenticated) {
    return (
      <div className="p-10 text-center bg-smoky-black min-h-screen">
        <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-4">
          <h2 className="text-2xl text-white font-bold mb-6">Zainab's Space</h2>
          <input type="password" className={inputClass} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="bg-orange-yellow-crayola text-black p-3 rounded-xl w-full font-bold">Login</button>
        </form>
      </div>
    );
  }

  return (
    <article className="p-4 space-y-10 animate-fadeIn">
      <header>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Admin Dashboard</h2>
          {editId && <button onClick={resetForm} className="text-orange-yellow-crayola border border-orange-yellow-crayola px-4 py-1 rounded-lg text-xs">Cancel Edit</button>}
        </div>
        <div className="flex flex-wrap gap-2">
          {['project', 'certificate', 'experience', 'skill', 'about'].map(t => (
            <button key={t} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${tab === t ? 'bg-orange-yellow-crayola text-black' : 'bg-onyx text-white border border-jet hover:bg-jet'}`} 
              onClick={() => { setTab(t); resetForm(); }}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* FORM SECTION */}
      <form onSubmit={handleUpload} className="grid gap-5 max-w-2xl bg-eerie-black-2 p-6 rounded-3xl border border-jet shadow-xl relative">
        <h3 className="text-xl font-bold text-white uppercase">{editId ? 'Update' : 'Add'} {tab}</h3>
        
        <input type="text" placeholder={tab === 'skill' ? "Skill Name" : "Title / Designation"} className={inputClass} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
        
        {tab === 'project' && <input type="text" placeholder="Category (e.g. MERN)" className={inputClass} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />}
        {tab === 'certificate' && <input type="text" placeholder="Provider (e.g. Google)" className={inputClass} value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} />}
        {tab === 'experience' && <input type="text" placeholder="Company Name" className={inputClass} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />}
        {tab === 'skill' && <input type="number" placeholder="Percentage (0-100)" className={inputClass} value={formData.percentage} onChange={e => setFormData({...formData, percentage: e.target.value})} required />}
        
        {(tab !== 'about' && tab !== 'skill') && <input type="text" placeholder={tab === 'experience' ? "Duration (e.g. 2024 - Present)" : "Link (Optional)"} className={inputClass} value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />}
        {(tab === 'experience' || tab === 'about') && <textarea placeholder="Detailed Description..." className={`${inputClass} min-h-[120px]`} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />}
        
        {(tab === 'project' || tab === 'certificate') && (
          <div className="space-y-2">
            <p className="text-xs text-light-gray-70">Image (Leave empty to keep current)</p>
            <input type="file" className={inputClass} onChange={e => setFormData({...formData, file: e.target.files[0]})} required={!editId} />
          </div>
        )}

        <button type="submit" className="bg-orange-yellow-crayola text-black font-bold py-4 rounded-xl shadow-lg hover:scale-[1.01] transition-all" disabled={loading}>
          {loading ? 'Processing...' : `${editId ? 'Update' : 'Save'} ${tab.toUpperCase()}`}
        </button>
      </form>

      {/* LIST SECTION */}
      {tab !== 'about' && (
        <div className="bg-eerie-black-2 p-6 rounded-3xl border border-jet">
          <h3 className="text-xl font-bold text-white mb-6">Manage {tab}s</h3>
          <div className="space-y-4">
            {items.length > 0 ? items.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 bg-onyx border border-jet rounded-xl hover:border-orange-yellow-crayola transition-all">
                <div className="truncate pr-4">
                  <p className="text-white font-medium truncate">{item.title || item.name}</p>
                  <p className="text-light-gray-70 text-[10px] uppercase tracking-tighter italic">{item.category || item.provider || item.duration}</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button onClick={() => handleEdit(item)} className="text-orange-yellow-crayola text-xs font-bold uppercase hover:underline">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 text-xs font-bold uppercase hover:underline">Delete</button>
                </div>
              </div>
            )) : <p className="text-light-gray-70 text-sm italic">No entries found.</p>}
          </div>
        </div>
      )}
    </article>
  );
};

export default AdminManager;