import React, { useEffect, useState } from 'react';
import EditMemberModal from '../../components/admin/EditMemberModal';
import { useAdminStore } from '../../store/adminStore';
import { toast } from 'react-toastify';
import { Loader2, Edit3 } from 'lucide-react';

const AdminMembers = () => {
  const { members, fetchMembers, updateMember, isLoading } = useAdminStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  // 🎨 ฟังก์ชันสำหรับเลือกสีตาม Status
  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case 'active':
        return 'border-green-500/20 bg-green-500/10 text-green-500';
      case 'banned':
      case 'inactive':
        return 'border-red-500/20 bg-red-500/10 text-red-500';
      case 'pending':
        return 'border-amber-500/20 bg-amber-500/10 text-amber-500'; // สีส้ม/เหลืองสำหรับรอตรวจสอบ
      default:
        return 'border-[#BB86FC]/20 bg-[#BB86FC]/10 text-[#BB86FC]'; // สีม่วงมาตรฐาน
    }
  };

  const handleSave = async (id, updateData) => {
    setIsSubmitting(true);
    try {
      await updateMember(id, updateData);
      toast.success("อัปเดตข้อมูลสำเร็จ");
      setIsEditModalOpen(false);
    } catch (err) {
      toast.error(err?.message || "เกิดข้อผิดพลาด");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-black uppercase   text-[#BB86FC] tracking-tighter">
          จัดการสมาชิก
        </h2>
      </div>

      <div className="bg-[#0A0A0A] border border-gray-900 rounded-[2rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111] text-gray-400 text-[11px] font-black uppercase tracking-widest border-b border-gray-800">
              <th className="px-6 py-5">ลูกค้า</th>
              <th className="px-6 py-5">อีเมล</th>
              <th className="px-6 py-5">สถานะ</th>
              <th className="px-6 py-5 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/40">
            {isLoading && members.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-20 text-center">
                   <Loader2 className="w-10 h-10 animate-spin mx-auto text-[#BB86FC]" />
                </td>
              </tr>
            ) : (
              members?.map((member) => (
                <tr key={member.memberId} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-bold text-white">{member.name}</td>
                  <td className="px-6 py-4 text-gray-400 font-medium">{member.email}</td>
                  <td className="px-6 py-4">
                    {/* 🌈 จุดที่เปลี่ยน: เรียกใช้ getStatusStyle */}
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border transition-all ${getStatusStyle(member.isActive)}`}>
                      {member.isActive}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => openEditModal(member)}
                      className="p-2.5 bg-[#BB86FC]/10 text-[#BB86FC] rounded-xl hover:bg-[#BB86FC] hover:text-black transition-all cursor-pointer group"
                    >
                      <Edit3 size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <EditMemberModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={selectedMember}
        onSave={handleSave}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default AdminMembers;