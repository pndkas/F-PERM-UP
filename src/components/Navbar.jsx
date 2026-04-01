import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'; // 🎯 เรียกใช้ Hook Form
import { Bell, Menu, X, Search, Cat, ShieldCheck, ShieldAlert } from 'lucide-react'; 
import { useAuthLogout } from '../hooks/useAuthLogout';
import Dropdown from '../components/Dropdown';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 1. ตั้งค่า Hook Form สำหรับช่องค้นหา
  const { register, handleSubmit } = useForm();

  const { isLoggedIn, isAdmin, isSuperAdmin, displayName, logout } = useAuthLogout();
  const currentPath = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. ฟังก์ชัน Search ที่ใช้ข้อมูลจาก Hook Form
  const onSearchSubmit = (data) => {
    if (data.searchTerm?.trim()) {
      window.location.href = `/games?search=${data.searchTerm.trim()}`; 
    }
  };

  const isActive = (path) => currentPath === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-[#BB86FC]/10 ${
      isScrolled ? 'bg-[#000000]/95 backdrop-blur-xl py-2' : 'bg-[#000000] py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between gap-4">
          
          {/* 🐈 Logo */}
          <a href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-[#0A0A0A] rounded-xl border-2 border-[#BB86FC]/30 flex items-center justify-center group-hover:border-[#BB86FC] group-hover:shadow-[0_0_20px_rgba(187,134,252,0.4)] transition-all duration-300">
              <Cat className="w-6 h-6 text-[#BB86FC] group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase hidden md:block">
              PERM<span className="text-[#BB86FC]">-UP</span>
            </span>
          </a>

          {/* 🔍 Search Bar (ใช้ Hook Form) */}
          <div className="flex-1 max-w-sm hidden md:block">
            <form onSubmit={handleSubmit(onSearchSubmit)} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#BB86FC] transition-colors" />
              <input 
                type="text"
                {...register("searchTerm")} // 🎯 Register ฟิลด์ค้นหา
                placeholder="ค้นหาเกมที่คุณต้องการ..."
                className="w-full bg-[#121212] border border-gray-800 text-sm py-2.5 pl-11 pr-4 rounded-2xl outline-none focus:border-[#BB86FC]/60 transition-all placeholder:text-gray-700 text-white font-medium"
              />
            </form>
          </div>

          {/* 🔘 Member Section (Desktop) */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                
                {isSuperAdmin ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    <ShieldAlert size={14} className="text-red-500 animate-pulse" />
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-wider">Super Admin</span>
                  </div>
                ) : isAdmin ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                    <ShieldCheck size={14} className="text-yellow-500" />
                    <span className="text-[10px] font-black text-yellow-500 uppercase tracking-wider">Admin</span>
                  </div>
                ) : null}

                <button className="text-gray-500 hover:text-[#BB86FC] transition-colors cursor-pointer p-2">
                  <Bell size={20} />
                </button>
                
                <div className="h-6 w-[1px] bg-gray-800"></div>
                <Dropdown 
                  member={displayName} 
                  logout={logout} 
                  isAdmin={isAdmin} 
                  isSuperAdmin={isSuperAdmin} 
                />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <a href="/login" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">เข้าสู่ระบบ</a>
                <a href="/register" className="px-5 py-2 bg-[#BB86FC] text-[#121212] rounded-full font-bold text-sm hover:bg-white transition-all shadow-[0_0_15px_rgba(187,134,252,0.3)]">
                    สมัครสมาชิก
                </a>
              </div>
            )}
          </div>

          {/* 📱 Mobile Toggle */}
          <button className="md:hidden text-[#BB86FC]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* --- เมนูหลัก (Desktop) --- */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-4 pt-3 border-t border-gray-800/60">
          <CustomNavLink href="/" label="หน้าหลัก" active={isActive('/')} />
          <CustomNavLink href="/games" label="เกม" active={isActive('/games')} />
          <CustomNavLink href="/about" label="เกี่ยวกับเรา" active={isActive('/about')} />
        </div>
      </div>
    </nav>
  );
};

const CustomNavLink = ({ href, label, active }) => (
  <a 
    href={href} 
    className={`px-6 py-2 text-base font-bold transition-all duration-300 group relative ${active ? 'text-[#BB86FC]' : 'text-gray-400 hover:text-white'}`}
  >
    <div className="flex flex-col items-center">
      <span>{label}</span>
      <span className={`absolute -bottom-1 h-[3px] bg-[#BB86FC] rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_#BB86FC] ${active ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}></span>
    </div>
  </a>
);

export default Navbar;