import { useAdminStore } from "../store/adminStore";
import { useMemberStore } from "../store/memberStore";

export const useAuthLogout = () => {
  // 1. ดึงข้อมูลจาก Store
  const { logout: userLogout, token } = useMemberStore();
  const { logout: adminLogout } = useAdminStore();

  // 2. เช็คสถานะต่างๆ
  const role = localStorage.getItem("role");
  const adminToken = localStorage.getItem("adminToken");

  const isSuperAdmin = role === "SUPER_ADMIN";
  const isAdmin = role === "ADMIN" || isSuperAdmin;

  // 💡 ประกาศตัวแปรนี้ให้ชัดเจน (ตัวที่มันฟ้องว่าหาไม่เจอ)
  const isLoggedIn = !!token || !!adminToken;

  const displayName =
    useAdminStore.getState().admin?.name ||
    useMemberStore.getState().member ||
    "User";

  // 3. ฟังก์ชัน Logout
  const logout = () => {
    // ล้าง localStorage
    const items = [
      "role",
      "adminToken",
      "adminData",
      "member-storage",
      "admin-storage",
    ];
    items.forEach((item) => localStorage.removeItem(item));

    // ล้าง State ใน Store (เช็คว่าเป็น function ไหมก่อนเรียก)
    if (typeof userLogout === "function") userLogout();
    if (typeof adminLogout === "function") adminLogout();

    // ย้ายหน้า
    const isAdminPath = window.location.pathname.startsWith("/admin");
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  // 4. Return ออกไป (เช็คชื่อตัวแปรตรงนี้ให้ตรงกับข้างบน)
  return { isLoggedIn, isAdmin, isSuperAdmin, displayName, logout };
};
