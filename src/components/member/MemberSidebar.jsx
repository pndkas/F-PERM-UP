import React from 'react';
import { User, History } from 'lucide-react'; 
import { Link, useLocation } from 'react-router'; 

const MemberSidebar = () => {
  const location = useLocation();
  
  const menu = [
    { 
      name: 'โปรไฟล์ของฉัน', 
      href: '/member/profile', 
      icon: User 
    },
    { 
      name: 'ประวัติการสั่งซื้อ', 
      href: '/member/history', 
      icon: History 
    },
  ];

  return (
    <nav className="space-y-2 mt-10">
      {menu.map((item) => {
        const isActive = location.pathname === item.href;
        
        return (
          <Link 
            key={item.name} 
            to={item.href}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
              isActive 
              ? 'bg-[#BB86FC] text-black shadow-lg shadow-[#BB86FC]/20' 
              : 'text-gray-500 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon 
              size={20} 
              className={isActive ? 'text-black' : 'text-gray-500'} 
            />
            <span className="tracking-wide text-base">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MemberSidebar;