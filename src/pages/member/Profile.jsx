import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserStore } from '../../store/userStore';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [history, setHistory] = useState([]); // 👈 เปลี่ยนจาก Mock เป็น State
  const { fetchProfile, userData } = useUserStore();

  useEffect(() => {
    // 1. ดึงข้อมูลโปรไฟล์ลง Store
    fetchProfile();

    // 2. ดึงประวัติการเติมเงินจาก Back-end
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:9000/api/history/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(response.data); // 👈 เอาข้อมูลจริงใส่ State
      } catch (error) {
        console.error("Error fetching history", error);
      }
    };

    fetchHistory();
  }, []);

  // ... ส่วนที่เหลือส่ง history ไปให้ HistoryTable ...
  return (
    // ...
    {activeTab === 'history' && <HistoryTable history={history} />}
    // ...
  );
};

export default Profile