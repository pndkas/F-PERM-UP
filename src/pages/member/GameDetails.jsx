import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { User, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

import { PackageCard } from '../../components/GameDetails/PackageCard';
import { CheckoutSidebar } from '../../components/GameDetails/CheckoutSidebar';
import { GameHeader } from '../../components/GameDetails/GameHeader';
import { useGameCheckout } from '../../hooks/useGameCheckout';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [packages, setPackages] = useState([]);

  const { 
    register, handleSubmit, setValue, watch, 
    formState: { errors }, loading, preview, onFileChange, handleCheckout 
  } = useGameCheckout(id, navigate);

  const watchedPackage = watch("selectedPackage");

  useEffect(() => {
    register("selectedPackage", { required: true });
    register("slip", { required: true });
  }, [register]);

  useEffect(() => {
    // 1. ดึงข้อมูลเกม
    axios.get(`http://localhost:9000/games/${id}`)
      .then(res => setGame(res.data))
      .catch(() => toast.error("โหลดข้อมูลเกมไม่สำเร็จ"));

    // 2. ดึงข้อมูล Packages (แก้ไข Syntax ที่แตกแล้ว ✨)
    axios.get(`http://localhost:9000/member/packages/${id}`)
      .then(res => {
        setPackages(res.data || []);
      })
      .catch((err) => {
        console.error("Fetch Packages Error:", err);
        setPackages([]);
      });
  }, [id]);

  if (!game) return (
    <div className="min-h-screen bg-black flex items-center justify-center text-[#BB86FC] font-black">
      <Loader2 className="animate-spin mr-2" /> LOADING...
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6 font-sans text-left">
      <form onSubmit={handleSubmit(handleCheckout)} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div className="lg:col-span-2 space-y-8">
          <GameHeader game={game} />

          {/* STEP 1: UID */}
          <div className="bg-[#0A0A0A] p-8 rounded-[2.5rem] border border-gray-900">
            <h3 className="text-xl font-black mb-6   uppercase">1. ระบุข้อมูลตัวตน</h3>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                {...register("customerUid", { required: "กรุณากรอก UID" })}
                placeholder="กรอก Player ID / UID ของคุณ" 
                className={`w-full bg-black border ${errors.customerUid ? 'border-red-500' : 'border-gray-800'} rounded-2xl py-5 pl-14 pr-5 focus:border-[#BB86FC] outline-none font-bold text-lg transition-all text-white`}
              />
            </div>
            {errors.customerUid && <p className="text-red-500 text-xs mt-2 font-bold">{errors.customerUid.message}</p>}
          </div>

          {/* STEP 2: Packages */}
          <div className="bg-[#0A0A0A] p-8 rounded-[2.5rem] border border-gray-900">
            <h3 className="text-xl font-black mb-6   uppercase">2. เลือกแพ็กเกจ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages && packages.length > 0 ? (
                packages.map((pkg) => (
                  <PackageCard 
                    key={pkg.packageId}
                    pkg={pkg}
                    isSelected={watchedPackage?.packageId === pkg.packageId}
                    onSelect={(p) => setValue("selectedPackage", p, { shouldValidate: true })}
                  />
                ))
              ) : (
                <div className="col-span-full py-10 text-center border border-dashed border-gray-800 rounded-2xl">
                   <p className="text-gray-500   font-bold uppercase tracking-widest">ไม่มีแพ็กเกจที่พร้อมใช้งานในขณะนี้</p>
                </div>
              )}
            </div>
            {errors.selectedPackage && <p className="text-red-500 text-xs mt-4 font-bold uppercase  ">* กรุณาเลือกแพ็กเกจ</p>}
          </div>
        </div>

        <CheckoutSidebar 
          watchedPackage={watchedPackage}
          preview={preview}
          onFileChange={onFileChange}
          loading={loading}
        />
      </form>
    </div>
  );
};

export default GameDetails;