import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setCerts(data);
      } catch (err) {
        console.error("Error fetching certificates:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, []);

  return (
    <article className="portfolio active">
      <header>
        <h2 className="h2 article-title">Certifications & Achievements</h2>
      </header>

      {loading ? (
        <p style={{ color: 'var(--white-2)' }}>Loading Certificates...</p>
      ) : (
        <ul className="project-list">
          {certs.map((cert) => (
            <li className="project-item active" key={cert.id}>
              <a href={cert.link || "#"} target="_blank" rel="noreferrer">
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>
                  <img 
                    src={cert.image_url} 
                    alt={cert.title} 
                    loading="lazy" 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Certificate"; }} 
                  />
                </figure>

                <h3 className="project-title">{cert.title}</h3>
                <p className="project-category">{cert.provider}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default Certificates;