import { useState } from 'react';
import { supabase } from '../supabaseClient';

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleAddProject = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Image ko Storage Bucket mein upload karein
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Image ka Public URL hasil karein
      const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(filePath);

      // 3. Database ('projects' table) mein entry save karein
      const { error } = await supabase
        .from('projects')
        .insert([{ title, image_url: urlData.publicUrl }]);

      if (error) throw error;
      alert("Project Successfully Added! 🚀");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-form">
      <form onSubmit={handleAddProject} className="form">
        <input type="text" placeholder="Project Name" className="form-input" onChange={e => setTitle(e.target.value)} required />
        <input type="file" className="form-input" onChange={e => setFile(e.target.files[0])} required />
        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? 'Uploading...' : 'Publish Project'}
        </button>
      </form>
    </section>
  );
};
export default Admin;