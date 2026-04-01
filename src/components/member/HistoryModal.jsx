import { X, CheckCircle, Clock, AlertCircle, Calendar, Hash, CreditCard } from 'lucide-react';

const HistoryModal = ({ order, onClose }) => {
  console.log("เช็กข้อมูลรูป:", order.slipImageUrl)
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[100] backdrop-blur-md">
      {/* ปรับความกว้างจาก max-w-md เป็น max-w-3xl */}
      <div className="bg-[#0A0A0A] border border-gray-800 rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-900 flex justify-between items-center bg-[#111]/50">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-[#BB86FC] rounded-full" />
            <h3 className="text-xl font-black   text-white uppercase tracking-tighter">Order Details</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body: แบ่ง 2 คอลัมน์ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          
          {/* คอลัมน์ซ้าย: รูปสลิป */}
          <div className="p-8 bg-black/40 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-900">
            <div className="relative group w-full">
              <div className="absolute -inset-1 bg-[#BB86FC]/20 blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#111] rounded-2xl overflow-hidden border border-gray-800 aspect-[3/4] shadow-2xl">
                <img 
                  src={order.slipImageUrl} 
                  alt="Payment Slip" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* คอลัมน์ขวา: ข้อมูลออเดอร์ */}
          <div className="p-8 space-y-8 flex flex-col justify-center">
            
            {/* สถานะหลัก */}
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Current Status</p>
              <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-2xl border font-black text-sm   ${
                order.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                order.status === 'CANCELLED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
              }`}>
                {order.status === 'COMPLETED' ? <CheckCircle size={16}/> : 
                 order.status === 'CANCELLED' ? <XCircle size={16}/> : <Clock size={16}/>}
                {order.status}
              </div>
            </div>

            {/* ข้อมูลรายการ */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 text-gray-500 mb-1">
                  <CreditCard size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Amount Paid</span>
                </div>
                <p className="text-3xl font-black text-white  ">
                  {Number(order.amount).toLocaleString()} <span className="text-[#BB86FC] text-xl">฿</span>
                </p>
              </div>

              <div className="space-y-4 px-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Hash size={14} />
                    <span className="text-xs font-medium">Order ID</span>
                  </div>
                  <span className="text-white font-mono font-bold">#{order.orderId}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={14} />
                    <span className="text-xs font-medium">Date & Time</span>
                  </div>
                  <span className="text-gray-300 text-xs font-bold">
                    {new Date(order.createdAt).toLocaleString('th-TH')}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="pt-6 border-t border-gray-900">
               <p className="text-[10px] text-gray-600 leading-relaxed uppercase font-bold tracking-tight">
                 * หากข้อมูลไม่ถูกต้องหรือยอดไม่เข้า กรุณาติดต่อแอดมินทาง Line Official พร้อมแจ้งเลข Order ID
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;