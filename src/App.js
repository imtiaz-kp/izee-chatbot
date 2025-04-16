import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToBot } from './api';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await sendMessageToBot(input);
      const botMessage = { sender: 'bot', text: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setIsTyping(false);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🤖 Izee Chatbot</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#aee1f9' : '#e8f5e9',
              color: msg.sender === 'user' ? '#003366' : '#2e7d32',
            }}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div style={{ ...styles.message, alignSelf: 'flex-start', fontStyle: 'italic', color: '#999' }}>
            Izee is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>Send</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    boxSizing: 'border-box',
  },
  title: {
    textAlign: 'center',
    color: '#4a148c',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    backgroundColor: '#fdfdfd',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  message: {
    maxWidth: '80%',
    padding: '12px 18px',
    margin: '6px 0',
    borderRadius: '18px',
    fontSize: '16px',
    lineHeight: '1.5',
    backgroundColor: '#eee',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  inputArea: {
    display: 'flex',
    marginTop: '15px',
  },
  input: {
    flex: 1,
    padding: '14px 18px',
    borderRadius: '20px',
    border: '1px solid #bbb',
    fontSize: '16px',
    marginRight: '10px',
    outline: 'none',
  },
  button: {
    padding: '14px 22px',
    backgroundColor: '#6a1b9a',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default App;
