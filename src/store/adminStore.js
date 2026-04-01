import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const API_URL = "http://localhost:9000";

export const useAdminStore = create(
  persist(
    (set, get) => ({
      // --- Initial State ---
      admin: null,
      stats: {
        totalGames: 0,
        totalMembers: 0,
        totalRevenue: 0,
        pendingOrders: 0,
      },
      games: [],
      orders: [],
      members: [],
      isLoading: false,

      // ---------------------------------------------------------
      // 🛡️ AUTH & DASHBOARD SECTION
      // ---------------------------------------------------------
      fetchAllAdminData: async () => {
        const token = localStorage.getItem("adminToken");
        if (!token) return;
        try {
          const res = await axios.get(`${API_URL}/admin/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ stats: res.data });
        } catch (error) {
          console.error("Fetch Stats Error", error);
        }
      },

      // ✅ ปรับปรุง Logout: ล้าง State ให้สะอาด และเปลี่ยนจาก replace เป็นการเคลียร์ State
      logout: () => {
        set({
          admin: null,
          stats: {
            totalGames: 0,
            totalMembers: 0,
            totalRevenue: 0,
            pendingOrders: 0,
          },
          games: [],
          orders: [],
          members: [],
        });

        // ล้าง Token เบื้องต้นในระดับ Store
        localStorage.removeItem("adminToken");
        localStorage.removeItem("role");

        // หมายเหตุ: การย้ายหน้าไปหน้า Home หรือ Login
        // จะถูกควบคุมโดย useAuthLogout (ผู้จัดการกลาง) เพื่อไม่ให้เกิด Logic ซ้ำซ้อน
      },

      // ---------------------------------------------------------
      // 🎮 GAMES MANAGEMENT SECTION
      // ---------------------------------------------------------
      fetchGames: async () => {
        set({ isLoading: true });
        try {
          const res = await axios.get(`${API_URL}/games`);
          set({ games: res.data, isLoading: false });
        } catch (error) {
          console.error("Fetch Games Error");
          set({ isLoading: false });
        }
      },

      addGame: async (gameData) => {
        const token = localStorage.getItem("adminToken");
        set({ isLoading: true });
        try {
          const res = await axios.post(`${API_URL}/admin/games`, gameData, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // หลังจากเพิ่มสำเร็จ ให้โหลดรายการใหม่มาเก็บใน State ทันที
          await get().fetchGames();

          set({ isLoading: false });
          return res.data;
        } catch (error) {
          set({ isLoading: false });
          // ดึง message ที่เราทำไว้ใน createHttpError มาโชว์
          throw error.response?.data?.message || "เพิ่มเกมไม่สำเร็จ";
        }
      },

      updateGame: async (id, data) => {
        set({ isLoading: true });
        try {
          const res = await axios.patch(`${API_URL}/admin/game/${id}`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          });
          // อัปเดตข้อมูลใน State ทันทีไม่ต้อง Refresh หน้า
          set((state) => ({
            games: state.games.map((g) =>
              g.gameId === id ? res.data.data : g,
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      deleteGame: async (id) => {
        set({ isLoading: true });
        try {
          await axios.delete(`${API_URL}/admin/game/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          });
          // กรองเอาตัวที่ลบออกออกจากรายการในหน้าจอ
          set((state) => ({
            games: state.games.filter((g) => g.gameId !== id),
            isLoading: false,
          }));
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // ---------------------------------------------------------
      // 📝 ORDERS MANAGEMENT SECTION
      // ---------------------------------------------------------
      fetchOrders: async () => {
        const token = localStorage.getItem("adminToken");
        set({ isLoading: true });
        try {
          const res = await axios.get(`${API_URL}/admin/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ orders: res.data, isLoading: false });
        } catch (error) {
          console.error("Fetch Orders Error");
          set({ isLoading: false });
        }
      },

      // ---------------------------------------------------------
      // 👥 MEMBER MANAGEMENT SECTION (แก้ไขรวมร่างที่นี่)
      // ---------------------------------------------------------
      fetchMembers: async () => {
        const token = localStorage.getItem("adminToken");
        set({ isLoading: true });
        try {
          const res = await axios.get(`${API_URL}/admin/members`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ members: res.data.data || res.data, isLoading: false });
        } catch (error) {
          console.error("Fetch Members Error");
          set({ isLoading: false });
        }
      },

      // ฟังก์ชัน Update ข้อมูลแบบ Full (ใช้ใน Modal)
      updateMember: async (memberId, updateData) => {
        const token = localStorage.getItem("adminToken");
        set({ isLoading: true });
        try {
          const res = await axios.patch(
            `${API_URL}/admin/member/${memberId}`,
            updateData,
            { headers: { Authorization: `Bearer ${token}` } },
          );

          await get().fetchMembers(); // โหลดข้อมูลใหม่มาอัปเดต List
          set({ isLoading: false });
          return res.data;
        } catch (error) {
          set({ isLoading: false });
          throw error.response?.data?.message || "แก้ไขข้อมูลล้มเหลว";
        }
      },
    }),
    {
      name: "admin-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ admin: state.admin }),
    },
  ),
);
