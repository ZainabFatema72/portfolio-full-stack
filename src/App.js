import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Certificates from './components/Certificates';
import './assets/style.css';

function App() {
  const [activePage, setActivePage] = useState('about');

  return (
    <main>
      {/* Sidebar hamesha left mein rahega */}
      <Sidebar />

      <div className="main-content">
        {/* Navbar top right mein fixed rahega */}
        <Navbar activePage={activePage} setActivePage={setActivePage} />

        {/* Content Area */}
        <section style={{ display: activePage === 'about' ? 'block' : 'none' }}><About /></section>
        <section style={{ display: activePage === 'resume' ? 'block' : 'none' }}><Resume /></section>
        <section style={{ display: activePage === 'projects' ? 'block' : 'none' }}><Projects /></section>
        <section style={{ display: activePage === 'contact' ? 'block' : 'none' }}><Contact /></section>
        <section style={{ display: activePage === 'certificates' ? 'block' : 'none' }}><Certificates /></section>
      </div>
    </main>
  );
}

export default App;