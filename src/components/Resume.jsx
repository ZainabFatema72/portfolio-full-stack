import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Resume = () => {
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const { data: expData } = await supabase.from('resume_entries').select('*').eq('type', 'experience').order('created_at', { ascending: false });
        const { data: skillData } = await supabase.from('skills').select('*').order('percentage', { ascending: false });
        if (expData) setExperience(expData);
        if (skillData) setSkills(skillData);
      } catch (err) { console.error(err.message); }
      finally { setLoading(false); }
    };
    fetchResumeData();
  }, []);

  return (
    <article className="animate-fadeIn p-4">
      <header className="relative pb-2 mb-8">
        <h2 className="text-3xl font-bold text-white capitalize">Resume</h2>
        <div className="absolute bottom-0 left-0 w-10 h-1 bg-orange-yellow-crayola rounded-full"></div>
      </header>

      {/* Experience Section */}
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-onyx border border-jet p-3 rounded-xl text-orange-yellow-crayola shadow-xl"><ion-icon name="briefcase-outline" size="large"></ion-icon></div>
          <h3 className="text-2xl font-bold text-white">Experience</h3>
        </div>
        <ol className="ml-8 border-l border-jet space-y-8">
          {experience.map((item) => (
            <li className="relative pl-8 before:absolute before:top-0 before:-left-[6.5px] before:w-3 before:h-3 before:bg-orange-yellow-crayola before:rounded-full before:shadow-[0_0_0_4px_#383838]" key={item.id}>
              <h4 className="text-white font-bold mb-1">{item.title}</h4>
              <span className="text-orange-yellow-crayola text-sm font-medium">{item.duration} | {item.sub_title}</span>
              <p className="text-light-gray-70 text-sm leading-relaxed mt-2 whitespace-pre-line">{item.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Education Section (Static) */}
      <section className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-onyx border border-jet p-3 rounded-xl text-orange-yellow-crayola shadow-xl"><ion-icon name="book-outline" size="large"></ion-icon></div>
          <h3 className="text-2xl font-bold text-white">Education</h3>
        </div>
        <ol className="ml-8 border-l border-jet space-y-8">
          {[
            { title: "MCA | P.R. Pote Patil College, Amravati", sub: "2024 — 2026 | 81.85%" },
            { title: "B.Sc. CS | Jagadamba Mahvidyalaya", sub: "2021 — 2024 | 69.44% | President of Science Community" }
          ].map((edu, idx) => (
            <li key={idx} className="relative pl-8 before:absolute before:top-0 before:-left-[6.5px] before:w-3 before:h-3 before:bg-orange-yellow-crayola before:rounded-full before:shadow-[0_0_0_4px_#383838]">
              <h4 className="text-white font-bold mb-1">{edu.title}</h4>
              <span className="text-orange-yellow-crayola text-sm font-medium">{edu.sub}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills Section */}
      <section className="bg-gradient-onyx border border-jet p-6 rounded-3xl">
        <h3 className="text-2xl font-bold text-white mb-6">Technical Expertise</h3>
        <ul className="space-y-6">
          {skills.map((skill) => (
            <li key={skill.id}>
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-white font-medium">{skill.name}</h5>
                <span className="text-light-gray-70 text-sm">{skill.percentage}%</span>
              </div>
              <div className="w-full bg-jet h-2 rounded-full overflow-hidden">
                <div className="bg-orange-yellow-crayola h-full rounded-full transition-all duration-1000" style={{ width: `${skill.percentage}%` }}></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default Resume;