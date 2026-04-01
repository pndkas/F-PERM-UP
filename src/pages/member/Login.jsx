import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Lock, Mail, ArrowRight, Eye, EyeOff, Cat } from 'lucide-react';
import { useMemberStore } from '../../store/memberStore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginMember, isLoading } = useMemberStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData) => {
    try {
      const data = await loginMember(formData);
      toast.success(`ยินดีต้อนรับคุณ ${data.member.name}`, { theme: "dark" });
      navigate('/games');
    } catch (error) {
      toast.error(error, { theme: "dark" });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-md">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-10 group cursor-default">
          <div className="w-24 h-24 bg-[#0A0A0A] rounded-[2rem] flex items-center justify-center mb-4 border-2 border-gray-900
                          transition-all duration-500 ease-out
                          shadow-[0_0_20px_2px_rgba(187,134,252,0.1)]
                          group-hover:border-[#BB86FC] group-hover:shadow-[0_0_40px_10px_rgba(187,134,252,0.3)] group-hover:rotate-[10deg] group-hover:scale-110">
            <Cat 
              size={48} 
              className="text-[#BB86FC] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(187,134,252,0.8)]" 
            />
          </div>
          
          <div className="text-center space-y-1">
            <h1 className="text-4xl font-black text-[#BB86FC] tracking-widest transition-all duration-300 drop-shadow-[0_0_8px_rgba(187,134,252,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(187,134,252,0.8)]">
              PERM-UP
            </h1>
            <div className="inline-block px-3 py-1 bg-[#1A102D] rounded-full border border-[#BB86FC]/20">
                <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Member</span>
            </div>
          </div>
        </div>

        {/* 📋 Form Section */}
        <div className="bg-[#0A0A0A] p-8 rounded-[2.5rem] border border-gray-900 shadow-[0_0_60px_-10px_rgba(187,134,252,0.15)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BB86FC]/60 to-transparent opacity-70"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BB86FC]/40 transition-colors group-focus-within:text-[#BB86FC]" />
                <input 
                  type="email" 
                  {...register("email", { required: "กรุณากรอกอีเมล" })} // 🪄 register แทน value/onChange
                  className={`w-full bg-[#121212] border ${errors.email ? 'border-red-500/50' : 'border-[#BB86FC]/10'} p-4 pl-12 rounded-2xl text-white outline-none focus:border-[#BB86FC]/60 focus:ring-1 focus:ring-[#BB86FC]/60 focus:shadow-[0_0_15px_1px_rgba(187,134,252,0.2)] transition-all placeholder:text-gray-800`}
                  placeholder="อีเมลของคุณ"
                />
              </div>
              {errors.email && <p className="text-[10px] text-red-400 ml-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BB86FC]/40 group-focus-within/input:text-[#BB86FC] transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  {...register("password", { required: "กรุณากรอกรหัสผ่าน" })} // 🪄 register แทน value/onChange
                  className={`w-full bg-[#121212] border ${errors.password ? 'border-red-500/50' : 'border-[#BB86FC]/10'} p-4 pl-12 pr-12 rounded-2xl text-white outline-none focus:border-[#BB86FC]/60 focus:ring-1 focus:ring-[#BB86FC]/60 focus:shadow-[0_0_15px_1px_rgba(187,134,252,0.2)] transition-all placeholder:text-gray-800`}
                  placeholder="รหัสผ่าน"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BB86FC]/40 hover:text-[#BB86FC] transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-400 ml-1">{errors.password.message}</p>}

              <div className="flex items-center justify-between px-1 pt-1">
                <button 
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-[11px] font-medium text-gray-500 group/link"
                >
                  ยังไม่มีไอดี? <span className="text-[#BB86FC] font-bold group-hover/link:underline cursor-pointer transition-all">สมัครสมาชิก</span>
                </button>

                <button 
                  type="button"
                  onClick={() => toast.info('ระบบลืมรหัสผ่านยังไม่ได้ทำค้าบ', { theme: "dark" })}
                  className="text-[11px] font-medium text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#BB86FC] text-[#121212] font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(187,134,252,0.4)] hover:bg-white hover:shadow-[0_0_30px_rgba(187,134,252,0.6)] transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-[#121212] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  เข้าสู่ระบบ
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;