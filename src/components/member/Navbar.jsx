import React, { useState, useEffect } from 'react';
import { LogOut, Bell, Menu, X, Search } from 'lucide-react';
import { useUserStore } from '../../store/userStore'
import CatLogo from '../../assets/cat-logo.png'; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 💡 ดึงข้อมูลผ่าน Store (UI จะอัปเดตทันทีเมื่อค่าเปลี่ยน)
  const { user, token, logout } = useUserStore();
  const currentPath = window.location.pathname;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/games?search=${searchTerm.trim()}`; 
    }
  };

  const isActive = (path) => currentPath === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b border-[#BB86FC]/10 ${
      isScrolled ? 'bg-[#000000]/90 backdrop-blur-xl py-2' : 'bg-[#000000] py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex items-center justify-between gap-4">
          {/* 🐈 Logo */}
          <a href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 bg-[#0A0A0A] rounded-xl border border-[#BB86FC]/30 flex items-center justify-center border-2 group-hover:shadow-[0_0_20px_rgba(187,134,252,0.4)] transition-all">
              <img src={CatLogo} alt="Logo" className="w-7 h-7 object-contain" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter uppercase hidden md:block">
              PERM<span className="text-[#BB86FC]">-UP</span>
            </span>
          </a>

          {/* 🔍 Search Bar */}
          <div className="flex-1 max-w-sm hidden md:block">
            <form onSubmit={handleSearch} className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#BB86FC] transition-colors" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาเกมที่คุณต้องการ..."
                className="w-full bg-[#121212] border border-gray-800 text-sm py-2.5 pl-11 pr-4 rounded-2xl outline-none focus:border-[#BB86FC]/60 transition-all placeholder:text-gray-700 text-white"
              />
            </form>
          </div>

          {/* 🔘 User Section (เลิกเช็ค Admin Token แล้ว) */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            {token ? (
              <div className="flex items-center gap-5 animate-in fade-in">
                <button className="text-gray-500 hover:text-[#BB86FC] cursor-pointer">
                  <Bell size={20} />
                </button>
                <div className="h-6 w-[1px] bg-gray-800"></div>
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-bold text-white leading-none">{user}</p>
                </div>
                <button onClick={logout} className="text-gray-500 hover:text-red-400 cursor-pointer transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 animate-in fade-in">
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

        {/* --- เมนูหลัก --- */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-4 pt-3 border-t border-gray-800/60">
          <CustomNavLink href="/" label="หน้าหลัก" active={isActive('/')} />
          <CustomNavLink href="/games" label="เกม" active={isActive('/games')} />
          {token && (
            <CustomNavLink href="/history" label="ประวัติเติมเงิน" active={isActive('/history')} />
          )}
          <CustomNavLink href="/about" label="เกี่ยวกับเรา" active={isActive('/about')} />
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-[#BB86FC]/20 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="ค้นหาเกม..." className="w-full bg-[#121212] border border-gray-800 py-3 pl-11 pr-4 rounded-xl text-sm outline-none text-white" />
          </form>

          <a href="/" className={`block py-2 font-bold ${isActive('/') ? 'text-[#BB86FC]' : 'text-gray-300'}`}>หน้าหลัก</a>
          <a href="/games" className={`block py-2 font-bold ${isActive('/games') ? 'text-[#BB86FC]' : 'text-gray-300'}`}>เกม</a>
          {token && (
            <a href="/history" className={`block py-2 font-bold ${isActive('/history') ? 'text-[#BB86FC]' : 'text-gray-300'}`}>ประวัติเติมเงิน</a>
          )}
          <a href="/about" className={`block py-2 font-bold ${isActive('/about') ? 'text-[#BB86FC]' : 'text-gray-300'}`}>เกี่ยวกับเรา</a>

          <div className="pt-4 border-t border-gray-800">
            {token ? (
              <button onClick={logout} className="w-full text-center py-3 bg-red-950/20 text-red-400 font-bold rounded-xl border border-red-900/40">ออกจากระบบ</button>
            ) : (
              <div className="flex flex-col gap-3">
                <a href="/login" className="text-center py-3 text-gray-400 font-bold border border-gray-800 rounded-xl">เข้าสู่ระบบ</a>
                <a href="/register" className="text-center py-3 bg-[#BB86FC] text-[#121212] font-bold rounded-xl">สมัครสมาชิก</a>
              </div>
            )}
          </div>
        </div>
      )}
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