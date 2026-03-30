import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Search, Gamepad2 } from 'lucide-react';
import axios from 'axios';

const AdminGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await axios.get('http://localhost:9000/games');
      setGames(res.data);
    } catch (err) { console.error("Fetch games failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black uppercase italic">จัดการเกม</h2>
        <button className="bg-[#BB86FC] text-black px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-all">
          <Plus size={20} /> เพิ่มเกมใหม่
        </button>
      </div>

      <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#0A0A0A] text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">เกม</th>
              <th className="px-6 py-4">ราคา</th>
              <th className="px-6 py-4">หมวดหมู่</th>
              <th className="px-6 py-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {games.map((game) => (
              <tr key={game.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg overflow-hidden">
                    <img src={game.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-bold">{game.title}</span>
                </td>
                <td className="px-6 py-4 text-[#BB86FC] font-mono">{game.price} ฿</td>
                <td className="px-6 py-4 text-gray-400">{game.category}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg"><Edit size={18} /></button>
                    <button className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminGames;