import React, { useEffect } from "react";
import { useAdminStore } from "../../store/adminStore";
import Sidebar from "../../components/admin/Sidebar"; 
import StatCard from "../../components/admin/StatCard";
import { Gamepad2, Users, LayoutDashboard, BadgeDollarSign } from "lucide-react";
import { formatPrice } from "../../utils/adminCommand";

const AdminDashboard = () => {
  const { admin, stats, fetchAllAdminData } = useAdminStore();

  useEffect(() => {
    // 💡 ทุกครั้งที่เข้าหน้านี้ ให้สั่งดึงข้อมูลใหม่เสมอ
    fetchAllAdminData();
  }, [fetchAllAdminData]);

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <Sidebar /> 
      
      <main className="flex-1 overflow-y-auto p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Dashboard</h1>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Games" 
              value={stats?.totalGames ?? 0} 
              icon={Gamepad2} 
              color="text-blue-400" 
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
      </main>
    </div>
  );
};

export default AdminDashboard;