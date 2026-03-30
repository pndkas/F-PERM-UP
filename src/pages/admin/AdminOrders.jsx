import React from 'react';
import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react';

const AdminOrders = () => {
  // Mock Data (รอเชื่อม API ของคุณ)
  const orders = [
    { id: "ORD-001", user: "Somchai", item: "Valorant 1000 VP", price: 300, status: "pending" },
    { id: "ORD-002", user: "Mana", item: "Steam Wallet 50$", price: 1650, status: "success" },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-black uppercase italic mb-8">รายการสั่งซื้อ</h2>
      
      <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#0A0A0A] text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">ลูกค้า</th>
              <th className="px-6 py-4">รายการ</th>
              <th className="px-6 py-4">ยอดชำระ</th>
              <th className="px-6 py-4">สถานะ</th>
              <th className="px-6 py-4 text-right">แอคชั่น</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-mono text-gray-500">{order.id}</td>
                <td className="px-6 py-4 font-bold">{order.user}</td>
                <td className="px-6 py-4">{order.item}</td>
                <td className="px-6 py-4 font-bold text-[#BB86FC]">{order.price} ฿</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    order.status === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[#BB86FC] hover:underline font-bold">ตรวจสอบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;