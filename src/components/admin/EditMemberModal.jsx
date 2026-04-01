import React, { useState, useEffect } from "react";
import { X, Save, Loader2, User, Edit2 } from "lucide-react";

const EditMemberModal = ({ isOpen, onClose, member, onSave, isSubmitting }) => {
  const [editName, setEditName] = useState(""); // 🆕 เพิ่มฟิลด์ชื่อ
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    if (member) {
      setEditName(member.name || ""); // ดึงชื่อเดิมมาใส่
      setEditNotes(member.notes || "");
      setEditStatus(member.isActive || "PENDING");
    }
  }, [member, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#0A0A0A] border border-gray-800 w-full max-w-md rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(187,134,252,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#BB86FC]/50"></div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-white uppercase">
            Manage Member
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors cursor-pointer">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          {/* 🆕 ช่องแก้ไขชื่อ */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
              Customer Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                disabled={isSubmitting}
                className="w-full bg-[#111] border border-gray-800 p-4 rounded-2xl text-white outline-none focus:border-[#BB86FC]/50 transition-all pl-11"
                placeholder="ชื่อ-นามสกุล"
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            </div>
          </div>

          {/* เลือกสถานะ */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
              Account Status
            </label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-[#111] border border-gray-800 p-4 rounded-2xl text-white outline-none focus:border-[#BB86FC]/50 transition-all appearance-none cursor-pointer"
            >
              <option value="PENDING">PENDING (รออนุมัติ)</option>
              <option value="ACTIVE">ACTIVE (ปกติ)</option>
              <option value="BANNED">BANNED (ระงับการใช้งาน)</option>
            </select>
          </div>

          {/* ช่องโน้ต */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">
              Internal Notes
            </label>
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              disabled={isSubmitting}
              placeholder="ระบุเหตุผลการดำเนินการ..."
              className="w-full bg-[#111] border border-gray-800 p-4 rounded-2xl text-white outline-none focus:border-[#BB86FC]/50 transition-all h-24 resize-none text-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all cursor-pointer"
          >
            ยกเลิก
          </button>
          <button
            onClick={() =>
              onSave(member.memberId, {
                name: editName,   // 🆕 ส่งชื่อไปหลังบ้านด้วย
                isActive: editStatus,
                notes: editNotes,
              })
            }
            disabled={isSubmitting}
            className="flex-1 py-4 bg-[#BB86FC] text-black font-black rounded-2xl hover:shadow-[0_0_20px_rgba(187,134,252,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save size={18} /> บันทึก
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;