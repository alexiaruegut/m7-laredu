// src/components/MessageList.tsx
import React, { useEffect, useState } from "react";

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  is_read: boolean;
  created_at: string;
}

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/messages", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch(() => setMessage("Error al obtener mensajes"));
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        receiver_id: parseInt(receiverId),
        content,
      }),
    })
      .then((res) => res.json())
      .then(() => setMessage("Mensaje enviado con éxito"))
      .catch(() => setMessage("Error al enviar mensaje"));
  };

  return (
    <div className="p-10 bg-blue-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Mensajería</h2>
      {message && <p className="text-green-500 text-center">{message}</p>}

      <form onSubmit={handleSendMessage} className="mb-6 flex space-x-4">
        <input
          type="number"
          placeholder="ID Destinatario"
          className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mensaje"
          className="border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-500 transition-all">
          Enviar
        </button>
      </form>

      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg.id} className="p-4 bg-white shadow-lg rounded-xl transition-all duration-300">
            <strong className="text-gray-800">
              {msg.sender_id === 2 ? "Yo" : `Usuario ${msg.sender_id}`}
            </strong>
            : <span className="text-gray-600">{msg.content}</span> -{" "}
            <span className="text-sm text-gray-400">{new Date(msg.created_at).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
