import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("chat"); // "chat" or "use-cases"
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

  const UseCasesPage = () => (
    <div className="use-cases-container">
      <div className="use-cases-header">
        <h1>AI Personal Assistant Use Cases</h1>
        <p>Discover how your AI assistant can help you in various aspects of life</p>
      </div>
      
      <div className="use-cases-grid">
        <div className="use-case-card">
          <div className="use-case-icon">🗓️</div>
          <h3>Calendar & Scheduling</h3>
          <p>Help schedule events, meetings, dates, workouts, and study sessions. Suggests optimal time blocks based on your routines and preferences.</p>
          <ul>
            <li>Schedule meetings and appointments</li>
            <li>Plan workout routines</li>
            <li>Organize study sessions</li>
            <li>Set reminders for deadlines</li>
          </ul>
        </div>

        <div className="use-case-card">
          <div className="use-case-icon">✅</div>
          <h3>Task Management</h3>
          <p>Track your to-dos, priorities, and progress toward goals. Break down big goals into manageable steps.</p>
          <ul>
            <li>Create and organize task lists</li>
            <li>Set priorities using frameworks</li>
            <li>Track progress on goals</li>
            <li>Break down complex projects</li>
          </ul>
        </div>

        <div className="use-case-card">
          <div className="use-case-icon">📚</div>
          <h3>Memory & Knowledge Management</h3>
          <p>Summarize long texts, convert unstructured thoughts into organized notes, and help you retain important information.</p>
          <ul>
            <li>Summarize articles and documents</li>
            <li>Organize research notes</li>
            <li>Convert voice recordings to text</li>
            <li>Create structured outlines</li>
          </ul>
        </div>

        <div className="use-case-card">
          <div className="use-case-icon">💼</div>
          <h3>Work & Projects</h3>
          <p>Help manage internship, job, or business tasks. Draft emails, resumes, reports, and track networking opportunities.</p>
          <ul>
            <li>Draft professional emails</li>
            <li>Create resume content</li>
            <li>Track networking contacts</li>
            <li>Manage project deliverables</li>
          </ul>
        </div>

        <div className="use-case-card">
          <div className="use-case-icon">🧘</div>
          <h3>Mental Health & Wellness</h3>
          <p>Check in on your emotional well-being, help work through stress, and offer grounding exercises when needed.</p>
          <ul>
            <li>Daily mood check-ins</li>
            <li>Stress management techniques</li>
            <li>Journaling prompts</li>
            <li>Mindfulness exercises</li>
          </ul>
        </div>

        <div className="use-case-card">
          <div className="use-case-icon">🛠️</div>
          <h3>Tech & Automation</h3>
          <p>Suggest or help build automations using tools like Zapier, Notion, Obsidian, GitHub, and OpenAI APIs.</p>
          <ul>
            <li>Write and debug code</li>
            <li>Suggest automation tools</li>
            <li>Help with API integrations</li>
            <li>Recommend productivity apps</li>
          </ul>
        </div>

        <div className="use-case-card">
          <div className="use-case-icon">💰</div>
          <h3>Finance Management</h3>
          <p>Track spending habits, suggest investment strategies, and help you understand financial concepts.</p>
          <ul>
            <li>Budget tracking suggestions</li>
            <li>Investment education</li>
            <li>Financial goal planning</li>
            <li>Expense categorization</li>
          </ul>
        </div>

        <div className="use-case-card">
          <div className="use-case-icon">👥</div>
          <h3>Social Life</h3>
          <p>Help plan dates, suggest gift ideas, draft social messages, and warn about over-commitment.</p>
          <ul>
            <li>Date planning ideas</li>
            <li>Gift suggestions</li>
            <li>Social media content</li>
            <li>Event planning help</li>
          </ul>
        </div>

        <div className="use-case-card">
          <div className="use-case-icon">✈️</div>
          <h3>Travel Planning</h3>
          <p>Help plan trips, research itineraries, compare flights/hotels, and prepare for travel.</p>
          <ul>
            <li>Itinerary planning</li>
            <li>Travel research</li>
            <li>Packing lists</li>
            <li>Budget travel tips</li>
          </ul>
        </div>
      </div>

      <div className="use-cases-footer">
        <h2>Ready to Get Started?</h2>
        <p>Switch to the chat tab and start talking to your AI assistant!</p>
        <button 
          className="chat-button"
          onClick={() => setCurrentPage("chat")}
        >
          Start Chatting
        </button>
      </div>
    </div>
  );

  const ChatPage = () => (
    <>
      <div className="chatbot-header">AI Personal Assistant</div>
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
    </>
  );

  return (
    <div className="chatbot-container">
      <div className="navigation-tabs">
        <button 
          className={`nav-tab ${currentPage === "chat" ? "active" : ""}`}
          onClick={() => setCurrentPage("chat")}
        >
          💬 Chat
        </button>
        <button 
          className={`nav-tab ${currentPage === "use-cases" ? "active" : ""}`}
          onClick={() => setCurrentPage("use-cases")}
        >
          📋 Use Cases
        </button>
      </div>
      
      {currentPage === "chat" ? <ChatPage /> : <UseCasesPage />}
    </div>
  );
}

export default App;
