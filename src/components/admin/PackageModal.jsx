import React from 'react';
import { usePackageForm } from '../../hooks/admin/usePackageForm';
import { Loader2, X } from 'lucide-react';

const PackageModal = ({ onClose, games = [], initialData, onRefresh }) => {
  // console.log("games", games);
  const { register, handleSubmit, errors, isSubmitting } = usePackageForm(
    initialData,
    onRefresh,
    onClose
  );

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#0A0A0A] border border-gray-800 w-full max-w-md rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(187,134,252,0.1)] relative">
        
        {/* ปุ่มปิด */}
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black uppercase mb-8 text-[#BB86FC] tracking-tighter">
          {initialData ? 'แก้ไขแพ็กเกจ' : 'สร้างแพ็กเกจใหม่'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* เลือกเกม */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">เลือกเกมที่ต้องการ</label>
            <select 
              {...register("gameId", { required: "กรุณาเลือกเกม" })}
              className={`w-full bg-black border ${errors.gameId ? 'border-red-500' : 'border-gray-800'} rounded-2xl p-4 focus:border-[#BB86FC] outline-none font-bold text-white transition-all cursor-pointer`}
            >
              <option value="">-- เลือกเกมในระบบ --</option>
              {/* ใช้ optional chaining และดัก Array ว่าง */}
              {games?.length > 0 ? (
                games.map(g => (
                  // ตรวจสอบชื่อ property ให้แม่นยำ (บางที่อาจเป็น g.id)
                  <option key={g.gameId || g.id} value={g.gameId || g.id}>
                    {g.gameName || g.name}
                  </option>
                ))
              ) : (
                <option disabled>กำลังโหลดข้อมูลเกม หรือไม่มีข้อมูล...</option>
              )}
            </select>
            {errors.gameId && <p className="text-red-400 text-[10px] font-bold mt-1 ml-2">{errors.gameId.message}</p>}
          </div>

          {/* ชื่อแพ็กเกจ */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">ชื่อแพ็กเกจ</label>
            <input 
              {...register("packageName", { required: "กรุณาระบุชื่อแพ็กเกจ" })}
              placeholder="เช่น 100 Diamonds"
              className={`w-full bg-black border ${errors.packageName ? 'border-red-500' : 'border-gray-800'} rounded-2xl p-4 focus:border-[#BB86FC] outline-none font-bold text-white transition-all`}
            />
            {errors.packageName && <p className="text-red-400 text-[10px] font-bold mt-1 ml-2">{errors.packageName.message}</p>}
          </div>

          {/* ราคาและต้นทุน */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">ราคาขาย (บาท)</label>
              <input 
                {...register("price", { required: "ระบุราคา" })}
                type="number" step="0.01" placeholder="0.00"
                className={`w-full bg-black border ${errors.price ? 'border-red-500' : 'border-gray-800'} rounded-2xl p-4 focus:border-[#BB86FC] outline-none font-bold text-white transition-all`}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] ml-1">ต้นทุน (บาท)</label>
              <input 
                {...register("unitCost")}
                type="number" step="0.01" placeholder="0.00"
                className="w-full bg-black border border-gray-800 rounded-2xl p-4 focus:border-[#BB86FC] outline-none font-bold text-white transition-all"
              />
            </div>
          </div>

          {/* ปุ่มดำเนินการ */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 p-5 border border-gray-800 rounded-2xl font-black uppercase text-[11px] hover:bg-white/5 transition-colors tracking-widest text-gray-400"
            >
              ยกเลิก
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-[2] p-5 bg-[#BB86FC] text-black rounded-2xl font-black uppercase text-[11px] tracking-widest hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(187,134,252,0.2)] disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                initialData ? 'อัปเดตข้อมูล' : 'สร้างแพ็กเกจ'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageModal;