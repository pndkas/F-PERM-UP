import { create } from "zustand";
import axios from "axios";

export const useUserStore = create((set) => ({
  // 💡 ดึงค่าเริ่มต้นจากเครื่อง (ถ้ามี) เพื่อให้ Navbar แสดงชื่อได้ทันทีไม่ต้องรอ API
  user: localStorage.getItem("userName") || null,
  token: localStorage.getItem("userToken") || null,
  userData: null,
  isLoading: false,

  // ฟังก์ชันดึงโปรไฟล์ (คงเดิมไว้และเพิ่มการเก็บชื่อลง Store/LocalStorage)
  fetchProfile: async () => {
    const token = localStorage.getItem("userToken");
    if (!token) return;

    set({ isLoading: true });
    try {
      const response = await axios.get(
        "http://localhost:9000/api/auth/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // เก็บข้อมูลทั้งก้อนใน userData และดึงชื่อมาแสดงใน Navbar
      const name = response.data.name || response.data.username;
      localStorage.setItem("userName", name);

      set({
        userData: response.data,
        user: name,
        isLoading: false,
      });
    } catch (error) {
      console.error("Fetch profile failed", error);
      set({ isLoading: false });
    }
  },

  // ฟังก์ชันสำหรับเซ็ตค่าตอน Login สำเร็จ (ใช้เรียกจากหน้า Login)
  setLoginSuccess: (name, token) => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userToken", token);
    set({ user: name, token: token });
  },

  updateUserData: (newData) =>
    set((state) => ({
      userData: { ...state.userData, ...newData },
    })),

  // 💡 แก้ไข Logout: ลบเฉพาะของ Member เท่านั้น!
  logout: () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    // ถ้ามีข้อมูลอื่นๆ ของ Member เช่น 'cart' ให้ removeItem เพิ่มตรงนี้

    set({ user: null, token: null, userData: null });
    window.location.href = "/login";
  },
}));
