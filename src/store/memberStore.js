import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

const API_URL = "http://localhost:9000";

export const useMemberStore = create(
  persist(
    (set, get) => ({
      member: null,
      token: null,
      memberData: null,
      isLoading: false,

      loginMember: async (credentials) => {
        set({ isLoading: true });
        try {
          const res = await axios.post(`${API_URL}/login`, credentials);
          const { token, member } = res.data;
          set({
            token: token,
            member: member.name,
            memberData: member,
            isLoading: false,
          });
          return res.data;
        } catch (error) {
          set({ isLoading: false });
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "เกิดข้อผิดพลาดในการเชื่อมต่อระบบ";
          throw errorMessage;
        }
      },

      fetchProfile: async () => {
        const { token } = get();
        if (!token) return;
        set({ isLoading: true });
        try {
          const response = await axios.get(`${API_URL}/member/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const profileDetail = response.data.data || response.data;
          const displayName = profileDetail.name || profileDetail.username;
          set({
            memberData: profileDetail,
            member: displayName,
            isLoading: false,
          });
        } catch (error) {
          console.error("Fetch profile failed", error);
          if (error.response?.status === 401) {
            get().logout(); // จะเรียก logout ด้านล่างเพื่อล้างข้อมูล
          }
          set({ isLoading: false });
        }
      },

      updateProfile: async (updateData) => {
        const { token, fetchProfile } = get();
        set({ isLoading: true });
        try {
          await axios.patch(`${API_URL}/member/profile`, updateData, {
            headers: { Authorization: `Bearer ${token}` },
          });
          await fetchProfile();
          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          throw error.response?.data?.message || "อัปเดตข้อมูลไม่สำเร็จ";
        }
      },

      // ✅ แก้ไข Logout: ล้างแค่ State ใน Store นี้พอ
      logout: () => {
        set({
          member: null,
          token: null,
          memberData: null,
          isLoading: false,
        });
        // ไม่ใส่ window.location.href ในนี้แล้ว เพื่อให้ Hook กลางเป็นคนสั่ง
      },
    }),
    {
      name: "member-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        member: state.member,
        token: state.token,
        memberData: state.memberData,
      }),
    },
  ),
);
