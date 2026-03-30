import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { 
  Gamepad2, 
  LayoutDashboard, 
  LogOut, 
  ShieldCheck, 
  ShoppingCart, 
  Users 
} from 'lucide-react'; 
import CatLogo from "../../assets/cat-logo.png";
import { Link, useLocation } from 'react-router'; // 👈 ใช้ Link แทน <a> เพื่อความลื่น

const Sidebar = () => {
  const { admin, handleLogout } = useAdminStore();
  const location = useLocation(); // 👈 ดึง Path ปัจจุบันมาเช็คปุ่มสว่าง

  // 💡 ดึงค่าจาก localStorage มาสำรอง
  const savedRole = (localStorage.getItem('role') || "ADMIN").toUpperCase();
  const currentRole = (admin?.role || savedRole).toUpperCase();
  const isSuper = currentRole.includes("SUPER");

  // รายการเมนู (Path ต้องตรงกับใน AppRouter.jsx นะครับ)
  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'จัดการเกม', href: '/admin/games', icon: Gamepad2 },
    { name: 'จัดการคำสั่งซื้อ', href: '/admin/orders', icon: ShoppingCart },
    { name: 'จัดการสมาชิก', href: '/admin/users', icon: Users }, // 👈 ลิงก์ไปหน้า Member
  ];

  return (
    <aside className="w-64 h-full bg-[#111] border-r border-gray-800 flex flex-col shrink-0">
      {/* ส่วนหัว Sidebar */}
      <div className="p-8 border-b border-gray-800/50 mb-4 flex flex-col items-center group">
        <div className="w-20 h-20 bg-[#0A0A0A] rounded-full flex items-center justify-center mb-4 border-2 border-[#BB86FC]/20 p-3 shadow-lg group-hover:border-[#BB86FC] transition-all duration-500">
          <img src={CatLogo} alt="Logo" className="w-full h-full object-contain" />
        </div>
        
        <div className="text-center">
          <h1 className="text-xl font-black text-white tracking-widest uppercase italic">PERM-UP</h1>
          <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[10px] font-black tracking-tighter ${
            isSuper 
              ? "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]" 
              : "bg-[#BB86FC]/10 text-[#BB86FC] border-[#BB86FC]/20"
          }`}>
            <ShieldCheck size={10} />
            {currentRole.replace('_', ' ')}
          </div>
        </div>
      </div>

      {/* รายการเมนู */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-2">
        {menuItems.map((item) => {
          // เช็คว่า Path ปัจจุบัน ตรงกับเมนูนี้ไหม (ถ้าตรงให้ปุ่มสว่าง)
          const isActive = location.pathname === item.href;
          
          return (
            <Link 
              key={item.name}
              to={item.href} 
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-[#BB86FC] text-[#121212] font-black shadow-[0_10px_20px_-5px_rgba(187,134,252,0.3)]' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5 font-bold'
                }`}
            >
              <item.icon size={20} className={isActive ? 'text-[#121212]' : 'text-gray-600 group-hover:text-[#BB86FC] transition-colors'} />
              <span className="text-sm tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* ปุ่มออกจากระบบ */}
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all font-black text-sm cursor-pointer group"
        >
          <LogOut size={20} className="group-hover:rotate-18 dark:text-gray-600" />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;