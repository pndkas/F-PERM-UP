import React from 'react';
import { Outlet } from 'react-router'; // ดึงมาจากที่เดียวแล้วเนอะ คลีนๆ
import Navbar from '../components/Navbar'; // เช็ค path ดีๆ นะครับ

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans">
      {/* 1. Navbar: วางไว้บนสุด เพราะเราอยากให้มันโผล่ทุกหน้า */}
      <Navbar />

      {/* 2. พื้นที่เนื้อหาหลัก */}
      {/* เราใส่ pt-24 (Padding Top) เพื่อไม่ให้เนื้อหาโดน Navbar ทับครับ */}
      <main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* 🔥 พระเอกของเราอยู่ตรงนี้! */}
        {/* เมื่อคุณอยู่ที่ /games -> Outlet จะกลายเป็นหน้า <Games /> */}
        {/* เมื่อคุณอยู่ที่ /history -> Outlet จะกลายเป็นหน้า <History /> */}
        <Outlet /> 

      </main>

      {/* (แถม) ถ้าอยากมี Footer ที่โผล่ทุกหน้า ก็วางต่อท้าย Outlet ได้เลยครับ */}
      <footer className="mt-20 py-10 border-t border-gray-900 text-center text-gray-600 text-[10px] uppercase tracking-widest">
        &copy; 2026 PERM-UP SYSTEM • Powered by Meow Tech
      </footer>
    </div>
  );
};

export default MainLayout;