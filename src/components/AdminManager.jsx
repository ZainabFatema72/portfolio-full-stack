import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminManager = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState('project'); // project, certificate, experience, skill, about

  const [formData, setFormData] = useState({
    title: '', 
    category: '', 
    provider: '', 
    link: '', 
    desc: '', 
    file: null,
    percentage: '' // specifically for skills
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

      // 1. Image Upload Logic
      if (formData.file && (tab === 'project' || tab === 'certificate')) {
        const fileExt = formData.file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${tab}s/${fileName}`;
        
        const { error: uploadError } = await supabase.storage.from('portfolio').upload(filePath, formData.file);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(filePath);
        publicUrl = urlData.publicUrl;
      }

      // 2. Database Routing Logic
      let error;
      if (tab === 'project') {
        ({ error } = await supabase.from('projects').insert([{ 
          title: formData.title, category: formData.category, image_url: publicUrl, project_link: formData.link 
        }]));
      } 
      else if (tab === 'certificate') {
        ({ error } = await supabase.from('certificates').insert([{ 
          title: formData.title, provider: formData.provider, image_url: publicUrl, link: formData.link 
        }]));
      } 
      else if (tab === 'experience') {
        // Resume entries table mein sirf 'experience' type jayega
        ({ error } = await supabase.from('resume_entries').insert([{ 
          title: formData.title, sub_title: formData.category, duration: formData.link, description: formData.desc, type: 'experience' 
        }]));
      } 
      else if (tab === 'skill') {
        ({ error } = await supabase.from('skills').insert([{ 
          name: formData.title, percentage: parseInt(formData.percentage) 
        }]));
      }
      else if (tab === 'about') {
        ({ error } = await supabase.from('about_me').upsert({ 
          id: 1, main_text: formData.title, sub_text_1: formData.desc 
        }));
      }

      if (error) throw error;
      alert(`${tab.toUpperCase()} updated successfully! 🚀`);
      setFormData({ title: '', category: '', provider: '', link: '', desc: '', file: null, percentage: '' });

    } catch (err) { alert(err.message); }
    finally { setLoading(false); }
  };

  if (!isAuthenticated) {
    return (
      <article className="about active">
        <header><h2 className="h2 article-title">Admin Login</h2></header>
        <form onSubmit={handleLogin} className="form">
          <input type="password" className="form-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="form-btn" style={{marginTop:'10px'}}>Login</button>
        </form>
      </article>
    );
  }

  return (
    <article className="about active">
      <header>
        <h2 className="h2 article-title">Admin Dashboard</h2>
        <div style={{display:'flex', gap:'10px', marginBottom:'20px', flexWrap: 'wrap'}}>
          {['project', 'certificate', 'experience', 'skill', 'about'].map(t => (
            <button key={t} className={`form-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </header>
      
      <form onSubmit={handleUpload} className="form">
        {/* Title Input */}
        <input 
          type="text" 
          placeholder={tab === 'skill' ? "Skill Name (e.g. React)" : tab === 'about' ? "About Title" : "Title / Designation"} 
          className="form-input" 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} 
          required 
        />

        {/* Dynamic Fields */}
        {tab === 'project' && <input type="text" placeholder="Category (e.g. MERN)" className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />}
        {tab === 'certificate' && <input type="text" placeholder="Provider (e.g. Forage)" className="form-input" value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})} />}
        {tab === 'experience' && <input type="text" placeholder="Company Name & Location" className="form-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />}
        
        {tab === 'skill' && (
          <input type="number" placeholder="Percentage (0-100)" className="form-input" value={formData.percentage} onChange={e => setFormData({...formData, percentage: e.target.value})} required />
        )}

        {(tab !== 'about' && tab !== 'skill') && (
          <input 
            type="text" 
            placeholder={tab === 'experience' ? "Duration (e.g. Jan 2026 — Present)" : "Link (Optional)"} 
            className="form-input" 
            value={formData.link} 
            onChange={e => setFormData({...formData, link: e.target.value})} 
          />
        )}
        
        {(tab === 'experience' || tab === 'about') && (
          <textarea 
            placeholder={tab === 'about' ? "About Me Description" : "Job Responsibilities (Use Enter for new lines)"} 
            className="form-input" 
            value={formData.desc} 
            onChange={e => setFormData({...formData, desc: e.target.value})} 
            style={{minHeight: '120px'}} 
          />
        )}
        
        {(tab === 'project' || tab === 'certificate') && (
          <input type="file" className="form-input" onChange={e => setFormData({...formData, file: e.target.files[0]})} required />
        )}
        
        <button type="submit" className="form-btn" disabled={loading}>
          <span>{loading ? 'Uploading...' : `Add to ${tab.toUpperCase()}`}</span>
        </button>
      </form>
    </article>
  );
};

export default AdminManager;