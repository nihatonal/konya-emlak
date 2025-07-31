import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { Inbox, Send } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const Messages = ({ className }) => {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [replies, setReplies] = useState({});
    const [filterType, setFilterType] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoading, sendRequest } = useHttpClient();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/form`);
                setMessages(responseData);
            } catch (err) { }
        };
        fetchMessages();
    }, [sendRequest]);

    useEffect(() => {
        let filtered = [...messages];

        if (filterType === "replied") {
            filtered = filtered.filter(msg => msg.replies?.length > 0);
        } else if (filterType === "unreplied") {
            filtered = filtered.filter(msg => !msg.replies || msg.replies.length === 0);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(msg =>
                msg.name.toLowerCase().includes(term) ||
                msg.email.toLowerCase().includes(term) ||
                msg.message.toLowerCase().includes(term)
            );
        }

        setFilteredMessages(filtered);
    }, [messages, filterType, searchTerm]);

    const handleReplySubmit = async (messageId) => {
        const replyText = replies[messageId];
        if (!replyText) return;

        try {
            const res = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/admin/${messageId}/reply`,
                "POST",
                JSON.stringify({ text: replyText }),
                { "Content-Type": "application/json" }
            );

            setMessages((prev) =>
                prev.map((msg) => (msg._id === messageId ? res : msg))
            );
            setReplies((prev) => ({ ...prev, [messageId]: '' }));
        } catch (err) { }
    };

    return (
        <div className={`px-6 max-w-4xl mx-auto space-y-10 ${className}`}>
            {/* FILTRE BAR */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterType("unreplied")}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border ${filterType === "unreplied" ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
                    >
                        <Inbox size={16} />
                        Cevaplanmamış
                    </button>
                    <button
                        onClick={() => setFilterType("replied")}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm border ${filterType === "replied" ? 'bg-green-600 text-white' : 'bg-white text-gray-700'}`}
                    >
                        <Send size={16} />
                        Cevaplanmış
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Ara: İsim, e-mail, içerik..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 px-4 py-2 rounded-md shadow-sm text-sm w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center items-center py-10 text-blue-600">
                    <Loader2 className="animate-spin mr-2" />
                    Yükleniyor...
                </div>
            )}

            {/* Mesajlar */}
            {filteredMessages.map((msg) => (
                <div key={msg._id} className="border border-gray-200 rounded-lg shadow-sm bg-white p-6 space-y-4 relative">
                    {/* HEADER */}
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
                            <p className="font-semibold text-lg text-gray-800">{msg.name}</p>
                            <p className="text-sm text-blue-500">{msg.email}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${msg.replies?.length > 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {msg.replies?.length > 0 ? "Cevaplandı" : "Cevap Bekliyor"}
                        </span>
                    </div>

                    <p className="text-gray-700 text-sm">{msg.message}</p>

                    {/* REPLIES */}
                    {msg.replies?.length > 0 && (
                        <div className="space-y-2">
                            {msg.replies.map((r, idx) => (
                                <div key={idx} className="bg-gray-100 px-4 py-2 rounded-md border text-sm">
                                    <p>{r.text}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {r.createdAt ? new Date(r.createdAt).toLocaleString() : 'Tarih bulunamadı'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* YANITLA */}
                    <div className="pt-2 border-t mt-4">
                        <textarea
                            rows={2}
                            value={replies[msg._id] || ''}
                            onChange={(e) =>
                                setReplies((prev) => ({ ...prev, [msg._id]: e.target.value }))
                            }
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
                            placeholder="Cevabınızı yazın..."
                        />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={() => handleReplySubmit(msg._id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm"
                            >
                                Gönder
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Messages;
