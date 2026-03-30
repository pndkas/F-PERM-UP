import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, TrendingUp, Loader2 } from 'lucide-react';

const Games = () => {
  const [games, setGames] = useState([]); // เก็บข้อมูลเกมจาก API
  const [loading, setLoading] = useState(true); // สถานะรอโหลด
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

  // 🔄 ให้ทำงานทันทีที่เปิดหน้าเว็บ
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 font-sans">
      
      {/* --- Header & Search --- */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6 mt-10">
        <div>
          <h1 className="text-4xl font-black text-[#BB86FC] tracking-tighter drop-shadow-[0_0_10px_rgba(187,134,252,0.5)]">
            GAME
          </h1>
          <p className="text-gray-500 text-sm">เลือกเกมที่ต้องการเติมเงิน</p>
        </div>

        {/* <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BB86FC]/40" />
          <input 
            type="text"
            placeholder="ค้นหาเกม..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#BB86FC]/10 p-4 pl-12 rounded-2xl outline-none focus:border-[#BB86FC]/60 transition-all"
          />
        </div> */}
      </div>

      {/* --- แสดงผลตอนกำลังโหลด --- */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Loader2 className="w-12 h-12 text-[#BB86FC] animate-spin" />
          <p className="text-[#BB86FC] font-medium animate-pulse">กำลังโหลดรายชื่อเกม...</p>
        </div>
      ) : (
        /* --- Game Grid --- */
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {games
            .filter(game => game.gameName?.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((game) => (
              <div 
                key={game.gameId} // ใช้ _id ถ้ามาจาก MongoDB
                className="group cursor-pointer relative bg-[#0A0A0A] border border-gray-900 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#BB86FC]/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(187,134,252,0.3)]"
              >
                {/* รูปภาพเกม */}
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={game.imageUrl} 
                    alt={game.gameName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  {game.isHot && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-[#BB86FC] to-[#9D50BB] text-[#121212] text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                      <TrendingUp className="w-3 h-3" /> HOT
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90"></div>
                </div>

                {/* ข้อมูลเกม */}
                <div className="p-5">
                  <p className="text-[#BB86FC] text-[10px] font-bold uppercase mb-1 opacity-70">
                    {game.category}
                  </p>
                  <h3 className="text-lg font-bold group-hover:text-[#BB86FC] transition-colors truncate">
                    {game.name}
                  </h3>
                  
                  {/* ปุ่มเติมเงิน (Hover) */}
                  <div className="mt-4 overflow-hidden h-0 group-hover:h-10 transition-all duration-300">
                    <button className="w-full h-full bg-[#BB86FC] text-[#121212] text-xs font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(187,134,252,0.4)] cursor-pointer">
                      เติมเงินเลย
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Games;