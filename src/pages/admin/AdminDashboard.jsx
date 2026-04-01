import React, { useEffect } from "react";
import { useAdminStore } from "../../store/adminStore";
import StatCard from "../../components/admin/StatCard";
import { Gamepad2, Users, LayoutDashboard, BadgeDollarSign } from "lucide-react";
import { formatPrice } from "../../utils/adminCommand";

const AdminDashboard = () => {
  const { stats, fetchAllAdminData } = useAdminStore();

  useEffect(() => {
    // 💡 ดึงข้อมูลใหม่ทุกครั้งที่เข้าหน้า
    fetchAllAdminData();
  }, [fetchAllAdminData]);
  return (
    <div className="p-10"> {/* เหลือแค่ Container ของเนื้อหาพอ */}
      <header className="mb-10">
        <h1 className="text-4xl font-black uppercase   tracking-tighter text-white">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">ภาพรวมระบบและสถิติทั้งหมด</p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
        <StatCard 
          title="Total Games" 
          value={stats?.totalGames ?? 0} 
          icon={Gamepad2} 
          color="text-[#BB86FC]" // ปรับสีให้เข้ากับธีมม่วง
        />
        <StatCard 
          title="Members" 
          value={stats?.totalUsers ?? 0} 
          icon={Users} 
          color="text-orange-400" 
        />
        <StatCard 
          title="Pending Orders" 
          value={stats?.pendingOrders ?? 0} 
          icon={LayoutDashboard} 
          color="text-yellow-400" 
        />
        <StatCard 
          title="Total Revenue" 
          value={formatPrice(stats?.totalRevenue || 0)} 
          icon={BadgeDollarSign} 
          color="text-green-400" 
        />
      </section>

      {/* คุณสามารถเพิ่มส่วนแสดงผลอื่นๆ ต่อด้านล่างได้เลย เช่น ตารางคำสั่งซื้อล่าสุด */}
    </div>
  );
};

export default AdminDashboard;