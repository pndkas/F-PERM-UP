import React from 'react';
import { ExternalLink, CheckCircle2, Clock, XCircle } from 'lucide-react';

const HistoryTable = ({ history }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'APPROVED': return { color: 'text-green-400', bg: 'bg-green-400/10', icon: <CheckCircle2 size={14} /> };
      case 'REJECTED': return { color: 'text-red-400', bg: 'bg-red-400/10', icon: <XCircle size={14} /> };
      default: return { color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: <Clock size={14} /> };
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-separate border-spacing-y-3">
        <thead>
          <tr className="text-gray-500 text-[10px] uppercase font-black tracking-[0.2em]">
            <th className="px-6 py-2">Game / Package</th>
            <th className="px-6 py-2 text-center">Amount</th>
            <th className="px-6 py-2 text-center">Status</th>
            <th className="px-6 py-2 text-center">Date</th>
            <th className="px-6 py-2 text-right">Slip</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => {
            const style = getStatusStyle(item.status);
            return (
              <tr key={item.orderId} className="bg-black/40 border border-gray-900 hover:bg-gray-900/50 transition-all group">
                <td className="px-6 py-4 rounded-l-2xl">
                  <div className="flex items-center gap-4">
                    <img src={item.game?.imageUrl} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="font-bold text-white text-sm">{item.game?.gameName}</p>
                      <p className="text-xs text-gray-500">{item.package?.packageName}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-black text-[#BB86FC]">
                  ฿{Number(item.amount).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${style.bg} ${style.color}`}>
                    {style.icon} {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-xs text-gray-500 font-medium">
                  {new Date(item.createdAt).toLocaleDateString('th-TH')}
                </td>
                <td className="px-6 py-4 text-right rounded-r-2xl">
                  <a href={item.slipUrl} target="_blank" rel="noreferrer" className="inline-flex p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-[#BB86FC] hover:bg-[#BB86FC]/10 transition-all">
                    <ExternalLink size={16} />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;