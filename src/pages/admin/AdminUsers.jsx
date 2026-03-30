import React, { useEffect } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { toast } from 'react-toastify';
import { UserCheck, UserX, Shield, Mail, Calendar, Loader2 } from 'lucide-react';

const AdminUsers = () => {
  const { users, fetchUsers, approveMember, isLoading } = useAdminStore();

  // 🔄 ดึงข้อมูลเมื่อเปิดหน้านี้
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (id, name) => {
    try {
      await approveMember(id);
      toast.success(`อนุมัติคุณ ${name} เรียบร้อยแล้ว!`, { theme: "dark" });
    } catch (err) {
      toast.error(err, { theme: "dark" });
    }
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter">จัดการสมาชิก</h2>
          <p className="text-gray-500 text-sm mt-1">อนุมัติหรือจัดการสิทธิ์การเข้าใช้งานของลูกค้า</p>
        </div>
        <div className="bg-[#111] px-4 py-2 rounded-2xl border border-gray-800">
          <span className="text-gray-500 text-xs uppercase font-bold">ทั้งหมด</span>
          <p className="text-[#BB86FC] font-black text-xl leading-none">{users?.length || 0}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-600">
          <Loader2 className="w-10 h-10 animate-spin mb-4" />
          <p className="font-bold uppercase tracking-widest">กำลังดึงข้อมูลสมาชิก...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users?.map((user) => (
            <div 
              key={user.id} 
              className={`bg-[#0A0A0A] border p-6 rounded-[2rem] transition-all duration-300 relative overflow-hidden group
                ${user.status === 'PENDING' ? 'border-yellow-500/20 hover:border-yellow-500/50' : 'border-gray-900 hover:border-[#BB86FC]/50'}`}
            >
              {/* แถบสีสถานะด้านบน */}
              <div className={`absolute top-0 left-0 w-full h-1 opacity-50 
                ${user.status === 'PENDING' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>

              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-[#121212] rounded-2xl flex items-center justify-center border border-gray-800 group-hover:scale-110 transition-transform shadow-lg">
                  <Shield size={28} className={user.status === 'PENDING' ? 'text-yellow-500' : 'text-[#BB86FC]'} />
                </div>
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border
                  ${user.status === 'PENDING' 
                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                    : 'bg-green-500/10 text-green-500 border-green-500/20'}`}>
                  {user.status}
                </span>
              </div>

              <div className="space-y-1 mb-6">
                <h3 className="text-xl font-black text-white truncate">{user.name}</h3>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Mail size={12} />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-[10px] uppercase font-bold tracking-widest">
                  <Calendar size={12} />
                  <span>สมัครเมื่อ: {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 flex gap-3">
                {user.status === 'PENDING' ? (
                  <button 
                    onClick={() => handleApprove(user.id, user.name)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                  >
                    <UserCheck size={18} /> APPROVE NOW
                  </button>
                ) : (
                  <button 
                    disabled
                    className="flex-1 bg-gray-900 text-gray-500 font-black py-3 rounded-xl flex items-center justify-center gap-2 opacity-50"
                  >
                    <UserCheck size={18} /> ACTIVATED
                  </button>
                )}
                <button className="p-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                  <UserX size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ถ้าไม่มีข้อมูล */}
      {!isLoading && users?.length === 0 && (
        <div className="text-center py-20 bg-[#0A0A0A] rounded-[3rem] border border-dashed border-gray-800 mt-10">
          <p className="text-gray-600 font-bold uppercase tracking-widest text-xl italic">ไม่พบรายชื่อสมาชิกในขณะนี้</p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;