import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useMemberStore } from "../store/memberStore";

export const useGameCheckout = (gameId, navigate) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const token = useMemberStore((state) => state.token);

  const formMethods = useForm({
    defaultValues: { customerUid: "", selectedPackage: null, slip: null },
  });

  const { setValue, clearErrors } = formMethods;

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("ไฟล์ใหญ่เกิน 5MB");
        return;
      }
      setValue("slip", file, { shouldValidate: true });
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(file));
      clearErrors("slip");
    }
  };

  const handleCheckout = async (data) => {
    if (!token) {
      toast.warn("กรุณาเข้าสู่ระบบก่อนทำรายการ");
      navigate("/login");
      return;
    }

    // 🎯 เช็คว่าเลือกแพ็กเกจหรือยังก่อนเริ่ม loading
    if (!data.selectedPackage) {
      toast.error("กรุณาเลือกแพ็กเกจ");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      // ✅ เพิ่มข้อมูล Text
      formData.append("packageId", data.selectedPackage.packageId);
      formData.append("customerUid", data.customerUid);
      formData.append("amount", data.selectedPackage.price);

      // 🎯 แก้ไขจุดนี้: ตรวจสอบและ append ไฟล์แค่ "ครั้งเดียว"
      if (data.slip && data.slip instanceof File) {
        formData.append("slip", data.slip);
      } else {
        toast.error("กรุณาแนบสลิปการโอนเงิน");
        setLoading(false);
        return;
      }
      console.log("Check File before send:", data.slip);
      await axios.post("http://localhost:9000/member/checkout", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("ส่งข้อมูลสำเร็จ! รอการตรวจสอบจากแอดมิน");
      navigate("/member/history");
    } catch (err) {
      console.error("Checkout Error:", err);
      if (err.response?.status === 401) {
        toast.error("เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบใหม่");
      } else {
        toast.error(
          err.response?.data?.message || "เกิดข้อผิดพลาดในการส่งข้อมูล",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { ...formMethods, loading, preview, onFileChange, handleCheckout };
};
