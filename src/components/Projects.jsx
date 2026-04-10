import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Ensure path is correct

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  return (
    <article className="projects active">
      <header>
        <h2 className="h2 article-title">Projects</h2>
      </header>

      {loading ? (
        <p style={{ color: 'var(--white-2)' }}>Loading Projects...</p>
      ) : (
        <ul className="project-list">
          {projects.map((project) => (
            <li className="project-item active" key={project.id}>
              {/* project_link column name database ke hisab se check karein */}
              <a href={project.project_link || "#"} target="_blank" rel="noreferrer">
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>
                  {/* image_url column name database se match hona chahiye */}
                  <img src={project.image_url} alt={project.title} loading="lazy" />
                </figure>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default Portfolio;