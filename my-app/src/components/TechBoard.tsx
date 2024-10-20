import React, { useEffect, useState } from 'react';
import Question from './Question'; // 引入你已有的 Question 組件

interface Message {
  _id: string;
  messageId: string;
  content: string;
  author: string;
  createdAt: string;
  mesgType: string;
  questionID: string;
  likeNum: string[];
  hashtag: string[];
  broadType: string;
}

const TechBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 定義 API 請求
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8888/api/v1/open_broad', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            broadType: 'Tech', // 你需要的參數
          }),
        });

        if (!response.ok) {
          throw new Error('API 請求失敗');
        }

        const data = await response.json();
        setMessages(data.messages);  // 設置返回的消息數據
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>發生錯誤: {error}</div>;
  }

  return (
    <div>
      {messages.map((msg) => (
        <Question key={msg.messageId} question={msg} />))}
    </div>
  );
};

export default TechBoard;
