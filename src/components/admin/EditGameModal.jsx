import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { useAdminStore } from '../../store/adminStore';
import { toast } from 'react-toastify';
import { X, Gamepad2, Fingerprint, Image as ImageIcon, Tag, Save, Upload } from 'lucide-react';
import { uploadToCloudinary } from '../../utils/upload'; // ✅ Import utility ที่เราสร้างไว้

const EditGameModal = ({ isOpen, onClose, gameData }) => {
  const { updateGame, isLoading } = useAdminStore();
  const [isUploading, setIsUploading] = useState(false); // ✅ เพิ่ม state สำหรับโหลดรูป
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

  // ✅ ดูค่า imageUrl ปัจจุบันเพื่อทำ Preview
  const previewImage = watch("imageUrl");

  useEffect(() => {
    if (gameData) {
      reset({
        gameName: gameData.gameName,
        uidGame: gameData.uidGame,
        category: gameData.category,
        imageUrl: gameData.imageUrl,
        isActive: gameData.isActive
      });
    }
  }, [gameData, reset]);

  // ✅ ฟังก์ชันจัดการการเปลี่ยนรูป (Logic เดียวกับหน้า Add)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadToCloudinary(file, "games_cover"); // ส่งไป folder games_cover
      setValue("imageUrl", url); // อัปเดตค่าใน Hook Form
      toast.success("อัปโหลดรูปภาพใหม่สำเร็จ!");
    } catch (error) {
      toast.error("อัปโหลดรูปภาพไม่สำเร็จ");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      await updateGame(gameData.gameId, data);
      toast.success("อัปเดตข้อมูลสำเร็จ!");
      onClose(); 
    } catch (error) {
      toast.error(error?.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0F0F0F] w-full max-w-lg rounded-[2.5rem] border border-gray-800 shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-gray-900">
          <h3 className="text-xl font-black uppercase tracking-widest text-blue-400">Edit Game</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          
          {/* ✅ เพิ่มส่วน Preview และปุ่ม Upload รูปภาพ */}
          <div className="flex flex-col items-center gap-4 mb-2">
            <div className="w-32 h-32 bg-[#161616] rounded-3xl border-2 border-dashed border-gray-800 overflow-hidden relative group">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-700">
                  <ImageIcon size={32} />
                  <span className="text-[10px] font-bold mt-2">NO IMAGE</span>
                </div>
              )}
              
              {isUploading && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <label className="bg-blue-500/10 text-blue-400 px-6 py-2 rounded-xl text-[10px] font-black hover:bg-blue-500 hover:text-white transition-all cursor-pointer flex items-center gap-2 border border-blue-500/20">
              <Upload size={14} />
              {isUploading ? "UPLOADING..." : "CHANGE IMAGE"}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
            </label>
            
            {/* เก็บค่า imageUrl ไว้ในฟอร์ม (Hidden) */}
            <input type="hidden" {...register("imageUrl")} />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Game Name</label>
            <div className="relative">
              <Gamepad2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                {...register("gameName", { required: true })} 
                className="w-full bg-[#161616] border border-gray-800 p-4 pl-12 rounded-2xl focus:border-blue-400/50 outline-none text-sm text-white transition-all" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Game UID</label>
            <div className="relative">
              <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                {...register("uidGame", { required: true })} 
                className="w-full bg-[#161616] border border-gray-800 p-4 pl-12 rounded-2xl focus:border-blue-400/50 outline-none text-sm text-white transition-all" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Category</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  {...register("category")} 
                  className="w-full bg-[#161616] border border-gray-800 p-4 pl-12 rounded-2xl focus:border-blue-400/50 outline-none text-sm text-white transition-all" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Status</label>
              <select 
                {...register("isActive")} 
                className="w-full bg-[#161616] border border-gray-800 p-4 rounded-2xl focus:border-blue-400/50 outline-none text-sm text-white appearance-none cursor-pointer transition-all"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>

          <button 
            disabled={isLoading || isUploading} 
            type="submit" 
            className="w-full bg-blue-500 text-white font-black py-4 rounded-2xl hover:bg-blue-400 transition-all mt-4 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <><Save size={18}/> SAVE CHANGES</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGameModal;