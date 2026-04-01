import { CreditCard, Loader2, Upload } from "lucide-react";

export const CheckoutSidebar = ({ watchedPackage, preview, onFileChange, loading }) => (
  <div className="bg-[#0A0A0A] p-8 rounded-[3rem] border border-gray-900 sticky top-28 shadow-2xl">
    <h3 className="text-xl font-black mb-6 flex items-center gap-2  "><CreditCard className="text-[#BB86FC]" /> สรุปการสั่งซื้อ</h3>
    
    <div className="bg-black/50 p-6 rounded-3xl border border-gray-900 mb-8 text-right">
      {watchedPackage ? (
        <>
          <span className="text-[10px] font-black text-gray-500 uppercase">ยอดชำระสุทธิ</span>
          <p className="text-4xl font-black text-[#BB86FC]">฿{Number(watchedPackage.price).toLocaleString()}</p>
        </>
      ) : (
        <p className="py-6 text-center text-gray-700 font-black   uppercase text-xs">กรุณาเลือกแพ็กเกจ</p>
      )}
    </div>

    <div className="relative border-2 border-dashed border-gray-800 rounded-[2rem] aspect-[4/5] flex items-center justify-center bg-black overflow-hidden group hover:border-[#BB86FC]/50 transition-all cursor-pointer">
      {preview ? <img src={preview} className="w-full h-full object-contain" /> : <Upload className="text-gray-800" size={36} />}
      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={onFileChange} accept="image/*" />
    </div>

    <button type="submit" disabled={loading} className="w-full mt-8 bg-[#BB86FC] text-black py-5 rounded-2xl font-black uppercase hover:bg-white transition-all disabled:opacity-50">
      {loading ? <Loader2 className="animate-spin inline mr-2" /> : "ยืนยันการเติมเงิน"}
    </button>
  </div>
);