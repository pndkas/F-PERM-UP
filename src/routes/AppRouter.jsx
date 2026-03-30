import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Navbar from '../components/member/Navbar';
import { useAdminStore } from '../store/adminStore'; // 💡 ดึง Store มาใช้

// --- 🏠 User Pages ---
import Home from '../pages/member/Home';
import Games from '../pages/Games';
import Login from '../pages/member/Login';
import Register from '../pages/member/Register';
import History from '../pages/member/History';
import About from '../pages/About';

// --- 🛡️ Admin Pages ---
import LoginAdmin from '../pages/admin/LoginAdmin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from "../pages/admin/AdminUsers.jsx";

const AppRouter = () => {
  // 💡 เช็คสิทธิ์แบบฉลาดขึ้น
  const isUser = !!localStorage.getItem('userToken');
  
  // 💡 เช็ค Admin: มี Token และ Role ต้องมีคำว่า ADMIN (ไม่สนตัวเล็กตัวใหญ่)
  const savedRole = (localStorage.getItem('role') || "").toUpperCase();
  const isAdmin = !!localStorage.getItem('adminToken') && savedRole.includes('ADMIN');

  return (
    <BrowserRouter>
      {/* 🐈 ย้าย Logic การซ่อน Navbar มาไว้ข้างในเพื่อให้มัน Reactive */}
      <nav>
        <NavbarWrapper />
      </nav>

      <Routes>
        {/* 🌍 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 USER ROUTES */}
        <Route 
          path="/history" 
          element={isUser ? <History /> : <Navigate to="/login" replace />} 
        />

        {/* 🛡️ ADMIN ROUTES */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route 
          path="/admin/dashboard" 
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" replace />} 
        />
        <Route path="/admin/users" element={<AdminUsers />} />
<Route path="/admin/games" element={<AdminGames />} />
<Route path="/admin/orders" element={<AdminOrders />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// 💡 สร้าง Component ย่อยเพื่อเช็คการแสดง Navbar 
// (เพราะต้องอยู่ภายใต้ BrowserRouter ถึงจะใช้ Logic เช็ค Path ได้แม่นยำ)
const NavbarWrapper = () => {
  const path = window.location.pathname;
  const isHideNavbar = path.startsWith('/admin');

  if (isHideNavbar) return null;
  return (
    <>
      <Navbar />
      <div className="pt-28"></div> {/* ใส่ Padding ให้เนื้อหาไม่จมใต้ Navbar */}
    </>
  );
};

export default AppRouter;