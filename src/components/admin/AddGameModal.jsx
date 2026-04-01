import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAdminStore } from '../../store/adminStore';
import { toast } from 'react-toastify';
import { X, Gamepad2, Fingerprint, Image as ImageIcon, Tag, Upload } from 'lucide-react';
import { uploadToCloudinary } from '../../utils/upload'; // ✅ Import ไฟล์ที่เราสร้างไว้

const AddGameModal = ({ isOpen, onClose }) => {
  const { addGame, isLoading } = useAdminStore();
  const [isUploading, setIsUploading] = useState(false); // State สำหรับตอนอัปโหลดรูป
  
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

  // ดูค่า imageUrl ในฟอร์มเพื่อเอามาทำ Preview
  const previewImage = watch("imageUrl");

  if (!isOpen) return null;

  // ✅ ฟังก์ชันจัดการการเปลี่ยนไฟล์และอัปโหลด
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // เรียกใช้ Utility ที่เราเขียนไว้ แยกไปโฟลเดอร์ games_cover
      const url = await uploadToCloudinary(file, "games_cover");
      
      // เอา URL ที่ได้จาก Cloudinary ไปใส่ในช่อง imageUrl ของ react-hook-form
      setValue("imageUrl", url);
      toast.success("อัปโหลดรูปภาพสำเร็จ!");
    } catch (error) {
      toast.error("อัปโหลดรูปภาพไม่สำเร็จ");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!data.imageUrl) {
      return toast.warn("กรุณาอัปโหลดรูปภาพเกม");
    }

    try {
      await addGame(data);
      toast.success("สร้างเกมสำเร็จแล้ว!");
      reset(); 
      onClose(); 
    } catch (error) {
      toast.error(error?.response?.data?.message || "เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0F0F0F] w-full max-w-lg rounded-[2.5rem] border border-gray-800 shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-8 border-b border-gray-900">
          <h3 className="text-xl font-black uppercase tracking-widest text-[#BB86FC]">Add New Game</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          
          {/* ✅ ส่วนอัปโหลดรูปภาพ & Preview */}
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
              
              {/* Loading Overlay ตอนอัพโหลด */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-[#BB86FC] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            <label className="bg-[#BB86FC]/10 text-[#BB86FC] px-6 py-2 rounded-xl text-[10px] font-black hover:bg-[#BB86FC] hover:text-[#121212] transition-all cursor-pointer flex items-center gap-2 border border-[#BB86FC]/20">
              <Upload size={14} />
              {isUploading ? "UPLOADING..." : "SELECT GAME IMAGE"}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
            </label>
            
            {/* Hidden input เพื่อเก็บค่า imageUrl ไว้ส่งเข้า onSubmit */}
            <input type="hidden" {...register("imageUrl", { required: true })} />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Game Name</label>
            <div className="relative">
              <Gamepad2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                {...register("gameName", { required: true })} 
                className="w-full bg-[#161616] border border-gray-800 p-4 pl-12 rounded-2xl focus:border-[#BB86FC]/50 outline-none transition-all text-sm text-white" 
                placeholder="VALORANT" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Game UID</label>
              <div className="relative">
                <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  {...register("uidGame", { required: true })} 
                  className="w-full bg-[#161616] border border-gray-800 p-4 pl-12 rounded-2xl focus:border-[#BB86FC]/50 outline-none transition-all text-sm text-white" 
                  placeholder="VALO_TH" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Category</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  {...register("category")} 
                  className="w-full bg-[#161616] border border-gray-800 p-4 pl-12 rounded-2xl focus:border-[#BB86FC]/50 outline-none transition-all text-sm text-white" 
                  placeholder="PC / Mobile" 
                />
              </div>
            </div>
          </div>

          <button 
            disabled={isLoading || isUploading} 
            type="submit" 
            className="w-full bg-[#BB86FC] text-[#121212] font-black py-4 rounded-2xl hover:bg-white transition-all mt-4 shadow-lg shadow-[#BB86FC]/10 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "CREATE GAME"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGameModal;