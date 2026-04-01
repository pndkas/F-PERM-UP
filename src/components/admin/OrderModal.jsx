import React from 'react';
import { CheckCircle, XCircle, UserCheck } from 'lucide-react';

const OrderModal = ({ order, onClose, onUpdate }) => {
  // 🎯 ดักไว้ก่อน: ถ้าหา id ไม่เจอ ให้ใช้ฟิลด์อื่นแทน
  const orderId = order?.id || order?.orderId;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-[#111] border border-gray-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-black uppercase tracking-wider text-white">ตรวจสอบสลิป</h3>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <XCircle size={28} className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* รูปสลิป */}
          <div className="bg-black rounded-2xl overflow-hidden border border-gray-800 aspect-[3/4] flex items-center justify-center">
            <img 
              src={order.slipImageUrl} 
              alt="Slip" 
              className="w-full h-full object-contain cursor-zoom-in"
              onClick={() => window.open(order.slipImageUrl, '_blank')}
            />
          </div>

          {/* ข้อมูลและการจัดการ */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/5 shadow-inner">
                <p className="text-xs text-gray-400 uppercase font-bold mb-1">ยอดชำระที่แจ้งมา</p>
                <p className="text-3xl font-black text-[#BB86FC]">{order.amount?.toLocaleString()} ฿</p>
              </div>

              <div className="space-y-3 text-sm text-gray-300">
                <p className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">ลูกค้า:</span>
                  <span className="font-bold">{order.member?.name || 'N/A'}</span>
                </p>
                <p className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">UID เกม:</span>
                  <span className="font-bold text-[#BB86FC]">{order.uidGameMember}</span>
                </p>
                <p className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-500">ID ออเดอร์:</span>
                  <span className="font-mono text-xs text-gray-400">{orderId}</span>
                </p>
              </div>
            </div>

            {/* ส่วนจัดการสถานะ */}
            <div className="space-y-3">
              {/* 1. ปุ่ม Action (เฉพาะสถานะ PENDING) */}
              {order.status === 'PENDING' && (
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => onUpdate(orderId, 'SUCCESS')} 
                    className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 text-white"
                  >
                    <CheckCircle size={20} /> อนุมัติรายการ
                  </button>
                  <button 
                    onClick={() => onUpdate(orderId, 'FAILED')} 
                    className="w-full bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/20 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all"
                  >
                    <XCircle size={20} /> ปฏิเสธรายการ
                  </button>
                </div>
              )}

              {/* 2. แสดงข้อมูลผู้ดำเนินการ (เมื่อไม่ใช่ PENDING) */}
              {order.status !== 'PENDING' && (
                <div className="mt-4 p-4 bg-green-500/5 rounded-2xl border border-green-500/20 shadow-inner">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck size={16} className="text-green-500" />
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">ดำเนินการแล้วโดย</p>
                  </div>
                  <p className="text-lg text-green-400 font-bold px-1">
                    {order.admin?.name || 'ไม่ระบุชื่อแอดมิน'} 
                  </p>
                  <p className="text-[10px] text-gray-500 mt-2 px-1">
                    อนุมัติเมื่อ: {order.createdAt ? new Date(order.createdAt).toLocaleString('th-TH') : 'N/A'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;