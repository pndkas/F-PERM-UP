import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:9000/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      toast.error("ดึงข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    // 🎯 ดักก่อนเลย: ถ้าไม่มี ID ไม่ต้องไปต่อ
    if (!orderId) {
      toast.error("ผิดพลาด: ไม่พบ ID ของออเดอร์");
      return;
    }

    const confirmText = newStatus === "SUCCESS" ? "อนุมัติ" : "ปฏิเสธ";
    if (!window.confirm(`ยืนยันการ ${confirmText} ออเดอร์นี้?`)) return;

    // 🎯 แปลงให้ตรงกับ Enum ใน Prisma Schema ของแม่ (ตัวใหญ่หมด)
    const finalStatus = newStatus === "SUCCESS" ? "COMPLETED" : "CANCELLED";

    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `http://localhost:9000/admin/orders/${orderId}`,
        { status: finalStatus }, // 🚀 ส่ง COMPLETED หรือ CANCELLED ไป
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("อัปเดตสถานะเรียบร้อย!");
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      console.error("Patch Error Details:", err.response?.data);
      // พ่น Error จริงจากหลังบ้านออกมาดูเลย
      toast.error(
        "อัปเดตไม่สำเร็จ: " +
          (err.response?.data?.message || "Internal Server Error"),
      );
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    selectedOrder,
    setSelectedOrder,
    handleUpdateStatus,
    refresh: fetchOrders,
  };
};
