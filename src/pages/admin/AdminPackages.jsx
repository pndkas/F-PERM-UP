import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Layers, Plus, ChevronDown, Gamepad2 } from 'lucide-react';
import PackageTable from '../../components/admin/PackageTable';
import PackageModal from '../../components/admin/PackageModal';

const AdminPackages = () => {
  const [packages, setPackages] = useState([]);
  const [games, setGames] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);
  
  const [selectedGameId, setSelectedGameId] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const savedToken = localStorage.getItem('adminToken'); 
      if (!savedToken) {
        toast.warn("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
        return;
      }

      const [pkgRes, gameRes] = await Promise.all([
        axios.get(`http://localhost:9000/admin/packages`, { 
          headers: { Authorization: `Bearer ${savedToken}` } 
        }),
        axios.get('http://localhost:9000/games') 
      ]);

      setPackages(pkgRes.data || []);
      setGames(gameRes.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("ไม่สามารถโหลดข้อมูลได้");
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredPackages = useMemo(() => {
    if (!selectedGameId) return packages;
    return packages.filter(pkg => pkg.gameId === Number(selectedGameId));
  }, [packages, selectedGameId]);

  const openAddModal = () => { setSelectedPkg(null); setIsModalOpen(true); };
  const openEditModal = (pkg) => { setSelectedPkg(pkg); setIsModalOpen(true); };

  return (
    <div className="p-6 lg:p-10 text-white min-h-screen bg-[#050505]">
      {/* Header - คงเดิมตามดีไซน์คุณ */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black uppercase   flex items-center gap-3 tracking-tighter">
            <Layers className="text-[#BB86FC]" /> Package Management
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-bold">จัดการแพ็กเกจเติมเงินแยกตามหมวดหมู่เกม</p>
        </div>
        <button 
          onClick={openAddModal} 
          className="bg-[#BB86FC] text-black font-black px-6 py-3 rounded-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(187,134,252,0.3)]"
        >
          <Plus size={20} /> เพิ่มแพ็กเกจใหม่
        </button>
      </div>

      {/* 🎯 3. แถบ Filter แบบผสม (ปุ่ม "ทั้งหมด" + Dropdown รายเกม) */}
      <div className="flex items-center gap-3 mb-8">

        {/* Dropdown สำหรับเลือกเกมรายตัว */}
        <div className="relative min-w-[200px]">
          <Gamepad2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <select
            value={selectedGameId || ""}
            onChange={(e) => setSelectedGameId(e.target.value === "" ? null : e.target.value)}
            className={`w-full bg-[#0A0A0A] border text-xs font-black uppercase tracking-widest rounded-full py-3 pl-11 pr-10 appearance-none outline-none transition-all cursor-pointer ${
                selectedGameId !== null 
                ? 'border-[#BB86FC] text-[#BB86FC]' 
                : 'border-gray-800 text-gray-500 hover:border-gray-600'
            }`}
          >
            <option value="">-- เลือกเกมอื่น ๆ --</option>
            {games.map(game => (
              <option key={game.gameId} value={game.gameId} className="bg-black text-white">
                {game.gameName}
              </option>
            ))}
          </select>
          <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${selectedGameId !== null ? 'text-[#BB86FC]' : 'text-gray-500'}`} size={16} />
        </div>
      </div>

      {/* Table Section - คงเดิมตามดีไซน์คุณ */}
      <div className="bg-[#0A0A0A] border border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <PackageTable 
          packages={filteredPackages} 
          onEdit={openEditModal} 
          onRefresh={fetchData} 
        />
        
        {filteredPackages.length === 0 && (
          <div className="p-24 text-center">
            <div className="text-gray-800 mb-2 font-black   text-4xl uppercase opacity-10 tracking-tighter">No Packages</div>
            <p className="text-gray-600 font-bold text-xs uppercase tracking-[0.3em]">ไม่พบแพ็กเกจในหมวดหมู่นี้</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <PackageModal 
          onClose={() => setIsModalOpen(false)} 
          games={games} 
          initialData={selectedPkg} 
          onRefresh={fetchData} 
        />
      )}
    </div>
  );
};

export default AdminPackages;