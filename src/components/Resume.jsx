import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Resume = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        // 1. Fetch Dynamic Experience (Type: experience)
        const { data: expData } = await supabase
          .from('resume_entries')
          .select('*')
          .eq('type', 'experience')
          .order('created_at', { ascending: false });

        // 2. Fetch Dynamic Skills
        const { data: skillData } = await supabase
          .from('skills')
          .select('*')
          .order('percentage', { ascending: false });

        if (expData) setExperience(expData);
        if (skillData) setSkills(skillData);
      } catch (err) {
        console.error("Error fetching resume data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  return (
    <article className="resume active">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      {/* --- Experience Section (DYNAMIC) --- */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box"><ion-icon name="briefcase-outline"></ion-icon></div>
          <h3 className="h3">Experience</h3>
        </div>
        <ol className="timeline-list">
          {loading ? <p style={{color: 'gray'}}>Loading Experience...</p> : 
            experience.map((item) => (
              <li className="timeline-item" key={item.id}>
                <h4 className="h4 timeline-item-title">{item.title}</h4>
                <span>{item.duration} | {item.sub_title}</span>
                <p className="timeline-text" style={{ whiteSpace: 'pre-line' }}>
                  {item.description}
                </p>
              </li>
            ))
          }
        </ol>
      </section>

      {/* --- Education Section (HAMESHA STATIC - Jaisa aapne kaha) --- */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box"><ion-icon name="book-outline"></ion-icon></div>
          <h3 className="h3">Education</h3>
        </div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">MCA | P.R. Pote Patil College, Amravati</h4>
            <span>2024 — 2026 | 81.85%</span>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">B.Sc. CS | Jagadamba Mahvidyalaya</h4>
            <span>2021 — 2024 | 69.44% | President of Science Community</span>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">HSC (12th) & SSC (10th)</h4>
            <span>Maharashtra State Board | 89.50% (HSC) | 82.20% (SSC)</span>
          </li>
        </ol>
      </section>

      {/* --- Technical Skills (DYNAMIC - Progress Bars) --- */}
      <section className="skill">
        <h3 className="h3 skills-title">Technical Expertise</h3>
        <ul className="skills-list content-card">
          {loading ? <p style={{color: 'gray'}}>Loading Skills...</p> : 
            skills.map((skill) => (
              <li className="skills-item" key={skill.id}>
                <div className="title-wrapper">
                  <h5 className="h5">{skill.name}</h5>
                  <data value={skill.percentage}>{skill.percentage}%</data>
                </div>
                <div className="skill-progress-bg">
                  <div className="skill-progress-fill" style={{ width: `${skill.percentage}%` }}></div>
                </div>
              </li>
            ))
          }
        </ul>
      </section>

      {/* --- Soft Skills & Languages (HAMESHA STATIC) --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <section className="skill">
          <h3 className="h3 skills-title">Soft Skills</h3>
          <ul className="skills-list">
            <li className="timeline-text">• Client Communication & Interaction</li>
            <li className="timeline-text">• Team Leadership (Science Community)</li>
            <li className="timeline-text">• Problem Solving & Analytical Thinking</li>
          </ul>
        </section>

        <section className="skill">
          <h3 className="h3 skills-title">Languages</h3>
          <ul className="skills-list">
            <li className="timeline-text">• English | Hindi | Marathi</li>
          </ul>
        </section>
      </div>
    </article>
  );
};

export default Resume;