import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Certificates from './components/Certificates';
import AdminManager from './components/AdminManager'; 

function App() {
  const [activePage, setActivePage] = useState('about');

  return (
    /* Main container: Mobile pe padding 20px, desktop pe flex layout aur gap */
    <main className="min-h-screen bg-smoky-black text-white-2 p-4 md:p-10 lg:flex lg:justify-center lg:items-start lg:gap-10 max-w-[1440px] mx-auto">
  
  {/* Sidebar ko fixed width dein taaki wo stretch na ho */}
  <div className="lg:w-[300px] lg:sticky lg:top-10 shrink-0">
    <Sidebar setActivePage={setActivePage} />
  </div>

  {/* Main Content Area ko flex-1 dein taaki wo bachi hui poori jagah le */}
  <div className="flex-1 bg-eerie-black-2 border border-jet rounded-3xl p-5 md:p-10 min-h-[800px] shadow-2xl relative">
    <Navbar activePage={activePage} setActivePage={setActivePage} />

        {/* --- Pages Routing Logic (Tailwind Animate classes use karein components ke andar) --- */}
        <div className="mt-4">
          {activePage === 'about' && <About />}
          {activePage === 'resume' && <Resume />}
          {activePage === 'projects' && <Projects />}
          {activePage === 'contact' && <Contact />}
          {activePage === 'certificates' && <Certificates />}
          
          {/* Admin Section */}
          {activePage === 'admin' && (
            <section className="animate-fadeIn">
              <AdminManager />
            </section>
          )}
        </div>
        
      </div>
    </main>
  );
}

export default App;