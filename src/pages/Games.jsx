import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Loader2, CreditCard, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router'; // ✅ นำเข้า Link เพื่อใช้เปลี่ยนหน้า

const Games = () => {
  const [games, setGames] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:9000/games');
      setGames(response.data); 
    } catch (error) {
      console.error("ดึงข้อมูลเกมไม่สำเร็จ:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 font-sans">
      
      {/* --- Header --- */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6 mt-10">
        <div>
          <h1 className="text-4xl font-black text-[#BB86FC] tracking-tighter drop-shadow-[0_0_10px_rgba(187,134,252,0.5)]">
            GAME
          </h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-1">Select game to top-up</p>
        </div>
      </div>

      {/* --- Loading State --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Loader2 className="w-12 h-12 text-[#BB86FC] animate-spin" />
          <p className="text-[#BB86FC] font-black uppercase tracking-widest animate-pulse text-xs">Loading Games...</p>
        </div>
      ) : (
        /* --- Game Grid --- */
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {games
            // ✅ 1. กรองสถานะ ACTIVE ก่อน
            .filter(game => game.isActive === "ACTIVE")
            // ✅ 2. กรองชื่อเกมตามที่ค้นหาต่อ
            .filter(game => game.gameName?.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((game) => (
              <div 
                key={game.gameId} 
                className="group relative bg-[#0A0A0A] border border-gray-900 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#BB86FC]/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(187,134,252,0.3)]"
              >
                {/* Image Section */}
                <div className="aspect-[3/4] overflow-hidden relative bg-[#111]">
                  {/* ✅ แก้ไขปัญหา src="" ด้วยการเช็คเงื่อนไข */}
                  {game.imageUrl ? (
                    <img 
                      src={game.imageUrl} 
                      alt={game.gameName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-75 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-800">
                      <ImageIcon size={40} />
                    </div>
                  )}
                  
                  {game.isHot && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#BB86FC] to-[#9D50BB] text-[#121212] text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg z-10">
                      <TrendingUp className="w-3 h-3" /> HOT
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Info Section */}
                <div className="p-5">
                  <p className="text-[#BB86FC] text-[9px] font-black uppercase mb-1 opacity-70 tracking-widest">
                    {game.category}
                  </p>
                  <h3 className="text-base font-black text-white truncate mb-4">
                    {game.gameName}
                  </h3>
                  
                  {/* ✅ หุ้มปุ่มด้วย Link เพื่อให้กดไปหน้าเติมเงินของเกมนั้นๆ ได้จริง */}
                  <Link to={`/game/${game.gameId}`} className="block">
                    <button className="w-full bg-[#BB86FC] text-[#121212] py-3 rounded-xl text-[11px] font-black uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(187,134,252,0.2)] hover:bg-white hover:text-[#000] hover:shadow-[0_0_25px_rgba(187,134,252,0.5)] active:scale-95 cursor-pointer">
                      <CreditCard className="w-4 h-4" />
                      เติมเกม
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Games;