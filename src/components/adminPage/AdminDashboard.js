// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import {
    UserGroupIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
//import { useHttpClient } from "../../hooks/http-hook";


const trafficData = [
    { day: "Pzt", visits: 20 },
    { day: "Sal", visits: 35 },
    { day: "Çar", visits: 50 },
    { day: "Per", visits: 42 },
    { day: "Cum", visits: 58 },
    { day: "Cmt", visits: 33 },
    { day: "Paz", visits: 27 },
];

const pageViews = [
    { page: "/anasayfa", views: 120 },
    { page: "/aboneler", views: 95 },
    { page: "/mesajlar", views: 60 },
    { page: "/analytics", views: 50 },
];

const geoVisits = [
    { country: "Türkiye", count: 150 },
    { country: "Almanya", count: 80 },
    { country: "Rusya", count: 40 },
];

export default function AdminDashboard({
    className,
    recentMessages,
    newMessages,
    newSubscribers,
    subscribers,
    subscriberActivity
}) {
    // const { sendRequest, isLoading } = useHttpClient();

    const statCards = [
        {
            id: "subscribers",
            title: "Toplam Abone",
            value: subscribers,
            icon: <UserGroupIcon className="w-6 h-6 text-blue-500" />,
        },
        {
            id: "newMessages",
            title: "Yeni Mesajlar",
            value: newMessages,
            icon: <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-green-500" />,
        },
        {
            id: "visits",
            title: "Bu Hafta Ziyaret",
            value: 123,
            icon: <ChartBarIcon className="w-6 h-6 text-purple-500" />,
        },
    ];



    return (
        <div className={`px-6 max-w-screen-xl mx-auto space-y-4 ${className}`}>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {statCards.map((card) => (
                    <div
                        key={card.id}
                        className="bg-white rounded-xl shadow p-3 flex items-center justify-center gap-4"
                    >
                        {card.icon}
                        <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500">{card.title}</p>
                            <p className="text-2xl font-bold">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main grid sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Traffic Line Chart */}
                <section className="bg-white rounded-xl shadow p-4 flex flex-col">
                    <h2 className="text-lg font-semibold mb-4">Bu Haftanın Trafik Analizi</h2>
                    <div className="flex-grow">
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={trafficData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                {/* Page Views */}
                <section className="bg-white rounded-xl shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">En Çok Görüntülenen Sayfalar</h2>
                    <ul className="space-y-3 text-sm">
                        {pageViews.map((item) => (
                            <li
                                key={item.page}
                                className="flex justify-between border-b border-gray-100 pb-2 last:border-none"
                            >
                                <span>{item.page}</span>
                                <span className="font-semibold">{item.views}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Geo Visits */}
                <section className="bg-white rounded-xl shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">Ziyaretçi Ülkeleri</h2>
                    <ul className="space-y-3 text-sm">
                        {geoVisits.map((geo) => (
                            <li
                                key={geo.country}
                                className="flex justify-between border-b border-gray-100 pb-2 last:border-none"
                            >
                                <span>{geo.country}</span>
                                <span className="font-semibold">{geo.count}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Recent Messages */}
                <section className="bg-white rounded-xl shadow p-4 flex flex-col">
                    <h2 className="text-lg font-semibold">Son Mesajlar</h2>
                    <div className="divide-y divide-gray-200 overflow-y-auto max-h-72">
                        {recentMessages.slice(0, 2).map((msg) => (
                            <div key={msg._id} className="py-3">
                                <p className="font-medium">{msg.name}</p>
                                <p className="text-sm text-gray-600">{msg.message}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(msg.createdAt).toLocaleDateString("tr-TR", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* New Subscribers */}
                <section className="bg-white rounded-xl shadow p-4 flex flex-col">
                    <h2 className="text-lg font-semibold">Yeni Aboneler</h2>
                    <div className="divide-y divide-gray-200 overflow-y-auto max-h-72">
                        {newSubscribers.slice(0, 3).map((sub) => (
                            <div key={sub._id} className="py-3">
                                <p className="font-medium">{sub.email}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(sub.createdAt).toLocaleDateString("tr-TR", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        ))}

                    </div>
                </section>

                {/* Subscriber Activity Heatmap */}
                <section className="bg-white rounded-xl shadow p-4">
                    <h2 className="text-lg font-semibold mb-4">Abone Aktivite Takvimi</h2>
                    <div className="grid grid-cols-3 gap-3 text-center text-sm">
                        {subscriberActivity.map((day, idx) => (
                            <div
                                key={day.date + idx}
                                className="rounded-lg bg-blue-50 p-3 flex flex-col items-center justify-center"
                            >
                                <span className="font-semibold text-blue-600">{day.count}</span>
                                <span className="text-xs text-gray-500">
                                    {new Date(day.date).toLocaleDateString("tr-TR", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                        ))}

                    </div>
                </section>
            </div>
        </div>
    );
}
