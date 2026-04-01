import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Loader2, CreditCard } from 'lucide-react';
// Swiper Components & Styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ ดึงข้อมูลจาก Backend เหมือนหน้า Games
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
    <div className="bg-[#000000] min-h-screen text-white font-sans">
      
      {/* 🚀 1. Hero Slider Section (Promotion) */}
      <section className="pt-28 pb-10 px-4 md:px-10 max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(187,134,252,0.1)] border border-white/5"
        >
          {[1, 2, 3].map((item) => (
            <SwiperSlide key={item}>
              <div className="h-[300px] md:h-[450px] bg-gradient-to-br from-[#121212] via-[#0A0A0A] to-[#121212] flex items-center justify-center border-2 border-dashed border-white/10 rounded-[2.5rem]">
                <div className="text-center p-10">
                  <div className="w-20 h-1 bg-[#BB86FC] mx-auto mb-6 rounded-full shadow-[0_0_15px_rgba(187,134,252,0.8)]"></div>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-4   tracking-tighter">
                    PROMOTION <span className="text-[#BB86FC]">{item}</span>
                  </h2>
                  <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-sm">Coming Soon Banner</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 🎮 2. Game Grid Section */}
      <section className="py-10 px-6 md:px-10 max-w-7xl mx-auto">
        
        {/* Header ส่วนของรายการเกม */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h3 className="text-3xl font-black   uppercase tracking-tighter flex items-center gap-3">
              <TrendingUp className="text-[#BB86FC] w-8 h-8" />
              รายการเกมยอดนิยม
            </h3>
            <div className="w-24 h-1.5 bg-[#BB86FC] mt-2 rounded-full shadow-[0_0_15px_rgba(187,134,252,0.5)]"></div>
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Top-up your favorite games</p>
        </div>

        {/* --- Loading State --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="w-12 h-12 text-[#BB86FC] animate-spin" />
            <p className="text-[#BB86FC] font-black uppercase tracking-widest animate-pulse text-xs">
              Fetching Data...
            </p>
          </div>
        ) : (
          /* --- Game Grid Layout --- */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {games
              // ✅ เพิ่มจุดนี้จุดเดียว: กรองเอาเฉพาะเกมที่สถานะเป็น "ACTIVE"
              .filter(game => game.isActive === "ACTIVE")
              .map((game) => (
              <div 
                key={game.gameId} 
                className="group relative bg-[#0A0A0A] border border-gray-900 rounded-[2.2rem] overflow-hidden transition-all duration-500 hover:border-[#BB86FC]/50 hover:-translate-y-3 hover:shadow-[0_25px_50px_-12px_rgba(187,134,252,0.4)]"
              >
                {/* Image Section */}
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={game.imageUrl} 
                    alt={game.gameName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Badge 'HOT' ถ้ามี */}
                  {game.isHot && (
                    <div className="absolute top-5 right-5 bg-gradient-to-r from-[#BB86FC] to-[#9D50BB] text-[#121212] text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-[0_5px_15px_rgba(187,134,252,0.4)] z-10">
                      <TrendingUp className="w-3.5 h-3.5" /> HOT
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-90"></div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <p className="text-[#BB86FC] text-[10px] font-black uppercase mb-1.5 opacity-80 tracking-[0.2em]">
                    {game.category || 'Game'}
                  </p>
                  <h3 className="text-lg font-black text-white truncate mb-5 tracking-tight">
                    {game.gameName}
                  </h3>
                  
                  {/* ปุ่มเติมเงิน */}
                  <button className="w-full bg-[#BB86FC] text-[#121212] py-3.5 rounded-[1.2rem] text-[11px] font-extrabold uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(187,134,252,0.15)] hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(187,134,252,0.4)] active:scale-95 cursor-pointer">
                    <CreditCard className="w-4 h-4" />
                    เติมเกม
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🔮 Background Glow Deco */}
      <div className="fixed bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#BB86FC]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
    </div>
  );
};

export default Home;