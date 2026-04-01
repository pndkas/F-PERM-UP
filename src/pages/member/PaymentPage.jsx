import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Upload, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const PaymentPage = ({ selectedGame, selectedPackage }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. ประกาศใช้ Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // ดูการเปลี่ยนแปลงของไฟล์เพื่อทำ Preview
  const watchFile = watch("slip");

  // ฟังก์ชันจัดการรูป Preview (จะทำงานเมื่อ watchFile เปลี่ยน)
  React.useEffect(() => {
    if (watchFile && watchFile[0]) {
      const file = watchFile[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [watchFile]);

  // 2. ฟังก์ชัน Submit (Hook Form จะส่ง data มาให้เลย)
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('gameId', selectedGame.gameId);
    formData.append('packageId', selectedPackage.packageId || selectedPackage.id);
    formData.append('customerUid', data.customerUid);
    formData.append('amount', selectedPackage.price);
    formData.append('slip', data.slip[0]); // ดึงไฟล์ตัวแรกจาก FileList

    try {
      setLoading(true);
      await axios.post('http://localhost:9000/orders/checkout', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}` // กันเหนียวใส่ token ไปด้วย
        }
      });
      toast.success("ส่งสลิปเรียบร้อยแล้ว!");
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาดในการส่งข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#0A0A0A] border border-gray-900 p-8 rounded-[2.5rem] shadow-2xl animate-in fade-in duration-500">
      <h2 className="text-2xl font-black mb-6 flex items-center gap-3   uppercase tracking-tighter text-white">
        <div className="p-2 bg-[#BB86FC]/10 rounded-xl">
          <CheckCircle className="text-[#BB86FC]" size={24} />
        </div> 
        Confirm <span className="text-[#BB86FC]">Payment</span>
      </h2>

      {/* 3. ใช้ handleSubmit ของ Hook Form ครอบฟังก์ชัน onSubmit ของเรา */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* ช่องกรอก ID เกม */}
        <div>
          <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-[0.2em] ml-1">Player ID (UID)</label>
          <input 
            type="text" 
            {...register("customerUid", { required: "กรุณากรอก UID ของคุณ" })} // 🎯 Register ฟิลด์
            className={`w-full bg-[#111] border ${errors.customerUid ? 'border-red-500/50' : 'border-gray-800'} rounded-2xl px-5 py-4 focus:border-[#BB86FC] outline-none transition-all text-white font-bold placeholder:text-gray-700`}
            placeholder="กรอก ID ของคุณ"
          />
          {errors.customerUid && (
            <p className="text-red-400 text-[10px] mt-2 ml-1 font-bold flex items-center gap-1 uppercase">
              <AlertCircle size={12} /> {errors.customerUid.message}
            </p>
          )}
        </div>

        {/* ส่วนอัปโหลดสลิป */}
        <div className="relative">
          <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-[0.2em] ml-1">อัปโหลดสลิป</label>
          <div className={`border-2 border-dashed ${errors.slip ? 'border-red-500/30' : 'border-gray-800'} rounded-3xl p-4 text-center hover:border-[#BB86FC]/50 transition-colors cursor-pointer relative overflow-hidden bg-[#111]/50`}>
            {preview ? (
              <div className="relative group">
                <img src={preview} alt="Slip Preview" className="max-h-64 mx-auto rounded-2xl object-contain shadow-2xl" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl text-xs font-bold uppercase text-white">
                  เปลี่ยนรูปภาพ
                </div>
              </div>
            ) : (
              <div className="py-10 flex flex-col items-center gap-3">
                <div className="p-4 bg-white/5 rounded-full mb-2">
                   <Upload className="text-gray-500" size={32} />
                </div>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest">คลิกเพื่อเลือกรูปสลิป</p>
                <p className="text-gray-700 text-[9px] uppercase tracking-tighter   font-bold">รองรับไฟล์ JPG, PNG เท่านั้น</p>
              </div>
            )}
            <input 
              type="file" 
              {...register("slip", { required: "กรุณาแนบรูปสลิป" })} // 🎯 Register ไฟล์
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
            />
          </div>
          {errors.slip && (
            <p className="text-red-400 text-[10px] mt-2 ml-1 font-bold flex items-center gap-1 uppercase">
              <AlertCircle size={12} /> {errors.slip.message}
            </p>
          )}
        </div>

        {/* ปุ่มยืนยัน */}
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-[#BB86FC] text-[#121212] py-5 rounded-[1.5rem] font-black uppercase tracking-tighter hover:bg-white hover:shadow-[0_0_30px_rgba(187,134,252,0.3)] disabled:bg-gray-800 disabled:text-gray-600 transition-all flex items-center justify-center gap-3  "
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Confirm Transaction</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;