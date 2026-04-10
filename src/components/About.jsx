import React from 'react';

const About = () => {
  return (
    <article className="animate-fadeIn">
      <header className="relative pb-2 mb-5">
        <h2 className="text-3xl font-semibold text-white capitalize leading-tight">About me</h2>
        <div className="absolute bottom-0 left-0 w-8 h-1 bg-orange-yellow-crayola rounded-full"></div>
      </header>

      <section className="text-light-gray-70 text-sm leading-relaxed space-y-4">
        <p className="font-bold text-white text-base">
          Hi, I’m Zainab Fatema — a passionate Full-Stack Developer and MCA student based in Amravati, India.
        </p>
        <p>
          I love building modern, scalable, and user-centric web applications using the MERN stack.
        </p>
        <p>
          My core focus is on clean code, problem-solving, and building meaningful digital experiences.
        </p>
      </section>

      <section className="mt-8">
        <h3 className="text-2xl font-semibold text-white mb-6">What I'm Doing</h3>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: "code-slash-outline", title: "Web Development", text: "I build responsive websites using MERN stack." },
            { icon: "server-outline", title: "Backend Architecture", text: "Experience in Microservices, Docker, and REST APIs." },
            { icon: "layers-outline", title: "Database Management", text: "Managing complex data migrations and table organization." }
          ].map((service, index) => (
            <li key={index} className="bg-gradient-onyx border border-jet p-6 rounded-2xl flex items-start gap-4 transition-all duration-500">
              <div className="text-4xl text-orange-yellow-crayola">
                <ion-icon name={service.icon}></ion-icon>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">{service.title}</h4>
                <p className="text-light-gray-70 text-sm">{service.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default About;