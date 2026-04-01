import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router';
import { useMemberStore } from '../store/memberStore';

// --- Import Pages ---
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/admin/Sidebar.jsx';
import MemberSidebar from '../components/member/MemberSidebar.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/member/Login.jsx';
import Register from '../pages/member/Register.jsx';
import Profile from '../pages/member/Profile.jsx';
import HistoryPage from '../pages/member/HistoryPage.jsx';

// --- Admin Pages ---
import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import AdminLogin from '../pages/admin/LoginAdmin.jsx';
import AdminMembers from '../pages/admin/AdminMembers.jsx';
import AdminGames from '../pages/admin/AdminGames.jsx';
import AdminOrders from '../pages/admin/AdminOrders.jsx';
import Games from '../pages/Games.jsx';
import About from '../pages/About.jsx';
import GameDetails from '../pages/member/GameDetails.jsx';
import AdminPackages from '../pages/admin/AdminPackages.jsx';

const AppRouter = () => {
  const token = useMemberStore((state) => state.token);
  const isAdmin = !!localStorage.getItem('adminToken'); 
  const isMember = !!token; 

  return (
    <BrowserRouter>
      <Routes>
        {/* 🌍 1. Public Zone (พร้อม Navbar) */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
          
          {/* ✅ เพิ่ม Route สำหรับหน้าเติมเกม (ID ของเกมนั้นๆ) */}
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/login" element={!isMember ? <Login /> : <Navigate to="/member/profile" />} />
          <Route path="/register" element={!isMember ? <Register /> : <Navigate to="/member/profile" />} /> 
        </Route>

        {/* 🛡️ 2. Admin Login */}
        <Route path="/admin/login" element={!isAdmin ? <AdminLogin /> : <Navigate to="/admin/dashboard" />} />

        {/* 👤 3. Member Zone (ต้องมี Member Token) */}
        <Route path="/member" element={isMember ? <MemberLayout /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="game/:id" element={<GameDetails />} />
        </Route>

        {/* 🛡️ 4. Admin Zone (ต้องมี Admin Token) */}
        <Route path="/admin" element={isAdmin ? <AdminLayout /> : <Navigate to="/admin/login" />}>
  <Route index element={<Navigate to="dashboard" replace />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="members" element={<AdminMembers />} />

  {/* ส่วนจัดการเกมและแพ็กเกจ */}
  <Route path="games" element={<AdminGames />} />
  <Route path="packages" element={<AdminPackages />} />
  <Route path="orders" element={<AdminOrders />} />
</Route>

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

// ---------------------------------------------------------
// 🖼️ LAYOUT COMPONENTS
// ---------------------------------------------------------

const UserLayout = () => (
  <>
    <Navbar />
    <div className="pt-28"><Outlet /></div> 
  </>
);

const MemberLayout = () => (
  <div className="min-h-screen bg-black">
    <Navbar />
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6 pt-32 pb-10">
      <aside className="w-full md:w-64 shrink-0">
        <MemberSidebar />
      </aside>
      <main className="flex-1">
        <Outlet /> 
      </main>
    </div>
  </div>
);

const AdminLayout = () => (
  <div className="flex h-screen bg-black overflow-hidden">
    <Sidebar />
    <main className="flex-1 overflow-y-auto p-6">
      <Outlet />
    </main>
  </div>
);

export default AppRouter;