import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: data.reply || "Sorry, I didn't get that." }
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Error: Could not reach server." }
      ]);
    }
    setLoading(false);
  };

  const getAvatar = (sender) => {
    return sender === "user"
      ? (
        <span style={{
          background: "linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)",
          color: "#fff",
          borderRadius: "50%",
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 18,
          marginLeft: 8,
          marginRight: 0
        }}>U</span>
      ) : (
        <span style={{
          background: "#e0e7ff",
          color: "#3730a3",
          borderRadius: "50%",
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 18,
          marginRight: 8,
          marginLeft: 0
        }}>🤖</span>
      );
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">AI Chatbot</div>
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message-row ${msg.sender}`}
          >
            {msg.sender === "bot" && getAvatar("bot")}
            <div className={`message-bubble ${msg.sender}`}>{msg.text}</div>
            {msg.sender === "user" && getAvatar("user")}
          </div>
        ))}
        {loading && (
          <div className="message-row bot">
            {getAvatar("bot")}
            <div className="message-bubble bot typing-indicator">Bot is typing...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chatbot-input-area" onSubmit={sendMessage}>
        <input
          className="chatbot-input"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          className="chatbot-send-btn"
          type="submit"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
