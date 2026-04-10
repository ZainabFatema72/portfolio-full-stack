import React from 'react';

const About = () => {
  return (
    <>
      <header><h2 className="h2 article-title">About me</h2></header>
      <section className="about-text">
       <b> <p>
         Hi, I’m Zainab Fatema — a passionate Full-Stack Developer and MCA student based in Amravati, India.

         </p></b>
         <br></br><p>
I love building modern, scalable, and user-centric web applications using the MERN stack, and I'm constantly learning new technologies to make my work more efficient and impactful.  </p><br></br>
        <p>
         With hands-on experience in creating real-world college + personal projects, I enjoy turning ideas into practical, functional, and beautifully structured solutions.</p> <p>
My core focus is on clean code, problem-solving, and building meaningful digital experiences. </p><br></br>

<p>During my journey in MCA, I've worked on multiple team and individual projects — from AI-based healthcare tools to microservices-based systems — which helped me gain strong experience in frontend, backend, databases, and deployment workflows.</p>     </section>

<section className="service">
  <h3 className="h3 service-title">What I'm Doing</h3>
  
  <ul className="service-list">
    {/* --- Web Development Card (MERN Stack) --- */}
    <li className="service-item">
      <div className="service-icon-box">
        {/* Richard wale gold glowing style ke liye ye color style zaroori hai */}
        <ion-icon name="code-slash-outline" style={{
          fontSize: '40px', 
          color: 'var(--orange-yellow-crayola)', 
          margin: 'auto'
        }}></ion-icon>
      </div>
      <div className="service-content-box">
        <h4 className="h4 service-item-title">Web Development</h4>
        <p className="service-item-text">
          I build responsive, scalable, and dynamic websites using MERN stack (MongoDB, Express, React, Node.js).
        </p>
      </div>
    </li>

    {/* --- Backend Architecture Card (Microservices & Docker) --- */}
    <li className="service-item">
      <div className="service-icon-box">
        {/* Richard ke look jaisa unique server icon */}
        <ion-icon name="server-outline" style={{
          fontSize: '40px', 
          color: 'var(--orange-yellow-crayola)', 
          margin: 'auto'
        }}></ion-icon>
      </div>
      <div className="service-content-box">
        <h4 className="h4 service-item-title">Backend Architecture</h4>
        <p className="service-item-text">
          Experience in Microservices, Docker, and secure REST APIs with JWT authentication.
        </p>
      </div>
    </li>

    {/* --- Database Management Card (MySQL, MongoDB) --- */}
    <li className="service-item">
      <div className="service-icon-box">
        {/* Database ke liye clear "layers" icon */}
        <ion-icon name="layers-outline" style={{
          fontSize: '40px', 
          color: 'var(--orange-yellow-crayola)', 
          margin: 'auto'
        }}></ion-icon>
      </div>
      <div className="service-content-box">
        <h4 className="h4 service-item-title">Database Management</h4>
        <p className="service-item-text">
          Managing complex data migrations and organizing tables efficiently for large projects.
        </p>
      </div>
    </li>
  </ul>
</section>
    </>
  );
};

export default About;
