import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router'; 
import { useMemberStore } from '../../store/memberStore';
import { History, Loader2, ShoppingBag, Clock, ArrowRight, Eye, ChevronRight } from 'lucide-react';
import HistoryModal from '../../components/member/HistoryModal';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { token } = useMemberStore();
  const navigate = useNavigate();

  const fetchHistory = useCallback(async () => {
    const currentToken = token || JSON.parse(localStorage.getItem('member-storage'))?.state?.token;
    if (!currentToken) return;

    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:9000/member/history', {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      console.log("ข้อมูลที่ได้จากหลังบ้าน:", response.data[0]);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // ฟังก์ชันช่วยจัดการสีสถานะ
  const getStatusStyle = (status) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'CANCELLED': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-10 min-h-screen pt-24 text-white">
      
      {/* 🔝 Header Section: จัดระเบียบใหม่ให้ดูแพง */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#BB86FC]/10 rounded-2xl border border-[#BB86FC]/20">
              <History className="text-[#BB86FC]" size={28} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase  ">
              Transaction <span className="text-[#BB86FC]">History</span>
            </h1>
          </div>
          <p className="text-gray-400 text-sm font-medium pl-1">
            รายการคำสั่งซื้อทั้งหมดของคุณในระบบ PERM-UP
          </p>
        </div>

        <div className="bg-[#111] border border-gray-800 p-1 rounded-[1.8rem] flex items-center shadow-2xl">
          <div className="px-6 py-3 flex items-center gap-4">
            <div className="bg-white/5 p-2 rounded-xl">
              <ShoppingBag size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Orders</p>
              <p className="font-black text-xl">{history.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 Content Area */}
      <div className="relative">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-[400px] gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#BB86FC]" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Syncing Data...</p>
          </div>
        ) : history.length > 0 ? (
          <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-5 duration-500">
            {history.map((order) => (
              <div 
                key={order.orderId} 
                className="group relative bg-[#0A0A0A] border border-gray-800 rounded-[2rem] p-5 md:p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-[#BB86FC]/40 hover:bg-[#111] transition-all duration-300"
              >
                {/* แถบสีสถานะด้านข้าง */}
                <div className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full ${
                  order.status === 'COMPLETED' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />

                <div className="flex items-center gap-5 w-full md:w-auto">
                  {/* Icon ประจำออเดอร์ */}
                  <div className="hidden sm:flex w-16 h-16 bg-white/5 rounded-2xl items-center justify-center border border-white/5 group-hover:border-[#BB86FC]/20 transition-colors">
                    <span className="text-2xl font-black text-gray-700 group-hover:text-[#BB86FC]/40 transition-colors">
                      {order.package?.packageName?.charAt(0) || 'P'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[#BB86FC] font-black   tracking-tighter">#{order.orderId}</span>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-100 group-hover:text-white transition-colors uppercase">
                      {order.packageName || 'ไม่ระบุชื่อแพ็กเกจ'}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <Clock size={12} />
                      {new Date(order.createdAt).toLocaleString('th-TH')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto md:gap-10 border-t md:border-t-0 border-gray-800 pt-4 md:pt-0">
                  <div className="text-left md:text-right px-2">
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">ยอดชำระสุทธิ</p>
                    <p className="text-2xl font-black text-white  ">
                      {Number(order.amount).toLocaleString()}<span className="text-[#BB86FC] ml-1">฿</span>
                    </p>
                  </div>

                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-[#BB86FC] text-[#BB86FC] hover:text-black font-black rounded-2xl border border-white/10 hover:border-[#BB86FC] transition-all duration-300 shadow-lg"
                  >
                    <Eye size={18} />
                    <span className="uppercase text-xs tracking-tighter  ">ดูรายละเอียด</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-[500px] text-center bg-[#0A0A0A] rounded-[3rem] border border-gray-900">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-[#BB86FC]/20 blur-3xl rounded-full" />
              <div className="relative bg-[#111] p-10 rounded-full border border-gray-800">
                <Clock size={64} className="text-gray-800" />
              </div>
            </div>
            <h3 className="text-3xl font-black   uppercase tracking-tighter">Empty Records</h3>
            <p className="text-gray-500 mt-2 max-w-xs text-sm font-medium">
              คุณยังไม่มีรายการสั่งซื้อในขณะนี้ เริ่มต้นการสั่งซื้อครั้งแรกของคุณได้เลย!
            </p>
            <button 
              onClick={() => navigate('/')} 
              className="mt-10 group flex items-center gap-3 px-10 py-4 bg-[#BB86FC] text-black font-black rounded-[1.5rem] hover:bg-white transition-all duration-500 hover:shadow-[0_0_30px_rgba(187,134,252,0.3)]"
            >
              BROWSE GAMES <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* 🎯 Modal สลิป */}
      {selectedOrder && (
        <HistoryModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default HistoryPage;