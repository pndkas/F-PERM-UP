const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-gray-800 hover:border-[#BB86FC]/50 transition-all group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-black mt-2 tracking-tight group-hover:text-white transition-colors">{value}</h3>
      </div>
      <div className={`p-3 rounded-2xl bg-gray-900 border border-gray-800 ${color}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);
export default StatCard;