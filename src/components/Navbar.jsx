import React, { useState, useEffect } from 'react';

const Navbar = ({ activePage, setActivePage }) => {
  const navItems = ['About', 'Resume', 'Projects', 'Certificates', 'Contact'];

  // Default state ko 'false' (Dark) rakha hai agar pehle se kuch saved na ho
  const [isLight, setIsLight] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light'; // Sirf tabhi true hoga agar manually light mode save kiya ho
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isLight) {
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark'); // Naye user ke liye dark save hoga
    }
  }, [isLight]);

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-eerie-black-1/95 backdrop-blur-md border-t border-jet rounded-t-3xl z-50 
                    md:absolute md:bottom-auto md:top-0 md:right-0 md:left-auto md:w-fit md:rounded-tr-2xl md:rounded-bl-3xl md:rounded-tl-none md:border-t-0 md:border-l md:border-b md:px-12 
                    /* Light mode classes */
                    html.light:bg-white html.light:border-gray-200 shadow-xl transition-all duration-300">
  
      <ul className="flex justify-between items-center gap-2 p-4 md:p-0 md:h-20 md:gap-10">
        {navItems.map((item) => (
          <li key={item} className="flex-1 md:flex-none text-center">
            <button
              className={`text-[12px] md:text-[15px] font-bold transition-all duration-300 relative py-2 whitespace-nowrap tracking-wide
                ${activePage === item.toLowerCase() 
                  ? 'text-orange-yellow-crayola' 
                  : 'text-light-gray-70 html.light:text-black hover:text-orange-yellow-crayola'
                }`}
              onClick={() => setActivePage(item.toLowerCase())}
            >
              {item}
              {activePage === item.toLowerCase() && (
                <span className="hidden md:block absolute -bottom-1 left-0 w-full h-[2px] bg-orange-yellow-crayola rounded-full"></span>
              )}
            </button>
          </li>
        ))}
        
        <div className="hidden md:block w-[1px] h-8 bg-jet html.light:bg-gray-200 mx-2 opacity-50"></div>

        <li className="flex-none">
          <button 
            className="text-orange-yellow-crayola text-2xl p-2 flex items-center hover:scale-125 active:scale-90 transition-all"
            onClick={() => setIsLight(!isLight)}
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            <ion-icon name={isLight ? "moon" : "sunny"}></ion-icon>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;