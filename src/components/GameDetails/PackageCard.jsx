import React from 'react';
import { CheckCircle, Zap } from 'lucide-react'; 

export const PackageCard = ({ pkg, isSelected, onSelect }) => {
  
  // สร้างฟังก์ชันจัดการการคลิก
  const handleClick = () => {
    if (isSelected) {
      // ถ้าเลือกอยู่แล้ว ให้ส่ง null กลับไปเพื่อยกเลิกการเลือก
      onSelect(null);
    } else {
      // ถ้ายังไม่ได้เลือก ให้เลือกแพ็กเกจนี้
      onSelect(pkg);
    }
  };

  return (
    <div 
      onClick={handleClick} // เปลี่ยนมาใช้ฟังก์ชันที่สร้างใหม่
      className={`relative p-5 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 group ${
        isSelected 
        ? 'border-[#BB86FC] bg-[#BB86FC]/5 shadow-[0_0_25px_rgba(187,134,252,0.15)] scale-[1.02]' 
        : 'border-gray-900 bg-[#0A0A0A] hover:border-gray-700 hover:scale-[1.01]'
      }`}
    >
      {/* Icon แสดงสถานะการเลือก */}
      {isSelected && (
        <div className="absolute top-4 right-4 text-[#BB86FC] animate-in zoom-in duration-300">
          <CheckCircle size={24} fill="currentColor" fillOpacity={0.2} />
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl transition-colors duration-300 ${
          isSelected ? 'bg-[#BB86FC] text-black' : 'bg-gray-900 text-gray-500 group-hover:text-gray-300'
        }`}>
          <Zap size={20} />
        </div>
        <div>
          <h4 className={`font-black text-lg transition-colors duration-300 ${
            isSelected ? 'text-[#BB86FC]' : 'text-white'
          }`}>
            {pkg.packageName}
          </h4>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
            ได้รับทันทีหลังชำระเงิน
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-end">
        <span className="text-gray-600 text-xs font-black uppercase  ">Price</span>
        <span className={`text-2xl font-black transition-colors duration-300 ${
          isSelected ? 'text-white' : 'text-[#BB86FC]'
        }`}>
          ฿{Number(pkg.price).toLocaleString()}
        </span>
      </div>
    </div>
  );
};