import { create } from "zustand";
import axios from "axios";

export const useAdminStore = create((set, get) => ({
  // 💡 ดึงข้อมูลเริ่มต้นจาก LocalStorage (กันจอขาวเวลา Refresh)
  admin: JSON.parse(localStorage.getItem("adminData")) || null,
  stats: { totalGames: 0, totalUsers: 0, totalRevenue: 0, pendingOrders: 0 },

  // 📦 State สำหรับเก็บข้อมูลหน้าต่างๆ
  games: [],
  orders: [],
  users: [],
  isLoading: false,

  // ---------------------------------------------------------
  // 🛡️ AUTH & DASHBOARD SECTION
  // ---------------------------------------------------------

  // ฟังก์ชันดึงสถิติหน้า Dashboard
  fetchAllAdminData: async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    try {
      const statsRes = await axios.get("http://localhost:9000/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ stats: statsRes.data });
    } catch (error) {
      console.error("Fetch Stats Error", error);
    }
  },

  // Logout แบบปลอดภัย (ลบเฉพาะ Admin ไม่ยุ่งกับ User)
  handleLogout: () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    localStorage.removeItem("role");
    set({ admin: null, stats: null, games: [], orders: [], users: [] });
    window.location.replace("/admin/login");
  },

  // ---------------------------------------------------------
  // 🎮 GAMES MANAGEMENT SECTION
  // ---------------------------------------------------------

  fetchGames: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get("http://localhost:9000/games");
      set({ games: res.data, isLoading: false });
    } catch (error) {
      console.error("Fetch Games Error");
      set({ isLoading: false });
    }
  },

  deleteGame: async (id) => {
    const token = localStorage.getItem("adminToken");
    try {
      await axios.delete(`http://localhost:9000/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // เมื่อลบสำเร็จ ให้โหลดข้อมูลใหม่
      get().fetchGames();
    } catch (error) {
      console.error("Delete Game Error");
    }
  },

  // ---------------------------------------------------------
  // 📝 ORDERS MANAGEMENT SECTION
  // ---------------------------------------------------------

  fetchOrders: async () => {
    const token = localStorage.getItem("adminToken");
    set({ isLoading: true });
    try {
      const res = await axios.get("http://localhost:9000/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ orders: res.data, isLoading: false });
    } catch (error) {
      console.error("Fetch Orders Error");
      set({ isLoading: false });
    }
  },

  // ---------------------------------------------------------
  // 👥 MEMBER MANAGEMENT SECTION
  // ---------------------------------------------------------

  fetchUsers: async () => {
    const token = localStorage.getItem("adminToken");
    set({ isLoading: true });
    try {
      const res = await axios.get("http://localhost:9000/admin/members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ users: res.data, isLoading: false });
    } catch (error) {
      console.error("Fetch Users Error");
      set({ isLoading: false });
    }
  },
}));

// ---------------------------------------------------------
// 👥 APPROVE MEMBER MANAGEMENT SECTION
// ---------------------------------------------------------

approveMember: async (memberId) => {
  const token = localStorage.getItem("adminToken");
  try {
    const res = await axios.patch(
      `http://localhost:9000/admin/approve/${memberId}`,
      { status: "ACTIVE" }, // ส่ง Body ไปบอกว่าให้เป็น ACTIVE
      { headers: { Authorization: `Bearer ${token}` } },
    );
    // เมื่อสำเร็จ ให้ไปดึงรายชื่อใหม่มาอัปเดตหน้าจอ
    get().fetchUsers();
    return res.data;
  } catch (error) {
    throw error.response?.data?.message || "Approve ล้มเหลว";
  }
};
