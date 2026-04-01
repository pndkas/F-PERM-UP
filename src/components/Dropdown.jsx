import React, { useState } from 'react';
import { LogOut, User, ShoppingBag, ChevronDown, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router'; 
import { useAuthLogout } from '../hooks/useAuthLogout';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { logout, displayName, isAdmin, isSuperAdmin } = useAuthLogout();

  const getAvatarColor = () => {
    if (isSuperAdmin) return 'from-red-500 to-rose-700 text-white';
    if (isAdmin) return 'from-yellow-400 to-orange-600 text-[#121212]';
    return 'from-[#BB86FC] to-[#7C4DFF] text-[#121212]';
  };

  return (
    <div 
      className="relative pb-2" 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* 🔘 ส่วนของโปรไฟล์ (ปุ่ม) */}
      <div className={`flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${isOpen ? 'bg-[#BB86FC]/10 text-[#BB86FC]' : 'text-white'}`}>
        <div className={`w-8 h-8 bg-gradient-to-br ${getAvatarColor()} rounded-full flex items-center justify-center font-black text-xs shadow-lg transition-transform duration-500 ${isOpen ? 'scale-110 rotate-6' : ''}`}>
          {displayName ? displayName.charAt(0).toUpperCase() : 'M'}
        </div>
        <div className="text-left hidden lg:block">
          <p className="text-xs font-bold leading-none">{displayName || 'Member'}</p>
          <p className={`text-[10px] mt-1 uppercase tracking-tighter font-bold ${isSuperAdmin ? 'text-red-500' : isAdmin ? 'text-yellow-500' : 'text-gray-500'}`}>
            {isSuperAdmin ? 'Super Admin' : isAdmin ? 'Admin' : 'Active'}
          </p>
        </div>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* 📜 รายการเมนูภายใน Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-[90%] w-60 bg-[#0F0F0F] border border-gray-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
          <div className="p-2 space-y-0.5">
            
            {/* 👑 ส่วนของ Admin / Super Admin */}
            {(isAdmin || isSuperAdmin) && (
              <>
                <DropdownLink 
                  to="/admin/dashboard"  
                  icon={<LayoutDashboard size={16} />} 
                  label="แดชบอร์ดจัดการระบบ" 
                  className="text-yellow-500 hover:bg-yellow-500/10"
                  onClick={() => setIsOpen(false)} 
                />
                <div className="h-[1px] bg-gray-800/50 my-1 mx-2"></div>
              </>
            )}

            {/* 👤 ส่วนของ Member ปกติ (จะโชว์เฉพาะคนที่ไม่ใช่ Admin เท่านั้น) */}
            {!isAdmin && !isSuperAdmin && (
              <>
                <DropdownLink to="/member/profile" icon={<User size={16}/>} label="โปรไฟล์ของฉัน" onClick={() => setIsOpen(false)} />
                <DropdownLink to="/member/history" icon={<ShoppingBag size={16}/>} label="ประวัติการซื้อ" onClick={() => setIsOpen(false)} />
                <div className="h-[1px] bg-gray-800/50 my-1 mx-2"></div>
              </>
            )}
            
            {/* 🚪 ปุ่มออกจากระบบ (เห็นทุกคน) */}
            <button 
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors rounded-xl cursor-pointer"
            >
              <LogOut size={16} />
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownLink = ({ to, icon, label, className = "", onClick }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-[#BB86FC] hover:bg-[#BB86FC]/5 transition-all rounded-xl group ${className}`}
  >
    <span className="transition-colors group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-bold">{label}</span>
  </Link>
);

export default Dropdown;