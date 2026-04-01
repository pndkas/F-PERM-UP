import { Edit, Trash2, Gamepad2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PackageTable = ({ packages, onEdit, onRefresh }) => {
  const handleDelete = async (id) => {
    if (!window.confirm("ยืนยันการลบ?")) return;
    try {
      await axios.delete(`http://localhost:9000/api/packages/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success("ลบเรียบร้อย");
      onRefresh();
    } catch (err) { toast.error("ลบไม่สำเร็จ"); }
  };

  return (
    <div className="bg-[#0A0A0A] border border-gray-900 rounded-[2rem] overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-[#111] text-gray-500 text-[10px] uppercase font-black tracking-widest border-b border-gray-900">
          <tr>
            <th className="px-8 py-5">ชื่อแพ็กเกจ / เกม</th>
            <th className="px-8 py-5">ราคาขาย</th>
            <th className="px-8 py-5 text-right">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-900">
          {packages.map((pkg) => (
            <tr key={pkg.packageId} className="hover:bg-white/5 transition-colors group">
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center"><Gamepad2 size={20} className="text-gray-600" /></div>
                  <div>
                    <p className="font-bold text-white uppercase">{pkg.packageName}</p>
                    <p className="text-xs text-[#BB86FC] font-bold">{pkg.game?.gameName}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5 font-black text-lg text-white">฿{pkg.price}</td>
              <td className="px-8 py-5 text-right">
                <div className="flex justify-end gap-2 text-gray-500">
                  <button onClick={() => onEdit(pkg)} className="p-2 hover:text-[#BB86FC]"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(pkg.packageId)} className="p-2 hover:text-red-500"><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackageTable;