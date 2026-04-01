import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, Gamepad2, Image as ImageIcon } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore'; 
import { toast } from 'react-toastify';
import AddGameModal from '../../components/admin/AddGameModal';
import EditGameModal from '../../components/admin/EditGameModal'; // ✅ เพิ่ม Import

const AdminGames = () => {
  const { games, fetchGames, deleteGame, isLoading } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false); // ควบคุม Add Modal
  
  // ✅ เพิ่ม State สำหรับการแก้ไข
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetchGames(); 
  }, []);

  // ✅ ฟังก์ชันเปิด Modal แก้ไขและส่งข้อมูลเกมเข้าไป
  const handleEditClick = (game) => {
    setSelectedGame(game);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ที่จะลบเกม: ${name}?`)) {
      try {
        await deleteGame(id);
        toast.success("ลบเกมสำเร็จแล้ว");
        // fetchGames(); // ถ้าใน store ไม่ได้สั่ง filter ออก ให้เปิดบรรทัดนี้เพื่อรีโหลดข้อมูล
      } catch (err) {
        toast.error("ไม่สามารถลบเกมได้");
      }
    }
  };

  return (
    <div className="p-8 text-white relative">
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#BB86FC]/10 rounded-2xl">
            <Gamepad2 className="text-[#BB86FC]" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase   tracking-tighter">จัดการเกม</h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Manage Game</p>
          </div>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#BB86FC] text-[#121212] px-8 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-white hover:shadow-[0_0_20px_rgba(187,134,252,0.4)] transition-all active:scale-95"
        >
          <Plus size={20} strokeWidth={3} /> เพิ่มเกมใหม่
        </button>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-[#0A0A0A] border border-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111] text-gray-500 text-[10px] uppercase font-black tracking-[0.2em] border-b border-gray-900">
              <th className="px-8 py-6">ข้อมูลเกม</th>
              <th className="px-8 py-6">UID / ID</th>
              <th className="px-8 py-6">หมวดหมู่</th>
              <th className="px-8 py-6 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900">
            {games && games.map((game) => (
              <tr key={game.gameId || game.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-5 flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#111] rounded-2xl overflow-hidden border border-gray-800">
                    {game.imageUrl ? (
                      <img src={game.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-700">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-black text-white text-lg group-hover:text-[#BB86FC] transition-colors">
                      {game.gameName}
                    </div>
                    <div className="flex items-center gap-1 mt-1 font-bold uppercase tracking-tighter text-[10px]">
                        <span className="text-gray-600">Status:</span>
                        {/* ✅ แก้ไขสีตรงนี้: เขียวถ้า Active / แดงถ้า Inactive */}
                        <span className={`
                          ${(game.isActive === 'ACTIVE' || game.isActive === true) ? 'text-green-500' : 'text-red-500'}
                        `}>
                         {game.isActive === true || game.isActive === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 font-mono text-sm text-gray-400">{game.uidGame}</td>
                <td className="px-8 py-5">
                    <span className="text-[10px] font-black text-[#BB86FC] bg-[#BB86FC]/10 px-2.5 py-1 rounded-lg border border-[#BB86FC]/20 uppercase whitespace-nowrap">
                     {game.category || 'N/A'}
                    </span>
                </td>
                <td className="px-8 py-5 text-center">
                  <div className="flex justify-center gap-2">
                    {/* ✅ แก้ไขปุ่ม Edit ให้กดได้จริง */}
                    <button 
                      onClick={() => handleEditClick(game)}
                      className="p-3 text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all hover:scale-110"
                    >
                      <Edit size={20} />
                    </button>
                    <button 
                      onClick={() => handleDelete(game.gameId, game.gameName)} 
                      className="p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all hover:scale-110"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {!isLoading && (!games || games.length === 0) && (
          <div className="py-20 text-center text-gray-600 font-bold uppercase   tracking-widest">
            ไม่มีข้อมูลเกมในระบบ
          </div>
        )}
      </div>

      {/* ✅ Modal สำหรับเพิ่มเกม (ของเดิม) */}
      <AddGameModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          fetchGames(); // รีโหลดข้อมูลหลังเพิ่มเสร็จ
        }} 
      />

      {/* ✅ Modal สำหรับแก้ไขเกม (ที่เพิ่มใหม่) */}
      <EditGameModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedGame(null);
          fetchGames();
        }} 
        gameData={selectedGame}
      />
    </div>
  );
};

export default AdminGames;