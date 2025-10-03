import { useState } from "react";

const BottomNavbar = () => {
  const [active, setActive] = useState("Home");

  const navItems = [
    { name: "Home", icon: (
      <svg className="w-5 h-5 mb-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
      </svg>
    ) },
    { name: "Search", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>
      </svg>
    ) },
    { name: "Trips", icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mb-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8"/><path d="M7 14h.01"/><path d="M17 14h.01"/><rect width="18" height="8" x="3" y="10" rx="2"/><path d="M5 18v2"/><path d="M19 18v2"/>
      </svg>
    ) },
    { name: "Profile", icon: (
      <svg className="w-5 h-5 mb-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
      </svg>
    ) },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={`inline-flex flex-col items-center justify-center rounded-3xl px-5 transition-colors
              ${active === item.name 
                ? "bg-maincolor text-white" 
                : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
              }`}
          >
            <span className={`${active === item.name ? "text-white" : "group-hover:text-maincolor"}`}>
              {item.icon}
            </span>
            <span className={`text-sm ${active === item.name ? "text-white" : "group-hover:text-maincolor"}`}>
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
