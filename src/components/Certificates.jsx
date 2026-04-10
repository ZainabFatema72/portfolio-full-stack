import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const { data, error } = await supabase.from('certificates').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setCerts(data || []);
      } catch (err) { console.error(err.message); }
      finally { setLoading(false); }
    };
    fetchCerts();
  }, []);

  return (
    <article className="animate-fadeIn p-4">
      <header className="relative pb-2 mb-8">
        <h2 className="text-3xl font-bold text-white capitalize">Certifications</h2>
        <div className="absolute bottom-0 left-0 w-10 h-1 bg-orange-yellow-crayola rounded-full"></div>
      </header>

      {loading ? (
        <p className="text-light-gray">Loading Certificates...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((cert) => (
            <li className="group bg-gradient-onyx border border-jet p-5 rounded-2xl transition-all hover:scale-[1.02]" key={cert.id}>
              <a href={cert.link || "#"} target="_blank" rel="noreferrer" className="block">
                <figure className="relative overflow-hidden rounded-xl mb-4 aspect-video">
                  {/* Hover Eye Overlay */}
                  <div className="absolute inset-0 bg-smoky-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10">
                    <div className="bg-jet p-3 rounded-xl text-orange-yellow-crayola text-2xl border border-jet">
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>
                  </div>
                  <img 
                    src={cert.image_url} 
                    alt={cert.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Certificate"; }} 
                  />
                </figure>
                <h3 className="text-white font-medium text-lg mb-1 group-hover:text-orange-yellow-crayola transition-colors">{cert.title}</h3>
                <p className="text-light-gray-70 text-sm font-light">{cert.provider}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default Certificates;