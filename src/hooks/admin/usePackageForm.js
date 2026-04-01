import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export const usePackageForm = (initialData, onRefresh, onClose) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      gameId: "",
      packageName: "",
      price: "",
      unitCost: "",
      isActive: "ACTIVE",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        // สำคัญ: ต้องมั่นใจว่า gameId เป็น string เพื่อให้ <select> ทำงานถูกต้อง
        gameId: initialData.gameId?.toString() || "",
      });
    } else {
      reset({
        gameId: "",
        packageName: "",
        price: "",
        unitCost: "",
        isActive: "ACTIVE",
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    // 🔍 แก้จุดนี้: เปลี่ยนจาก 'token' เป็น 'adminToken' ให้ตรงกับ Local Storage
    const token = localStorage.getItem("adminToken");

    if (!token) {
      toast.error("ไม่พบรหัสเข้าใช้งาน กรุณา Login ใหม่");
      return;
    }

    try {
      const payload = {
        packageName: data.packageName,
        gameId: Number(data.gameId),
        price: parseFloat(data.price),
        unitCost: data.unitCost ? parseFloat(data.unitCost) : 0,
        isActive: data.isActive || "ACTIVE",
      };

      // ตรวจสอบ URL: มั่นใจว่าใช้ http://localhost:9000/admin/packages
      const url = initialData
        ? `http://localhost:9000/admin/packages/${initialData.packageId}`
        : "http://localhost:9000/admin/packages";

      const method = initialData ? "patch" : "post";

      await axios({
        method,
        url,
        data: payload,
        headers: {
          // 🚀 ส่งกุญแจที่ถูกต้องไป
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(
        initialData ? "อัปเดตข้อมูลสำเร็จ" : "สร้างแพ็กเกจใหม่สำเร็จ",
      );
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Submit Error:", err.response?.data);
      // แสดงข้อความ Error จากหลังบ้าน (Middleware ที่เราแก้ไปเมื่อกี้)
      toast.error(err.response?.data?.message || "บันทึกข้อมูลล้มเหลว");
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};
