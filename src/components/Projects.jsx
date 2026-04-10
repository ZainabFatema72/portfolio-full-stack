import React from 'react';

const Portfolio = () => {
  const projects = [
    {
      title: 'One Touch Move',
      category: 'MERN Stack',
      link: 'https://your-onetouchmove.netlify.app', // Apni link yahan dalein
      image: '/images/one-touch-move.jpg'
    },
    {
      title: 'Express Travel (Car Rental)',
      category: 'Web Development | Netlify',
      link: 'https://express-travel-corporate.netlify.app', // Netlify link
      image: '/images/car-rental.jpg'
    },
    {
      title: 'International & Domestic Tours',
      category: 'Web Development | MERN',
      link: 'https://zainab-tours.render.com', // Render link
      image: '/images/tour-website.jpg'
    },
    {
      title: 'EmpTrack',
      category: 'Python & PostgreSQL',
      link: 'https://emptrack-zainab.netlify.app', 
      image: '/images/emptrack.jpg'
    },
    {
      title: 'Task Manager',
      category: 'MERN Stack',
      link: 'https://github.com/ZainabFatema72/task-manager',
      image: '/images/task-manager.jpg'
    },
    {
      title: 'Order Management',
      category: 'Microservices | Docker',
      link: '#', 
      image: '/images/order-management.jpg'
    }
  ];

  return (
    <article className="projects active">
      <header>
        <h2 className="h2 article-title">Projects</h2>
      </header>

      <ul className="project-list">
        {projects.map((project, index) => (
          <li className="project-item active" key={index}>
            <a href={project.link} target="_blank" rel="noreferrer">
              <figure className="project-img">
                <div className="project-item-icon-box">
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
                <img src={project.image} alt={project.title} loading="lazy" />
              </figure>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-category">{project.category}</p>
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Portfolio;