import React from 'react';

const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-gray-800 hover:border-[#BB86FC]/50 transition-all group">
      <div className="flex justify-between items-center"> {/* ✅ เปลี่ยนเป็น items-center เพื่อให้เลขกับไอคอนตรงกัน */}
        
        <div className="flex flex-col gap-1"> {/* ✅ ใช้ gap ช่วยจัดการระยะห่างแทน mt-2 */}
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-none">
            {title}
          </p>
          <h3 className="text-3xl font-black text-white tracking-tight leading-none">
            {value}
          </h3>
        </div>

        <div className={`flex items-center justify-center p-3.5 rounded-2xl bg-gray-900 border border-gray-800 shrink-0 ${color}`}>
          {/* ✅ shrink-0 ป้องกันไอคอนโดนบีบ และปรับไอคอนให้เป๊ะ */}
          {Icon ? (
            <Icon size={24} strokeWidth={2.5} /> 
          ) : (
            <div className="w-6 h-6 bg-gray-700 rounded-lg" />
          )}
        </div>

      </div>
    </div>
  );
};

export default StatCard;