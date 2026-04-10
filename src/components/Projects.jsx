import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setProjects(data || []);
      } catch (err) { console.error(err.message); }
      finally { setLoading(false); }
    };
    fetchProjects();
  }, []);

  return (
    <article className="animate-fadeIn p-4">
      <header className="relative pb-2 mb-8">
        <h2 className="text-3xl font-bold text-white capitalize">Projects</h2>
        <div className="absolute bottom-0 left-0 w-10 h-1 bg-orange-yellow-crayola rounded-full"></div>
      </header>

      {loading ? (
        <p className="text-light-gray">Loading Projects...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <li className="group relative" key={project.id}>
              <a href={project.project_link || "#"} target="_blank" rel="noreferrer">
                <figure className="relative overflow-hidden rounded-2xl mb-4 aspect-video bg-onyx border border-jet">
                  <div className="absolute inset-0 bg-smoky-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10">
                    <div className="bg-jet p-3 rounded-xl text-orange-yellow-crayola text-2xl"><ion-icon name="eye-outline"></ion-icon></div>
                  </div>
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </figure>
                <h3 className="text-white font-medium text-lg capitalize mb-1 group-hover:text-orange-yellow-crayola transition-colors">{project.title}</h3>
                <p className="text-light-gray-70 text-sm font-light">{project.category}</p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default Portfolio;