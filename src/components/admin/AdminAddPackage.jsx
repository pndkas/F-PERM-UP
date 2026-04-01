const onSubmit = async (data) => {
  try {
    // 1. เช็คชื่อ Token ให้ตรงกับที่เก็บในเครื่อง (ไฟล์ก่อนหน้าคุณใช้ 'token')
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');

    // 2. เตรียมข้อมูล (Payload) และแปลง Type ให้ตรงกับที่ Prisma/Service ต้องการ
    const payload = {
      packageName: data.packageName,
      gameId: Number(data.gameId), // ต้องส่งเป็น Number
      price: parseFloat(data.price), // ต้องส่งเป็น Float
      unitCost: data.unitCost ? parseFloat(data.unitCost) : 0,
      imageUrl: data.imageUrl || "", // ถ้ามีฟิลด์รูปภาพ
      isActive: data.isActive || "ACTIVE",
      notes: data.notes || ""
    };

    // 3. ยิง API (เช็ค Path ให้ตรงกับที่เราแก้ใน adminRoute)
    // ถ้าใน Route คือ adminRoute.post("/packages", ...) 
    // และ adminRoute ถูกเชื่อมที่ /admin ใน index.js Path จะเป็นดังนี้:
    await axios.post('http://localhost:9000/admin/packages', payload, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    toast.success("สร้างแพ็กเกจสำเร็จ! ✨");
    
    // ถ้ามีฟังก์ชัน reset ฟอร์ม หรือเปลี่ยนหน้า ให้ใส่ตรงนี้
    // reset(); 
    // navigate('/admin/packages');

  } catch (err) {
    console.error("Add Package Error:", err.response?.data);
    const errorMsg = err.response?.data?.message || "ระบบขัดข้อง";
    toast.error("สร้างไม่สำเร็จ: " + errorMsg);
  }
};