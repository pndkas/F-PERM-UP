import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import CatLogo from '../../assets/cat-logo.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:9000/login', {
        email,
        password
      });

      // ✅ เก็บข้อมูลลงเครื่อง
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userName', response.data.user.name);

      toast.success(`ยินดีต้อนรับคุณ ${response.data.user.name}`, { theme: "dark" });
      navigate('/games'); // ไปหน้าเลือกเกมสำหรับ Member
    } catch (error) {
      toast.error(error.response?.data?.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง', { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🔥 พื้นหลัง: เปลี่ยนเป็นสีดำสนิท (#000000) เพื่อให้แสงม่วงตะโกนที่สุด
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-md">
        
        {/* 🐈 ส่วนโลโก้แมวเรืองแสง (Member Version) */}
        <div className="flex flex-col items-center mb-10 group cursor-default">
          {/* กรอบรูปแมว: เพิ่มความเรืองแสงสีม่วงแบบนุ่มนวลตลอดเวลา */}
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
          
          <div className="text-center space-y-1">
            {/* ชื่อ PERM-UP: เพิ่ม drop-shadow ให้สว่างขึ้นเล็กน้อย */}
            <h1 className="text-4xl font-black text-[#BB86FC] tracking-widest transition-all duration-300 drop-shadow-[0_0_8px_rgba(187,134,252,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(187,134,252,0.8)]">
              PERM-UP
            </h1>
            {/* ป้าย Member: ปรับสีม่วงให้ดูเข้มและสว่างขึ้น */}
            <div className="inline-block px-3 py-1 bg-[#1A102D] rounded-full border border-[#BB86FC]/20">
               <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Member</span>
            </div>
          </div>
        </div>

        {/* 📋 ส่วนฟอร์ม Login */}
        {/* สีฟอร์ม: เปลี่ยนเป็นสีดำเข้มเกือบสนิท (#0A0A0A) และเพิ่ม Box Shadow ขนาดใหญ่เพื่อสร้างบรรยากาศ "เรืองแสงม่วง" รอบๆ */}
        <div className="bg-[#0A0A0A] p-8 rounded-[2.5rem] border border-gray-900 shadow-[0_0_60px_-10px_rgba(187,134,252,0.15)] relative overflow-hidden">
          {/* แถบแสงด้านบน: ปรับระดับสีม่วงให้เรืองแสงขึ้น */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#BB86FC]/60 to-transparent opacity-70"></div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* ช่อง Email Address */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                {/* ไอคอนจดหมาย: เปลี่ยนเป็นสีม่วงนีออนแบบจางๆ */}
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BB86FC]/40 transition-colors group-focus-within:text-[#BB86FC]" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // สีช่อง Input: เปลี่ยนเป็นสีดำเข้มเกือบสนิท (#121212) เพื่อความคุมโทน
                  // สีขอบ: เปลี่ยนเป็นสีม่วงนีออนแบบจางมากๆ เพื่อให้ดูมีดีเทล
                  className="w-full bg-[#121212] border border-[#BB86FC]/10 p-4 pl-12 rounded-2xl text-white outline-none focus:border-[#BB86FC]/60 focus:ring-1 focus:ring-[#BB86FC]/60 focus:shadow-[0_0_15px_1px_rgba(187,134,252,0.2)] transition-all placeholder:text-gray-800"
                  placeholder="อีเมลของคุณ"
                  required
                />
              </div>
            </div>

            {/* ช่อง Password */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group/input">
                {/* ไอคอนแม่กุญแจ: เปลี่ยนเป็นสีม่วงนีออนแบบจางๆ */}
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BB86FC]/40 group-focus-within/input:text-[#BB86FC] transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // สีช่อง Input & ขอบ: เหมือนช่อง Email
                  className="w-full bg-[#121212] border border-[#BB86FC]/10 p-4 pl-12 pr-12 rounded-2xl text-white outline-none focus:border-[#BB86FC]/60 focus:ring-1 focus:ring-[#BB86FC]/60 focus:shadow-[0_0_15px_1px_rgba(187,134,252,0.2)] transition-all placeholder:text-gray-800"
                  placeholder="รหัสผ่าน"
                  required
                />
                {/* ปุ่มเปิด/ปิดตา: เปลี่ยนเป็นสีม่วงนีออนแบบจางๆ */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BB86FC]/40 hover:text-[#BB86FC] transition-colors focus:outline-none cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* 🔗 ลิงก์ สมัครสมาชิก และ ลืมรหัสผ่าน */}
              <div className="flex items-center justify-between px-1 pt-1">
                <button 
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-[11px] font-medium text-gray-500 group/link"
                >
                  ยังไม่มีไอดี? <span className="text-[#BB86FC] font-bold group-hover/link:underline cursor-pointer transition-all hover:drop-shadow-[0_0_5px_rgba(187,134,252,0.7)]">สมัครสมาชิก</span>
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

            {/* ปุ่มกดเข้าสู่ระบบ (ม่วงตะโกนเรืองแสง) */}
            <button 
              type="submit" 
              disabled={loading}
              // สีปุ่ม: ใช้สีม่วงนีออนสว่าง (#BB86FC)
              // Shadow: ใส่ Box Shadow ขนาดใหญ่เพื่อสร้าง "แสงเรืองรอบปุ่ม" ตลอดเวลา
              // Hover: เปลี่ยนเป็นสีขาวพร้อมแสงเรืองที่แรงขึ้น
              className="w-full bg-[#BB86FC] text-[#121212] font-black py-4 rounded-2xl shadow-[0_0_20px_rgba(187,134,252,0.4)] hover:bg-white hover:shadow-[0_0_30px_rgba(187,134,252,0.6)] transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
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