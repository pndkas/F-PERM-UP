import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import CatLogo from '../../assets/cat-logo.png';
import { useAdminStore } from '../../store/adminStore'; // มั่นใจว่า import store มาด้วย

const AdminLogin = () => {
  const { 
    register, 
    handleSubmit, 
    setError,
    formState: { errors } 
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 🚀 ยิงไปที่ Path ตาม Back-end (เช็ค /api ด้วยนะถ้ามี prefix)
      const response = await axios.post('http://localhost:9000/admin/login', data);
      
      const { token, admin, message } = response.data;

      // 💾 เก็บข้อมูลลง LocalStorage
      localStorage.setItem('adminToken', token);
      localStorage.setItem('role', admin.role); 
      localStorage.setItem('adminData', JSON.stringify(admin));
      
      // ✅ อัปเดต Store ทันที
      useAdminStore.setState({ admin: admin });

      toast.success(message || `ยินดีต้อนรับคุณ ${admin.name}`, { theme: "dark" });

      // 🏃 เปลี่ยนหน้า
      setTimeout(() => {
        window.location.href = '/admin/dashboard'; 
      }, 1000);

    } catch (error) {
      // 🛡️ ดึง Error Message จาก Back-end (createHttpError)
      const serverMessage = error.response?.data?.message;

      if (serverMessage === "อีเมลหรือรหัสผ่านไม่ถูกต้อง") {
        // แสดง error ที่ field โดยตรง
        setError("email", { type: "manual", message: serverMessage });
        setError("password", { type: "manual", message: serverMessage });
        toast.error(serverMessage, { theme: "dark" });
      } else {
        toast.error(serverMessage || 'เกิดข้อผิดพลาดในการเชื่อมต่อ', { theme: "dark" });
      }
      
      console.error("Login Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🔥 พื้นหลัง: ดำสนิทเพื่อให้สีม่วง #BB86FC ดูเรืองแสงที่สุด
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-md">
        
        {/* 🛡️ ส่วนโลโก้แมวเรืองแสง (Admin Version) */}
        <div className="flex flex-col items-center mb-10 group cursor-default">
          <div className="relative">
            <div className="w-24 h-24 bg-[#0A0A0A] rounded-full flex items-center justify-center mb-4 border-2 border-black 
                            transition-all duration-500 ease-out p-3
                            shadow-[0_0_20px_2px_rgba(187,134,252,0.1)]
                            group-hover:border-[#BB86FC] group-hover:shadow-[0_0_40px_10px_rgba(187,134,252,0.4)] group-hover:scale-110">
              <img 
                src={CatLogo} 
                alt="Cat Logo" 
                className="w-full h-full object-contain transition-transform duration-500 group-hover:rotate-[-8deg]" 
              />
            </div>
          </div>
          
          <div className="text-center space-y-1 mt-2">
            <h1 className="text-4xl font-black text-[#BB86FC] tracking-[0.15em] transition-all duration-300 drop-shadow-[0_0_8px_rgba(187,134,252,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(187,134,252,0.8)]">
              PERM-UP
            </h1>
            <div className="inline-block px-4 py-1 bg-red-500/10 rounded-full border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
               <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Admin System</span>
            </div>
          </div>
        </div>

        {/* 📋 ส่วนฟอร์ม Login */}
        <div className="bg-[#0A0A0A] p-8 rounded-[2.5rem] border border-gray-900 shadow-[0_0_60px_-10px_rgba(187,134,252,0.15)] relative overflow-hidden">
          {/* แถบแสงม่วงเรืองแสงด้านบน */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BB86FC]/60 to-transparent opacity-70"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* ช่อง Admin Email */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Admin Account</label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.email ? 'text-red-500' : 'text-[#BB86FC]/40'}`} />
                <input 
                  {...register("email", { required: "กรุณากรอกอีเมลแอดมิน" })} 
                  className={`w-full bg-[#121212] border p-4 pl-12 rounded-2xl text-white outline-none transition-all placeholder:text-gray-800
                    ${errors.email 
                      ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                      : 'border-[#BB86FC]/10 focus:border-[#BB86FC]/60 focus:ring-1 focus:ring-[#BB86FC]/60 focus:shadow-[0_0_15px_rgba(187,134,252,0.2)]'
                    }`}
                  placeholder="admin@permup.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] ml-2 font-bold italic animate-pulse">{errors.email.message}</p>}
            </div>

            {/* ช่อง Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Secure Password</label>
              <div className="relative group/input">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.password ? 'text-red-500' : 'text-[#BB86FC]/40'}`} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  {...register("password", { required: "กรุณากรอกรหัสผ่าน" })} 
                  className={`w-full bg-[#121212] border p-4 pl-12 pr-12 rounded-2xl text-white outline-none transition-all placeholder:text-gray-800
                    ${errors.password 
                      ? 'border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                      : 'border-[#BB86FC]/10 focus:border-[#BB86FC]/60 focus:ring-1 focus:ring-[#BB86FC]/60 focus:shadow-[0_0_15px_rgba(187,134,252,0.2)]'
                    }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BB86FC]/40 hover:text-[#BB86FC] transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[10px] ml-2 font-bold italic animate-pulse">{errors.password.message}</p>}
            </div>

            {/* ปุ่มเข้าสู่ระบบ (ม่วงตะโกนเรืองแสง) */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#BB86FC] text-[#121212] font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(187,134,252,0.3)] hover:bg-white hover:shadow-[0_0_30px_rgba(187,134,252,0.5)] transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-[#121212] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  LOGIN
                  <ShieldCheck className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* ปุ่มกลับหน้าหลัก */}
        <div className="mt-10 text-center">
            <button 
              onClick={() => window.location.href = '/'} 
              className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-white transition-all font-bold cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
              กลับสู่หน้าหลัก
            </button>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin