import React, { useState, useEffect, useContext } from 'react';
import { FaTrashAlt, FaEnvelopeOpenText, FaUsers } from 'react-icons/fa';
import { Send } from "lucide-react";
import { HiOutlinePaperAirplane } from "react-icons/hi2"; // veya başka bir ikon
import { Tooltip } from "react-tooltip"; // tooltip istersen (opsiyonel)
import { Text } from 'slate'
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';


import 'react-tooltip/dist/react-tooltip.css';
import RichTextExample from '../editor/RichTextExample';

const Subscribers = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();
  // send message
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(null);

  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState('');
  const [view, setView] = useState(false);
  const [messages, setMessages] = useState([]);
  const [editorContent, setEditorContent] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resSubs = await fetch(`${process.env.REACT_APP_BACKEND_URL}/newsletter`);
        const resMsgs = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/subscriber-messages`);
        const subsData = await resSubs.json();
        const msgsData = await resMsgs.json();
        setSubscribers(subsData);
        setMessages(msgsData);
        setSelectedMessage(msgsData.reverse()[0])
      } catch (err) {
        console.error('Veriler alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // RichTextExample'den gelen Slate JSON verisini yakala
  const handleEditorChange = (value) => {
    setEditorContent(value)
    // Burada istersen HTML'ye çevirebilirsin
  }
  const serialize = nodes => {
    if (!nodes) return ''  // Eğer nodes yoksa boş string döndür
    return nodes.map(n => {
      if (Text.isText(n)) {
        let text = n.text
        if (n.bold) text = `<strong>${text}</strong>`
        if (n.italic) text = `<em>${text}</em>`
        if (n.underline) text = `<u>${text}</u>`
        if (n.code) text = `<code>${text}</code>`
        return text
      }

      const children = serialize(n.children)  // recursive call, string döner

      switch (n.type) {
        case 'paragraph':
          return `<p>${children}</p>`
        case 'heading-one':
          return `<h1>${children}</h1>`
        case 'heading-two':
          return `<h2>${children}</h2>`
        case 'block-quote':
          return `<blockquote>${children}</blockquote>`
        case 'numbered-list':
          return `<ol>${children}</ol>`
        case 'bulleted-list':
          return `<ul>${children}</ul>`
        case 'list-item':
          return `<li>${children}</li>`
        case 'image':
          return `<img src="${n.url}" alt="Inserted image" />`
        default:
          return children
      }
    }).join('')
  }

  const handleSubmit = async () => {
    if (!subject) return alert("Konu alanı zorunlu");

    const rawHtml = serialize(editorContent);
    const formattedHtml = rawHtml.replace(/></g, '>\n<'); // alt alta yazılsın

    try {
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/admin/send-newsletter`,
        "POST",
        JSON.stringify({ subject, html: formattedHtml }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setMessage(res.message);
      setSubject("");
    } catch (err) {
      alert("Gönderim başarısız");
    }
  };

  const deleteSubscriber = async (id) => {
    if (!window.confirm("Bu aboneyi silmek istediğinize emin misiniz?")) return;
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/subscribers/${id}`, {
        method: 'DELETE',
      });
      setSubscribers(subscribers.filter((sub) => sub._id !== id));
    } catch (err) {
      console.error('Silme hatası:', err);
    }
  };

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMessages = messages.filter((msg) =>
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ).reverse();

  const handleResend = async (msg) => {
    try {
      // backend'e yeniden gönderme API isteği yap
      const response = await fetch('/api/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });

      if (!response.ok) throw new Error('Gönderim başarısız');

      alert('Mesaj yeniden gönderildi.');
    } catch (err) {
      console.error(err);
      alert('Hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="px-4 py-4 max-w-7xl mx-auto ">
      {/* Üst ikon barı */}
      <div className="flex justify-end mb-6">
        <IconWithTooltip
          buttonLabel={view ? "Mesajlar" : "Yeni Mesaj Gönder"}
          icon={view ? <FaEnvelopeOpenText /> : <HiOutlinePaperAirplane />}
          tooltip="Yeni Mesaj Gönder"
          active={view}
          onClick={() => setView(!view)}
        />
      </div>

      {/* Ana Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sol Panel */}
        <div className="space-y-6 md:col-span-1">
          {/* Aboneler */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Aboneler</h3>
            <input
              type="text"
              placeholder="E-posta ile ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((sub) => (
                  <div
                    key={sub._id}
                    className="flex justify-between items-center p-3 bg-green-50 border rounded hover:shadow transition"
                  >
                    <div>
                      <p className="font-medium text-sm text-gray-700">{sub.email}</p>
                      {sub.name && <p className="text-xs text-gray-500">{sub.name}</p>}
                    </div>
                    <FaTrashAlt
                      onClick={() => deleteSubscriber(sub._id)}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Hiç abone yok.</p>
              )}
            </div>
          </div>

          {/* Mesaj Listesi */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Mesajlar</h3>
            <input
              type="text"
              placeholder="Konuya göre ara..."
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedMessage(msg)}
                    className={`cursor-pointer px-3 py-2 border rounded hover:bg-gray-100 transition ${selectedMessage?.id === msg.id ? 'bg-gray-100 font-semibold' : ''
                      }`}
                  >
                    <p className="text-sm truncate">{msg.subject}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Eşleşen mesaj bulunamadı.</p>
              )}
            </div>
          </div>
        </div>

        {/* Orta Panel */}
        <div className="md:col-span-3 flex flex-col max-h-[80vh] overflow-y-auto overflow-x-hidden bg-white shadow rounded-lg p-6">
          {view ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Toplu Mesaj Oluştur</h3>
              <input
                type="text"
                placeholder="Konu"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="bg-white p-3 rounded-lg border">
                <RichTextExample onChange={handleEditorChange} />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                {isLoading ? "Gönderiliyor..." : <><Send className="w-4 h-4" /> Gönder</>}
              </button>
              {message && (
                <p className="text-sm text-green-600 font-medium mt-2">{message}</p>
              )}
            </div>
          ) : selectedMessage ? (
            <div>
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                <button
                  className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  onClick={() => handleResend(selectedMessage)}
                >
                  Yeniden Gönder
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Tarih: {new Date(selectedMessage.createdAt).toLocaleString()}
              </p>
              <div
                className="prose prose-sm max-w-none text-gray-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_img]:rounded-lg [&_img]:max-w-full [&_img]:h-72"
                dangerouslySetInnerHTML={{ __html: selectedMessage.html }}
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Bir mesaj seçin.</p>
          )}
        </div>
      </div>
    </div>
  );

};

export default Subscribers;

// IconWithTooltip bileşeni
const IconWithTooltip = ({ buttonLabel, icon, tooltip, active, onClick }) => (
  <div className="flex items-center">
    <div
      data-tooltip-id={tooltip}
      data-tooltip-content={tooltip}
      onClick={onClick}
      className={`cursor-pointer transition ${active ? "text-sky-600" : "text-gray-500 hover:text-sky-600"}`}
    >
      <button className="text-sm inline-flex items-center gap-2">{buttonLabel}{icon}</button>
    </div>
    <Tooltip id={tooltip} place="top" effect="solid" />
  </div>
);

