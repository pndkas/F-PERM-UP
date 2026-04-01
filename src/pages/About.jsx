import React, { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState(2);

  const coreValues = [
    { id: 1, title: "ผู้เล่นต้องมาก่อน", content: "Perm-Up ถือกำเนิดขึ้นเพื่อเติมเต็มความต้องการของผู้เล่นทุกคน เราเข้าใจดีว่าคุณต้องการบริการที่รวดเร็ว ปลอดภัย และเชื่อถือได้", icon: "🤝" },
    { id: 2, title: "เราจริงจังเรื่องเกม", content: "พวกเราไม่ใช่แค่ผู้ให้บริการ แต่เราคือ 'เกมเมอร์' ที่รักและหลงใหลในโลกของเกม เราเข้าใจอารมณ์และความต้องการของคุณในทุกช่วงเวลา", icon: "🎮" },
    { id: 3, title: "ความฝัน", content: "เรามุ่งมั่นที่จะส่งมอบบริการที่มีคุณภาพ รวดเร็ว และปลอดภัยที่สุด เพื่อให้คุณสนุกกับเกมได้อย่างเต็มที่", icon: "✨" },
    { id: 4, title: "มาเพื่อระยะยาว", content: "เราสร้างระบบที่ยั่งยืน เชื่อถือได้ และพร้อมที่จะเติบโตไปพร้อมกับคุณ เพื่อเป็นพันธมิตรที่ไว้วางใจได้ตลอดไป", icon: "🏗️" },
    { id: 5, title: "ONE PERM-UP", content: "เราคือทีมงานคุณภาพที่ทำงานประสานกันอย่างลงตัว เพื่อส่งมอบบริการที่ดีที่สุดให้กับคุณ", icon: "🎯" }
  ];

  const activeValue = coreValues.find(v => v.id === activeTab);

  return (
    // เปลี่ยนมาใช้ font-sans เพื่อให้อ่านง่ายขึ้น
    <div className="bg-[#000000] text-white min-h-screen pt-12 pb-32 font-sans">
      
      {/* 🚀 Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center py-20">
        {/* หัวข้อใหญ่: ปรับให้อ่านง่ายแต่ยังดูหนักแน่น */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight">
          เราคือ <span className="text-[#BB86FC]">PERM-UP</span> <br/> 
          ที่เข้าใจเกมเมอร์อย่างแท้จริง
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Perm-Up ถูกสร้างขึ้นเพื่อยกระดับมาตรฐานการให้บริการในโลกของเกม 
          เราโฟกัสที่ความรวดเร็ว ความซื่อสัตย์ และความพึงพอใจของลูกค้าเป็นอันดับหนึ่ง
        </p>
      </div>

      {/* 🏆 Core Values Section */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 md:p-16 shadow-2xl">
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* ฝั่งซ้าย: แสดง ID และ Icon */}
            <div className="text-center md:text-left">
              <span className="text-[#BB86FC] text-6xl font-black mb-4 block opacity-50">0{activeValue.id}</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{activeValue.title}</h2>
              <div className="text-8xl py-4">{activeValue.icon}</div>
            </div>

            {/* ฝั่งขวา: เนื้อหา (ใช้ฟอนต์ขนาดกำลังดี อ่านง่าย) */}
            <div className="bg-white/5 p-8 rounded-3xl border border-white/5">
              <p className="text-xl text-gray-200 leading-relaxed font-medium">
                "{activeValue.content}"
              </p>
              
              <div className="mt-8 grid grid-cols-2 gap-y-4">
                {['รวดเร็ว', 'ปลอดภัย', 'มืออาชีพ', 'ซื่อตรง'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-400 font-semibold">
                    <div className="w-1.5 h-1.5 bg-[#BB86FC] rounded-full"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🔘 Navigation Tabs (ปุ่มกดเปลี่ยนหัวข้อ) */}
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {coreValues.map((value) => (
              <button
                key={value.id}
                onClick={() => setActiveTab(value.id)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 text-sm
                  ${activeTab === value.id 
                    ? 'bg-[#BB86FC] text-black shadow-lg shadow-[#BB86FC]/20' 
                    : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300'
                  }`}
              >
                0{value.id}. {value.title}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;