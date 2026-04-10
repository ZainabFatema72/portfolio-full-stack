import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Certificates from './components/Certificates';
import AdminManager from './components/AdminManager'; 
import './assets/style.css';

function App() {
  const [activePage, setActivePage] = useState('about');

  return (
    <main>
      {/* Sidebar ko setActivePage pass kar rahe hain taaki Avatar click pe admin page khule */}
      <Sidebar setActivePage={setActivePage} />

      <div className="main-content">
        <Navbar activePage={activePage} setActivePage={setActivePage} />

        {/* --- Content Area --- */}
        <section style={{ display: activePage === 'about' ? 'block' : 'none' }}><About /></section>
        <section style={{ display: activePage === 'resume' ? 'block' : 'none' }}><Resume /></section>
        <section style={{ display: activePage === 'projects' ? 'block' : 'none' }}><Projects /></section>
        <section style={{ display: activePage === 'contact' ? 'block' : 'none' }}><Contact /></section>
        <section style={{ display: activePage === 'certificates' ? 'block' : 'none' }}><Certificates /></section>
        
        {/* Admin Section - Hidden from Navbar, accessible via Sidebar Avatar */}
        <section style={{ display: activePage === 'admin' ? 'block' : 'none' }}>
          <AdminManager />
        </section>
        
      </div>
    </main>
  );
}

export default App;