import React, { useEffect, useState } from 'react';
import { useHttpClient } from '../../hooks/http-hook';
import { Inbox, Send } from 'lucide-react'; // lucide-react ikonu
const Messages = ({ className }) => {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [replies, setReplies] = useState({}); // { messageId: "cevap içeriği" }
    const [filterType, setFilterType] = useState("all"); // all | replied | unreplied
    const [searchTerm, setSearchTerm] = useState("");
    const { isLoading, sendRequest } = useHttpClient();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL + "/form",
                );
                setMessages(responseData)
            } catch (err) { }
        };
        fetchUsers();

    }, [sendRequest,filterType]);

    useEffect(() => {
        let filtered = [...messages];

        if (filterType === "replied") {
            filtered = filtered.filter(msg => msg.replies?.length > 0);
        } else if (filterType === "unreplied") {
            filtered = filtered.filter(msg => !msg.replies || msg.replies.length === 0);
        }

        if (searchTerm.trim()) {
            filtered = filtered.filter(msg =>
                msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                msg.message.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredMessages(filtered);
    }, [messages, filterType, searchTerm]);

    const handleReplySubmit = async (messageId) => {
        const replyText = replies[messageId];
        let updatedMessage;
        if (!replyText) return;
        try {
            const res = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/admin/${messageId}/reply`,
                "POST",
                JSON.stringify({
                    text: replyText
                }),
                { "Content-Type": "application/json" }
            );
            updatedMessage = res
            setMessages((prev) =>
                prev.map((msg) => (msg._id === messageId ? updatedMessage : msg))
            );
            setReplies((prev) => ({ ...prev, [messageId]: '' }));

        } catch (err) { }

    };


    return (
        <div className={`px-6 max-w-screen-md mx-auto space-y-8 ${className}`}>
            {/* FILTER BAR */}
            <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterType("unreplied")}
                        className={`p-2 rounded ${filterType === "unreplied" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        title="Cevaplanmamışlar"
                    >
                        <Inbox size={18} />
                    </button>
                    <button
                        onClick={() => setFilterType("replied")}
                        className={`p-2 rounded ${filterType === "replied" ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                        title="Cevaplanmışlar"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Ara (isim, email, içerik)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border px-3 py-1 rounded text-sm w-full max-w-xs focus:outline-none focus:ring focus:border-blue-400"
                />
            </div>
            {/* Mesajlar */}
            {filteredMessages.map((msg) => (
                <div key={msg._id} className="border p-4 rounded-lg shadow-sm bg-white">
                    <div className="mb-2">
                        <p className="text-sm text-gray-500">{new Date(msg.createdAt).toLocaleString()}</p>
                        <p className="font-semibold">{msg.name} ({msg.email})</p>
                        <p className="mt-1">{msg.message}</p>
                    </div>

                    <div className="space-y-2 mt-4">
                        {msg.replies?.map((r, idx) => (
                            <div key={idx} className="bg-gray-50 p-2 rounded text-sm border">
                                <p className="text-gray-700">{r.text}</p>
                                {r.createdAt ? (
                                    <p className="text-xs text-gray-400">
                                        {new Date(r.createdAt).toLocaleString()}
                                    </p>
                                ) : (
                                    <p className="text-xs text-red-400">Tarih bulunamadı</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex flex-col gap-2">
                        <textarea
                            rows={2}
                            value={replies[msg._id] || ''}
                            onChange={(e) =>
                                setReplies((prev) => ({ ...prev, [msg._id]: e.target.value }))
                            }
                            className="w-full border rounded p-2 text-sm focus:outline-none focus:ring focus:border-blue-400"
                            placeholder="Cevabınızı yazın..."
                        />
                        <button
                            onClick={() => handleReplySubmit(msg._id)}
                            className="self-end px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                        >
                            Gönder
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Messages;
