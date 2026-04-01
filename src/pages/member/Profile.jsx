import React, { useEffect, useState } from 'react';
import { useMemberStore } from '../../store/memberStore';
import { 
  User, Mail, Calendar, Loader2, CheckCircle2, Wallet, Trophy
} from 'lucide-react';
import EditProfileModal from '../../components/member/EditProfileModal';
import { toast } from 'react-toastify'; // 👈 เปลี่ยนเป็นตัวนี้

const Profile = () => {
  const { fetchProfile, memberData, isLoading, updateProfile } = useMemberStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // ฟังก์ชันจัดการตอนกด Save (ใช้ react-toastify)
  const handleSaveProfile = async (formData) => {
    try {
      await updateProfile(formData);
      toast.success('🚀 อัปเดตโปรไฟล์สำเร็จ!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark", // 👈 ให้เข้ากับ Theme เว็บ
      });
    } catch (error) {
      toast.error(error || 'เกิดข้อผิดพลาดในการอัปเดต');
    }
  };

  if (isLoading && !memberData) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#BB86FC]" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 🔝 Hero Section */}
      <div className="relative bg-[#0F0F0F] border border-gray-800 rounded-[2rem] p-6 md:p-8 mb-8 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#BB86FC]/10 blur-[80px] rounded-full" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-[#BB86FC] to-[#7C4DFF] flex items-center justify-center text-4xl font-black text-[#121212] shadow-[0_0_30px_rgba(187,134,252,0.2)]">
            {memberData?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase">
                {memberData?.name || "Username"}
              </h1>
              {memberData?.isActive === "ACTIVE" && (
                <CheckCircle2 size={20} className="text-[#BB86FC]" />
              )}
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mt-3 mb-5">
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <Mail size={14} className="text-[#BB86FC]" />
                {memberData?.email}
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <Calendar size={14} className="text-[#BB86FC]" />
                เป็นสมาชิกเมื่อ {memberData?.createdAt ? new Date(memberData.createdAt).toLocaleDateString('th-TH') : "ไม่ระบุ"}
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <BadgeBox icon={<Trophy size={14}/>} label="Tier" value="Gold Member" color="text-[#BB86FC]" />
              <BadgeBox icon={<Wallet size={14}/>} label="Points" value="1,250" color="text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 📝 Content Area */}
      <div className="animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-[#0F0F0F] border border-gray-800 rounded-[2rem] p-6 md:p-8 shadow-2xl">
          <h2 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase">
            <User className="text-[#BB86FC]" size={20} />
            Account Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <InfoBox label="Full Name" value={memberData?.name} />
            <InfoBox label="Email Address" value={memberData?.email} />
            <InfoBox label="Birthday" value={memberData?.birthDate ? new Date(memberData.birthDate).toLocaleDateString('th-TH') : "ยังไม่ได้ระบุข้อมูล"} />
            <InfoBox label="Phone Number" value={memberData?.phone || "ยังไม่ได้เพิ่มเบอร์โทรศัพท์"} />
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-800 flex justify-end">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#BB86FC]/10 hover:bg-[#BB86FC] hover:text-black text-[#BB86FC] border border-[#BB86FC]/20 font-black rounded-xl transition-all cursor-pointer uppercase text-xs tracking-[0.2em]"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* 🛠 Modal */}
      <EditProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={memberData}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

// Component ย่อย
const InfoBox = ({ label, value }) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</p>
    <div className="px-5 py-3.5 bg-black/40 border border-gray-800 rounded-xl text-gray-300 font-bold text-sm">
      {value || "-"}
    </div>
  </div>
);

const BadgeBox = ({ icon, label, value, color }) => (
  <div className="bg-black/60 border border-gray-800 px-4 py-2 rounded-xl flex items-center gap-3">
    <div className={color}>{icon}</div>
    <div className="flex gap-2 items-center">
      <span className="text-gray-500 text-[10px] font-black uppercase tracking-tighter">{label}</span>
      <span className={`font-bold text-xs uppercase ${color}`}>{value}</span>
    </div>
  </div>
);

export default Profile;