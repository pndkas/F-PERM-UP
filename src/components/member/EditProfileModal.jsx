import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // 🎯 เรียกใช้พระเอกของเรา
import { X, Save, User, Calendar, Phone, Loader2, AlertCircle } from 'lucide-react';

const EditProfileModal = ({ isOpen, onClose, initialData, onSave }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialData?.name || '',
      birthDate: initialData?.birthDate ? initialData.birthDate.split('T')[0] : '',
      phone: initialData?.phone || '',
    }
  });

  if (!isOpen) return null;

  // 2. ฟังก์ชัน Submit
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onSave(data); // ส่ง data ที่ Hook Form รวบรวมมาให้ไปบันทึก
      onClose();
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0F0F0F] border border-gray-800 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="relative p-6 border-b border-gray-800 bg-gradient-to-r from-[#BB86FC]/10 to-transparent">
          <h2 className="text-xl font-black text-white   uppercase flex items-center gap-3 tracking-tighter">
            <User className="text-[#BB86FC]" size={22} />
            Edit Your Profile
          </h2>
          <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-white transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1  ">Full Name</label>
            <div className="relative">
              <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-500' : 'text-gray-500'}`} size={18} />
              <input
                type="text"
                {...register("name", { required: "กรุณากรอกชื่อ-นามสกุล" })} // 🎯 Register
                className={`w-full bg-black/40 border ${errors.name ? 'border-red-500/50' : 'border-gray-800'} rounded-2xl py-4 pl-12 pr-4 text-white font-bold focus:border-[#BB86FC] focus:ring-1 focus:ring-[#BB86FC] outline-none transition-all`}
              />
            </div>
            {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.name.message}</p>}
          </div>

          {/* Birthday */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1  ">Birthday</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="date"
                {...register("birthDate")} // 🎯 Register
                className="w-full bg-black/40 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white font-bold focus:border-[#BB86FC] outline-none transition-all [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1  ">Phone Number</label>
            <div className="relative">
              <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.phone ? 'text-red-500' : 'text-gray-500'}`} size={18} />
              <input
                type="text"
                placeholder="08X-XXX-XXXX"
                {...register("phone", { 
                    pattern: {
                        value: /^[0-9]+$/,
                        message: "กรุณากรอกเฉพาะตัวเลข"
                    }
                })} // 🎯 Register พร้อมเช็คตัวเลข
                className={`w-full bg-black/40 border ${errors.phone ? 'border-red-500/50' : 'border-gray-800'} rounded-2xl py-4 pl-12 pr-4 text-white font-bold focus:border-[#BB86FC] outline-none transition-all`}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.phone.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#BB86FC] hover:bg-[#A370DB] text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 uppercase   tracking-widest shadow-[0_0_20px_rgba(187,134,252,0.3)]"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <>
                <Save size={20} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;