import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';

const Sidebar = ({ setActivePage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [count, setCount] = useState(null);
  const isMounted = useRef(false); // Strict lock for +1 increment

  useEffect(() => {
    // 1. Double render protection
    if (isMounted.current) return;
    isMounted.current = true;

    const updateAndFetchCount = async () => {
      try {
        const hasVisited = sessionStorage.getItem('hasVisited');

        if (!hasVisited) {
          // 2. Database mein count +1 karein
          const { error: rpcError } = await supabase.rpc('increment_visit');
          if (rpcError) throw rpcError;
          
          // Session lock set karein
          sessionStorage.setItem('hasVisited', 'true');
        }

        // 3. Latest count fetch karein
        const { data, error: fetchError } = await supabase
          .from('site_stats')
          .select('count')
          .eq('id', 'total_visits')
          .single();

        if (fetchError) throw fetchError;
        if (data) setCount(data.count);

      } catch (err) {
        console.error('Supabase Error:', err.message);
      }
    };

    updateAndFetchCount();
  }, []);

  return (
    <aside className={`bg-eerie-black-2 border border-jet rounded-3xl p-5 shadow-2xl transition-all duration-500 z-20 h-fit 
                      html.light:bg-white html.light:border-gray-200 
                      ${isExpanded ? 'max-h-[1000px]' : 'max-h-[240px] lg:max-h-none'}`}>
      
      {/* Visitor Counter Box */}
      <div className="mb-6 p-3 bg-gradient-onyx border border-jet rounded-xl text-center shadow-sm 
                      html.light:bg-gray-50 html.light:border-gray-300">
        <p className="text-orange-yellow-crayola font-bold text-xl">
          {count !== null ? count : '...'}
        </p>
        <p className="text-light-gray-70 text-[10px] uppercase tracking-widest font-bold html.light:text-black">
          Profile Visits
        </p>
      </div>

      {/* 1. Profile Header */}
      <div className="flex items-center gap-4 lg:flex-col lg:gap-6 lg:pt-2 relative">
        <figure 
          className="bg-gradient-onyx rounded-3xl p-2 w-20 lg:w-32 cursor-pointer border border-jet transition-transform active:scale-95 html.light:bg-white html.light:border-gray-200"
          onClick={() => setActivePage('admin')}
        >
          <img src="/images/zainabavtar.png" alt="Zainab Fatema" className="w-full" />
        </figure>

        <div className="flex-1 lg:text-center">
          <h1 className="text-xl font-bold text-white whitespace-nowrap lg:text-2xl html.light:text-black" title="Zainab Fatema">
            Zainab Fatema
          </h1>
          <p className="bg-gradient-onyx text-light-gray-70 text-[11px] lg:text-xs py-1 px-4 rounded-lg w-max mx-auto mt-2 font-bold border border-jet shadow-sm 
                        html.light:bg-gray-100 html.light:text-black html.light:border-gray-300">
            Full Stack Developer
          </p>
        </div>

        {/* Mobile Expand Button */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-0 right-0 p-2 text-orange-yellow-crayola lg:hidden"
        >
          <ion-icon name={isExpanded ? "chevron-up" : "chevron-down"}></ion-icon>
        </button>
      </div>

      {/* 2. Info Section */}
      <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'opacity-100 mt-8' : 'opacity-0 lg:opacity-100 lg:mt-8'}`}>
        
        <div className="h-[1px] bg-jet w-full mb-8 html.light:bg-gray-200"></div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {[
            { label: 'Email', value: 'zainabfatema537@gmail.com', icon: 'mail-outline', href: 'mailto:zainabfatema537@gmail.com' },
            { label: 'Phone', value: '+91 9579700771', icon: 'phone-portrait-outline', href: 'tel:+919579700771' },
            { label: 'Birthday', value: 'January 09, 2003', icon: 'calendar-outline' },
            { label: 'Location', value: 'Nagpur, Maharashtra, India', icon: 'location-outline' }
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-4">
              <div className="bg-gradient-onyx border border-jet p-3 rounded-xl text-orange-yellow-crayola shadow-xl shrink-0 
                              html.light:bg-white html.light:border-black html.light:shadow-md">
                <ion-icon name={item.icon}></ion-icon>
              </div>
              <div className="min-w-0">
                <p className="text-light-gray-70 text-[11px] uppercase font-bold html.light:text-black">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-white text-sm truncate block hover:text-orange-yellow-crayola transition-colors html.light:text-gray-800 font-medium">{item.value}</a>
                ) : (
                  <p className="text-white text-sm html.light:text-gray-800 font-medium">{item.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="h-[1px] bg-jet w-full my-8 html.light:bg-gray-200"></div>

        {/* Download CV Button */}
        <div className="mb-8">
          <a 
            href="/ZAINAB.pdf" 
            download 
            className="flex items-center justify-center gap-3 bg-gradient-onyx text-orange-yellow-crayola font-bold py-4 px-6 rounded-2xl border border-jet shadow-lg hover:scale-[1.02] transition-all text-sm w-full no-underline
                      html.light:bg-white html.light:border-black html.light:text-black"
          >
            <ion-icon name="download-outline" style={{ fontSize: '20px' }}></ion-icon>
            <span>DOWNLOAD CV</span>
          </a>
        </div>

        {/* Social Icons */}
        <ul className="flex items-center justify-center gap-4 text-light-gray-70 text-lg pb-4 html.light:text-black">
          <li className="hover:text-orange-yellow-crayola transition-colors"><a href="https://github.com/ZainabFatema72" target="_blank" rel="noreferrer"><ion-icon name="logo-github"></ion-icon></a></li>
          <li className="hover:text-orange-yellow-crayola transition-colors"><a href="https://www.linkedin.com/in/zainab-fatema/" target="_blank" rel="noreferrer"><ion-icon name="logo-linkedin"></ion-icon></a></li>
          <li className="hover:text-orange-yellow-crayola transition-colors"><a href="mailto:zainabfatema537@gmail.com"><ion-icon name="mail-outline"></ion-icon></a></li>
          <li className="hover:text-orange-yellow-crayola transition-colors"><a href="https://wa.me/919579700771" target="_blank" rel="noreferrer"><ion-icon name="logo-whatsapp"></ion-icon></a></li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;