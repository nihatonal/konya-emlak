// src/components/adminPage/AdminPanel.js
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import { useNavigate } from "react-router-dom";
import BottomNavbar from '../../components/adminPage/BottomNavbar';
import AdminDashboard from '../../components/adminPage/AdminDashboard';
import Messages from '../../components/adminPage/Messages';
import Subscribers from '../../components/adminPage/Subscribers';
import Analytics from '../../components/adminPage/Analytics';
import AdminProfil from '../../components/adminPage/AdminProfil';

import {
  HomeIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ChartBarIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import { useHttpClient } from '../../hooks/http-hook';

const AdminPanel = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest, isLoading } = useHttpClient();
  //const [stats, setStats] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [newMessages, setNewMessages] = useState(0)
  const [newSubscribers, setNewSubscribers] = useState([]);
  const [subscribers, setSubscribers] = useState(0);
  //const [pageViews, setPageViews] = useState([]);
  //const [geoVisits, setGeoVisits] = useState([]);
  const [subscriberActivity, setSubscriberActivity] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const navItems = [
    {
      id: "dashboard",
      label: "Anasayfa",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      id: "messages",
      label: "Mesajlar",
      icon: <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />,
    },
    {
      id: "subscribers",
      label: "Aboneler",
      icon: <UserGroupIcon className="w-5 h-5" />,
    },

    {
      id: "anayltics",
      label: "Analizler",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      id: "profil",
      label: "Profil",
      icon: <UserCircleIcon className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/newsletter",
        );
        setNewSubscribers(responseData)
        setSubscribers(responseData.length)
        const groupedMessages = {};
        const now = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        responseData.forEach((msg) => {
          const msgDate = new Date(msg.createdAt);
          if (msgDate >= thirtyDaysAgo) {
            const dateKey = msgDate.toISOString().split("T")[0]; // "2025-07-27"
            if (groupedMessages[dateKey]) {
              groupedMessages[dateKey]++;
            } else {
              groupedMessages[dateKey] = 1;
            }
          }
        });

        const result = Object.entries(groupedMessages).map(([date, count]) => ({
          date,
          count,
        }));
        setSubscriberActivity(result)
      } catch (err) { }
    };
    fetchUsers();

  }, [sendRequest]);

  // Messages Handler
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/form",
        );
        const messagesWithStatus = responseData.map((msg) => {
          const created = new Date(msg.createdAt);
          const now = new Date();
          const isNew = (now - created) / (1000 * 60 * 60) < 24; // Son 24 saat mi?
          return { ...msg, isNew };
        });
        setNewMessages(messagesWithStatus.filter((item) => item.isNew === true).length)
        setRecentMessages(responseData);

      } catch (err) { }
    };
    fetchUsers();

  }, [sendRequest]);

  return (
    <div className="h-screen flex flex-col justify-between pt-24">
      {/* Header */}
      <div className="fixed top-0 z-[99] bg-bvs-lightGreen w-full flex justify-between items-center px-6 py-4 border-b border-bvs-softGreen shadow">
        <h1 className="text-xl font-semibold">
          {navItems.filter((item) => item.id === activeTab)[0].label}

        </h1>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={() => {
            auth.logout();
            navigate("/admin/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* AdminDashboard, arada kalan alanı kaplasın */}
      <div className="flex-grow px-0 md:px-6 py-0 pb-20">
        {activeTab === "dashboard" && <AdminDashboard
          recentMessages={recentMessages}
          newMessages={newMessages}
          newSubscribers={newSubscribers}
          subscribers={subscribers}
          subscriberActivity={subscriberActivity}
        />}
        {activeTab === "messages" && <Messages messages={recentMessages} />}
        {activeTab === "subscribers" && <Subscribers />}
        {activeTab === "anayltics" && <Analytics />}
        {activeTab === "profil" && <AdminProfil />}
      </div>

      {/* Bottom Navbar */}
      <div className="">
        <BottomNavbar navItems={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default AdminPanel;
