import { useAdminStore } from '../../store/adminStore';
import { useAuthLogout } from '../../hooks/useAuthLogout';
import { Link, useLocation } from 'react-router'; 
import { 
  Gamepad2, 
  LayoutDashboard, 
  LogOut, 
  ShieldCheck, 
  ShoppingCart, 
  Users,
  Cat,
  Layers
} from 'lucide-react'; 

const Sidebar = () => {
  const { admin } = useAdminStore();
  const { logout } = useAuthLogout()
  const location = useLocation(); 

  const savedRole = (localStorage.getItem('role') || "ADMIN").toUpperCase();
  const currentRole = (admin?.role || savedRole).toUpperCase();
  const isSuper = currentRole.includes("SUPER");

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'จัดการเกม', href: '/admin/games', icon: Gamepad2 },
    { name: 'จัดการแพ็กเกจ', href: '/admin/packages', icon: Layers }, // ✨ เพิ่มใหม่ตรงนี้
    { name: 'จัดการคำสั่งซื้อ', href: '/admin/orders', icon: ShoppingCart },
    { name: 'จัดการสมาชิก', href: '/admin/members', icon: Users },
  ];

  return (
    <aside className="w-64 h-full bg-[#0A0A0A] border-r border-gray-900 flex flex-col shrink-0">
      
      <div className="p-8 border-b border-gray-900/50 mb-4 flex flex-col items-center group cursor-default">
        <div className="w-20 h-20 bg-[#111] rounded-[1.8rem] flex items-center justify-center mb-4 border-2 border-gray-800 
                        transition-all duration-500 ease-out p-3 shadow-lg 
                        group-hover:border-[#BB86FC] group-hover:shadow-[0_0_30px_rgba(187,134,252,0.2)] group-hover:rotate-6">
          <Cat 
            size={40} 
            className="text-[#BB86FC] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(187,134,252,0.8)]" 
          />
        </div>
        
        <div className="text-center">
          <h1 className="text-xl font-black text-white tracking-widest uppercase group-hover:text-[#BB86FC] transition-colors">
            PERM-UP
          </h1>
          <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full border text-[9px] font-black tracking-wider uppercase ${
            isSuper 
              ? "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]" 
              : "bg-[#BB86FC]/10 text-[#BB86FC] border-[#BB86FC]/20"
          }`}>
            <ShieldCheck size={10} />
            {currentRole.replace('_', ' ')}
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-2">
        {menuItems.map((item) => {
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

      <div className="p-4 border-t border-gray-900">
        <button 
          onClick={logout}
          className="w-full flex items-center gap-4 px-5 py-4 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all font-black text-sm cursor-pointer group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;