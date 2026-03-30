export const GameTable = ({ data, onDelete }) => (
  <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">
    <table className="w-full text-left text-sm">
      <thead className="bg-[#0A0A0A] text-gray-500 uppercase text-[10px] tracking-widest">
        <tr>
          <th className="px-6 py-4">Name</th>
          <th className="px-6 py-4">Price</th>
          <th className="px-6 py-4 text-right">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-800">
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-white/[0.02]">
            <td className="px-6 py-4 font-bold">{item.title}</td>
            <td className="px-6 py-4 text-[#BB86FC]">{item.price} ฿</td>
            <td className="px-6 py-4 text-right">
              <button onClick={() => onDelete(item.id)} className="text-red-500 hover:scale-110 transition-transform">
                ลบ
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);