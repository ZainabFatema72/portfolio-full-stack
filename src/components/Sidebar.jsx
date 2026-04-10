import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src="/images/zainabavtar.png" alt="Zainab Fatema" width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title="Zainab Fatema">Zainab Fatema</h1>
          <p className="title">Full Stack Developer</p>
        </div>

       
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box"><ion-icon name="mail-outline"></ion-icon></div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:zainabfatema537@gmail.com" className="contact-link">zainabfatema537@gmail.com</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box"><ion-icon name="phone-portrait-outline"></ion-icon></div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+919579700771" className="contact-link">+91 9579700771</a>
            </div>
          </li>

          {/* Date of Birth Section */}
          <li className="contact-item">
            <div className="icon-box"><ion-icon name="calendar-outline"></ion-icon></div>
            <div className="contact-info">
              <p className="contact-title">Birthday</p>
              <time dateTime="2003-01-09">January 09, 2003</time> 
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box"><ion-icon name="location-outline"></ion-icon></div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>Amravati, Maharashtra, India</address>
            </div>
          </li>
        </ul>
{/* --- Download Resume Button --- */}
        <div className="separator"></div>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <a href="/ZAINAB.pdf" download="Zainab_Fatema_Resume.pdf" className="form-btn" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
            <ion-icon name="download-outline"></ion-icon>
            <span style={{ fontSize: '1rem' }}>Download CV</span>
          </a>
        </div>

        <div className="separator"></div>

        <ul className="social-list">
          {/* GitHub */}
          <li className="social-item">
            <a href="https://github.com/ZainabFatema72" target="_blank" rel="noreferrer" className="social-link">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>

          {/* LinkedIn */}
          <li className="social-item">
            <a href="https://www.linkedin.com/in/zainab-fatema/" target="_blank" rel="noreferrer" className="social-link">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>

          {/* WhatsApp */}
          <li className="social-item">
            <a href="https://wa.me/919579700771" target="_blank" rel="noreferrer" className="social-link">
              <ion-icon name="logo-whatsapp"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;