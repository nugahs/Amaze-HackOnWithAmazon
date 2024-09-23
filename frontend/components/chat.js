import { useState } from 'react';
import axios from 'axios';
import styles from './chat.module.css'; // Import the CSS module

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false); // State to manage chat window visibility

    const sendMessage = async () => {
        if (!input) return;

        const newMessage = { role: 'user', content: input };
        setMessages([...messages, newMessage]);

        try {
            const response = await axios.post('http://localhost:3001/chat', { prompt: input });
            const botMessage = { role: 'assistant', content: response.data.response };
            setMessages([...messages, newMessage, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    return (
        <div>
            <button className={styles.chatToggleButton} onClick={() => setIsOpen(!isOpen)}>
                <span className={styles.amazonLogo} />
            </button>


            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>Amazon Assistant</div>
                    <div className={styles.chatBody}>
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.role === 'user' ? styles.userMessage : styles.assistantMessage}>
                                <b>{msg.role === 'user' ? 'You' : 'Assistant'}:</b> {msg.content}
                            </div>
                        ))}
                    </div>
                    <div className={styles.chatFooter}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className={styles.chatInput}
                        />
                        <button onClick={sendMessage} className={styles.sendButton}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
