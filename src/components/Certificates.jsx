import React from 'react';

const Certificates = () => {
  const certs = [
    { 
      title: "AWS - Solutions Architecture Job Simulation", 
      provider: "Forage", 
      link: "#", 
      img: "/images/aws-forage.jpg" 
    },
    { 
      title: "GitHub Copilot & AI Applications", 
      provider: "Global AI Community", 
      link: "#", 
      img: "/images/github-copilot.jpg" 
    },
    { 
      title: "NPTEL: Enhancing Soft Skills & Personality", 
      provider: "IIT (Feb-Apr 2025)", 
      link: "#", 
      img: "/images/nptel.jpg" 
    },
    { 
      title: "Azure Developer Community Meetup", 
      provider: "Microsoft Hyderabad", 
      link: "#", 
      img: "/images/microsoft-azure.jpg" 
    },
    { 
      title: "Web Development Virtual Internship", 
      provider: "Internshala (8-Week Paid)", 
      link: "#", 
      img: "/images/internshala.jpg" 
    },
    { 
      title: "Python Programming (18 Days)", 
      provider: "Shikuyaa", 
      link: "#", 
      img: "/images/shikuyaa-python.jpg" 
    },
    { 
      title: "Python Gold Badge & SQL Silver Badge", 
      provider: "HackerRank", 
      link: "#", 
      img: "/images/hackerrank.jpg" 
    },
    { 
      title: "MERN Stack Training & Project", 
      provider: "Gryhon Academy", 
      link: "#", 
      img: "/images/gryphon-mern.jpg" 
    },
    { 
      title: "AMCAT Certified (2025)", 
      provider: "AMCAT", 
      link: "#", 
      img: "/images/amcat.jpg" 
    }
  ];

  return (
    <article className="portfolio active">
      <header>
        <h2 className="h2 article-title">Certifications & Achievements</h2>
      </header>

      <ul className="project-list">
        {certs.map((cert, index) => (
          <li className="project-item active" key={index}>
            <a href={cert.link} target="_blank" rel="noreferrer">
              <figure className="project-img">
                <div className="project-item-icon-box">
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
                {/* Agar image nahi hai toh placeholder dikhega */}
                <img 
                  src={cert.img} 
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
    </article>
  );
};

export default Certificates;