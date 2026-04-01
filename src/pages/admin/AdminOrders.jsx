import React from 'react';
import { Eye } from 'lucide-react';
import { useAdminOrders } from '../../hooks/admin/useAdminOrders';
import OrderModal from '../../components/admin/OrderModal'; // 🎯 Import Modal ที่แยกไว้

const AdminOrders = () => {
  const { orders, loading, selectedOrder, setSelectedOrder, handleUpdateStatus } = useAdminOrders();

  if (loading) return <div className="p-8 text-white text-center font-bold animate-pulse">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="p-8 text-white min-h-screen bg-black">
      <h2 className="text-3xl font-black uppercase   mb-8 border-l-4 border-[#BB86FC] pl-4 tracking-tighter">
        รายการสั่งซื้อทั้งหมด
      </h2>
      
      <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0A0A0A] text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">
              <tr>
                <th className="px-6 py-5">Order ID</th>
                <th className="px-6 py-5">ลูกค้า / UID</th>
                <th className="px-6 py-5">ยอดชำระ</th>
                <th className="px-6 py-5 text-center">สถานะ</th>
                <th className="px-6 py-5 text-right">แอคชั่น</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {orders.map((order) => (
                <tr key={order.orderId} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 font-mono text-gray-500 text-xs">
                    #{order.id?.toString()?.slice(-6) || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                     <div className="font-bold group-hover:text-white transition-colors">{order.member?.name || 'Unknown'}</div>
                     <div className="text-[10px] text-gray-500  ">UID: {order.uidGameMember}</div>
                  </td>
                  <td className="px-6 py-4 text-[#BB86FC] font-black">
                    {order.amount?.toLocaleString()} ฿
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrder(order)} 
                      className="bg-white/5 hover:bg-[#BB86FC] hover:text-black p-2 px-4 rounded-xl transition-all duration-300 font-bold text-[11px] flex items-center gap-2 ml-auto shadow-sm"
                    >
                      <Eye size={14} /> ตรวจสอบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
  <OrderModal 
    order={selectedOrder} 
    onClose={() => setSelectedOrder(null)} 
    onUpdate={handleUpdateStatus}
  />
)}
    </div>
  );
};

// --- Component Badge แยกไว้ใช้เฉพาะในนี้ ---
const StatusBadge = ({ status }) => {
  const styles = {
    COMPLETED: 'bg-green-500/10 text-green-500 border-green-500/20', // เดิมคือ SUCCESS
    CANCELLED: 'bg-red-500/10 text-red-500 border-red-500/20',     // เดิมคือ FAILED
    PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    PROCESSING: 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default AdminOrders;