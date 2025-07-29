import React, { useState, useEffect, useContext } from 'react';
import { FaTrashAlt, FaEnvelopeOpenText, FaUsers } from 'react-icons/fa';
import { Send } from "lucide-react";
import { HiOutlinePaperAirplane } from "react-icons/hi2"; // veya başka bir ikon
import { Tooltip } from "react-tooltip"; // tooltip istersen (opsiyonel)
import { Text } from 'slate'
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from '../../context/auth-context';


import 'react-tooltip/dist/react-tooltip.css';
import RichTextEditor from '../editor/RichTextEditor';
import RichTextExample from '../editor/RichTextExample';

const Subscribers = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading } = useHttpClient();
  // send message
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState(" ");
  const [message, setMessage] = useState(null);

  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('subscribers'); // 'subscribers' | 'messages'
  const [messages, setMessages] = useState([]);
  const [editorContent, setEditorContent] = useState([])

  useEffect(() => {
    fetchSubscribers();
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
      setHtml("");
    } catch (err) {
      alert("Gönderim başarısız");
    }
  };


  const fetchSubscribers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/newsletter`);
      const data = await res.json();
      setSubscribers(data);
    } catch (err) {
      console.error('Aboneleri alırken hata:', err);
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

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/subscriber-messages`);
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error('Mesajları alırken hata:', err);
    }
  };

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleIconClick = (newView) => {
    setView(newView);
    if (newView === 'messages') fetchMessages();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Üst ikon barı */}
      <div className="flex justify-end gap-4">
        <div className="flex justify-end items-center gap-4 mb-4">
          <FaUsers
            data-tooltip-id="subscribers-list-tooltip"
            data-tooltip-content="Abone Listesi"
            className={`${view === "subscribers" ? "text-sky-600" : ""} outline-none cursor-pointer text-2xl text-gray-400 hover:text-blue-600 transition`}
            onClick={() => handleIconClick("subscribers")}
          />
          <Tooltip id="subscribers-list-tooltip" place="top" effect="solid" />
        </div>

        <div className="flex justify-end items-center gap-4 mb-4">
          <FaEnvelopeOpenText
            data-tooltip-id="message-list-tooltip"
            data-tooltip-content="Mesaj Listesi"
            className={`${view === "messages" ? "text-sky-600" : ""} outline-none cursor-pointer text-2xl text-gray-400 hover:text-blue-600 transition`}
            onClick={() => handleIconClick("messages")}
          />
          <Tooltip id="message-list-tooltip" place="top" effect="solid" />
        </div>
        <div className="flex justify-end items-center gap-4 mb-4">
          <HiOutlinePaperAirplane
            data-tooltip-id="new-message-tooltip"
            data-tooltip-content="Yeni Mesaj Gönder"
            className={`${view === "form" ? "text-sky-600" : ""} outline-none cursor-pointer text-2xl text-gray-400 hover:text-blue-600 transition`}
            onClick={() => handleIconClick("form")}
          />
          <Tooltip id="new-message-tooltip" place="top" effect="solid" />
        </div>
      </div>

      {view === "form" && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Toplu Mesaj Oluştur</h3>
          </div>

          <input
            type="text"
            placeholder="Konu"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
          <div className="bg-white p-3 rounded-lg">
            <RichTextExample onChange={handleEditorChange} />
          </div>

          {/* <RichTextEditor onChange={setHtml} /> */}

          {/* 
          <textarea
            placeholder="HTML içeriği"
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="w-full h-40 border rounded-lg px-3 py-2"
          /> */}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {isLoading ? "Gönderiliyor..." : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" /> Gönder
              </div>
            )}
          </button>

          {message && (
            <p className="text-sm text-green-600 font-medium mt-2">{message}</p>
          )}
        </div>
      )}

      {/* Arama filtresi */}
      {view === 'subscribers' && (
        <>
          <input
            type="text"
            placeholder="E-posta ile ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
          />

          {/* Abone listesi */}
          {filteredSubscribers.length > 0 ? (
            filteredSubscribers.map((sub) => (
              <div
                key={sub._id}
                className="flex justify-between items-center p-3 mb-2 bg-bvs-softGreen border rounded shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-medium">{sub.email}</p>
                  {sub.name && <p className="text-sm text-gray-500">{sub.name}</p>}
                </div>
                <FaTrashAlt
                  onClick={() => deleteSubscriber(sub._id)}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                />
              </div>
            ))
          ) : (
            <p>Hiç abone bulunamadı.</p>
          )}
        </>
      )}

      {/* Mesajlar görünümü */}
      {view === 'messages' && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Toplu Gönderilen Mesajlar</h2>
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <div
                key={i}
                className="border p-3 rounded mb-4 bg-gray-50"
              >
                <p className="text-md font-semibold text-gray-700 mb-1">
                  {msg.subject}
                </p>

                <div
                  className="prose prose-sm max-w-none text-gray-800 pl-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 
                       [&>img]:rounded-lg [&>img]:max-w-full [&>img]:h-auto"
                  dangerouslySetInnerHTML={{ __html: msg.html }}
                />

                <p className="text-xs text-gray-500 mt-2">
                  Tarih: {new Date(msg.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>Henüz gönderilen mesaj yok.</p>
          )}
        </div>
      )}


    </div>
  );
};

export default Subscribers;
