import {
  LayoutDashboard,
  Gamepad2,
  Package,
  Users,
  ShieldAlert,
  BadgeDollarSign,
} from "lucide-react";

export const getAdminMenuItems = (isSuper) => {
  // เมนูพื้นฐานสำหรับ Admin ทุกคน
  const menus = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "games", name: "จัดการเกม", icon: Gamepad2 },
    { id: "packages", name: "จัดการแพ็กเกจ", icon: Package },
    { id: "customers", name: "จัดการลูกค้า", icon: Users },
  ];

  // 💡 ถ้าเป็น Super Admin (ที่ส่งมาจาก Sidebar) ให้เพิ่มเมนูพิเศษ
  if (isSuper) {
    menus.push(
      {
        id: "admin-manage",
        name: "จัดการแอดมิน",
        icon: ShieldAlert,
        color: "#BB86FC", // เพิ่มสีให้รู้ว่าเมนูพิเศษ
      },
      {
        id: "finance",
        name: "รายรับ-รายจ่าย",
        icon: BadgeDollarSign,
      },
    );
  }

  return menus;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("th-TH").format(price) + " ฿";
};
