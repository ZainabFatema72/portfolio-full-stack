import React from 'react';

const Resume = () => {
  return (
    <article className="resume active">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      {/* --- Experience Section --- */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box"><ion-icon name="briefcase-outline"></ion-icon></div>
          <h3 className="h3">Experience</h3>
        </div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Junior Software Developer Intern</h4>
            <span>Jan 2026 — Present | Royals Webtech, Nagpur</span>
            <p className="timeline-text">
              • Developing full-stack applications using **MERN Stack**, **Supabase**, and **PostgreSQL**.
            </p>
            <p className="timeline-text">
              • Implementing **Payment Gateway** integration and automated email systems via **Google App Script**.
            </p>
            <p className="timeline-text">
              • **Direct Client Interaction:** Engaging with clients to gather requirements and providing technical solutions.
            </p>
            <p className="timeline-text">
              • Working on real-time **Notification Systems** and managing database migrations.
            </p>
          </li>
        </ol>
      </section>

      {/* --- Projects Section --- */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box"><ion-icon name="code-working-outline"></ion-icon></div>
          <h3 className="h3">Featured Projects</h3>
        </div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">AlphaDevs Microservices (E-commerce)</h4>
            <p className="timeline-text">Built a scalable architecture using **Docker**, **Kafka**, **Redis**, and **Nginx** with an API Gateway pattern.</p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">One Touch Move (Health-Tech)</h4>
            <p className="timeline-text">MERN stack app with Firebase Auth for location-based doctor search and appointments.</p>
          </li>
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Express Travel & Tours</h4>
            <p className="timeline-text">Vehicle booking system with dynamic catalogs and administrative dashboards.</p>
          </li>
        </ol>
      </section>

      {/* --- Education Section --- */}
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

      {/* --- Technical Skills --- */}
      <section className="skill">
        <h3 className="h3 skills-title">Technical Expertise</h3>
        <ul className="skills-list content-card">
          <li className="skills-item">
            <div className="title-wrapper"><h5 className="h5">Full Stack (MERN, Supabase, PHP)</h5><data value="85">85%</data></div>
            <div className="skill-progress-bg"><div className="skill-progress-fill" style={{ width: '85%' }}></div></div>
          </li>
          <li className="skills-item">
            <div className="title-wrapper"><h5 className="h5">Cloud & DevOps (AWS, Docker, Azure)</h5><data value="70">70%</data></div>
            <div className="skill-progress-bg"><div className="skill-progress-fill" style={{ width: '70%' }}></div></div>
          </li>
          <li className="skills-item">
            <div className="title-wrapper"><h5 className="h5">Backend Tools (Kafka, Redis, App Script)</h5><data value="65">65%</data></div>
            <div className="skill-progress-bg"><div className="skill-progress-fill" style={{ width: '65%' }}></div></div>
          </li>
        </ul>
      </section>

      {/* --- Soft Skills & Languages --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <section className="skill">
          <h3 className="h3 skills-title">Soft Skills</h3>
          <ul className="skills-list">
            <li className="timeline-text">• Client Communication & Interaction</li>
            <li className="timeline-text">• Team Leadership (Science Community President)</li>
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