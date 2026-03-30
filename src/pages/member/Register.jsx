import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router'; // เพิ่ม Link เผื่อปุ่มกลับ
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Lock, Mail, User, Eye, EyeOff, ChevronLeft, Zap } from 'lucide-react';
import CatLogo from '../../assets/cat-logo.png';

const Register = () => {
  const { 
    register, 
    handleSubmit, 
    setError, 
    formState: { errors } 
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false); // เผื่อปุ่มตาของ Confirm
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:9000/register', data);
      toast.success(response.data?.message || 'สมัครสำเร็จ!', { theme: "dark" });
      navigate('/login');
    } catch (error) {
      const serverData = error.response?.data;
      
      // ✅ 1. ดัก ZodError จาก Backend โชว์แดงใต้ช่อง Input
      if (serverData?.errors) {
        Object.keys(serverData.errors).forEach((field) => {
          setError(field, {
            type: "server",
            message: serverData.errors[field][0] 
          });
        });
        toast.error("ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบ", { theme: "dark" });
      } 
      // ✅ 2. ดัก Error ทั่วไป
      else if (serverData?.message) {
        toast.error(serverData.message, { theme: "dark" });
      } 
      else {
        toast.error('เซิร์ฟเวอร์ขัดข้อง', { theme: "dark" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md">
        
        {/* --- Logo Section --- */}
        <div className="flex flex-col items-center mb-10 group cursor-default">
          <div className="w-24 h-24 bg-[#0A0A0A] rounded-full flex items-center justify-center mb-4 border-2 border-black transition-all duration-500 ease-out p-3 shadow-[0_0_20px_2px_rgba(187,134,252,0.1)] group-hover:border-[#BB86FC] group-hover:shadow-[0_0_40px_10px_rgba(187,134,252,0.4)] group-hover:scale-110">
            <img 
              src={CatLogo} 
              alt="Cat Logo" 
              className="w-full h-full object-contain transition-transform duration-500 group-hover:rotate-[-8deg]" 
            />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-4xl font-black text-[#BB86FC] tracking-widest transition-all duration-300 drop-shadow-[0_0_8px_rgba(187,134,252,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(187,134,252,0.8)]">
              PERM-UP
            </h1>
            <div>
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">มาร่วมเป็นสมาชิกกับ PERM-UP</span>
            </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] p-8 rounded-[2.5rem] border border-gray-900 shadow-[0_0_60px_-10px_rgba(187,134,252,0.15)]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Name */}
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BB86FC]/40" />
                {/* 🗑️ เอา required ออก เหลือแค่ชื่อฟิลด์ */}
                <input 
                  {...register("name")} 
                  className={`w-full bg-[#121212] border ${errors.name ? 'border-red-500' : 'border-[#BB86FC]/10'} p-4 pl-12 rounded-2xl outline-none focus:border-[#BB86FC]/60 transition-all`}
                  placeholder="ชื่อ-นามสกุล"
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] ml-2 mt-1">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BB86FC]/40" />
                {/* 🗑️ เอา required ออก */}
                <input 
                  {...register("email")} 
                  className={`w-full bg-[#121212] border ${errors.email ? 'border-red-500' : 'border-[#BB86FC]/10'} p-4 pl-12 rounded-2xl outline-none focus:border-[#BB86FC]/60 transition-all`}
                  placeholder="อีเมลของคุณ"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] ml-2 mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BB86FC]/40" />
                {/* 🗑️ เอา required ออก */}
                <input 
                  type={showPassword ? 'text' : 'password'}
                  {...register("password")} 
                  className={`w-full bg-[#121212] border ${errors.password ? 'border-red-500' : 'border-[#BB86FC]/10'} p-4 pl-12 pr-12 rounded-2xl outline-none focus:border-[#BB86FC]/60 transition-all`}
                  placeholder="รหัสผ่าน"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BB86FC]/40 hover:text-[#BB86FC]">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-[10px] ml-2 mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase tracking-wider ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BB86FC]/40" />
                {/* 🗑️ เอา required และ validate ออกหมดเลย */}
                <input 
                  type={showconfirmPassword ? 'text' : 'password'}
                  {...register("confirmPassword")} 
                  className={`w-full bg-[#121212] border ${errors.confirmPassword ? 'border-red-500' : 'border-[#BB86FC]/10'} p-4 pl-12 pr-12 rounded-2xl outline-none focus:border-[#BB86FC]/60 transition-all`}
                  placeholder="ยืนยันรหัสผ่าน"
                />
                <button type="button" onClick={() => setShowconfirmPassword(!showconfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BB86FC]/40 hover:text-[#BB86FC]">
                  {showconfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-[10px] ml-2 mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#BB86FC] hover:bg-white text-[#121212] font-black py-4 rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(187,134,252,0.5)] flex justify-center items-center gap-2 mt-6"
            >
               {loading ? (
                  <div className="w-6 h-6 border-2 border-[#121212] border-t-transparent rounded-full animate-spin"></div>
               ) : (
                  <>
                    <Zap className="w-5 h-5 fill-current" /> สมัครสมาชิก
                  </>
               )}
            </button>
          </form>
          
          {/* Back to Login */}
          <div className="mt-8 text-center">
             <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#BB86FC] transition-colors font-bold">
               <ChevronLeft className="w-4 h-4" /> กลับไปหน้าเข้าสู่ระบบ
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;