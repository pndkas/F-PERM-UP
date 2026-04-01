export const GameHeader = ({ game }) => (
  <div className="flex items-center gap-6 bg-[#0A0A0A] p-6 rounded-[2.5rem] border border-gray-900 shadow-xl">
    <img src={game.imageUrl} className="w-24 h-24 rounded-2xl object-cover border border-[#BB86FC]/20" alt="" />
    <div>
      <h1 className="text-3xl font-black uppercase   tracking-tighter text-left">{game.gameName}</h1>
      <p className="text-[#BB86FC] font-bold text-xs uppercase tracking-widest text-left">{game.category}</p>
    </div>
  </div>
);