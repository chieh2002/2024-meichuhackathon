import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import InputForm from '../components/InputForm';
import '../styles/QuestionDetail.css'; // 確保 CSS 被引入
import Answer from '../components/Answer';

const QuestionDetail: React.FC = () => {
  const location = useLocation();
  const { state } = location;

  const [messages, setMessages] = useState<any[]>([]);

  // 模擬 API 請求來獲取問題和答案
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch('http://localhost:8888/api/v1/getanswers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questionId: state?.messageId }),
      });

      const data = await response.json();
      setMessages(data.messages);
    };

    fetchMessages();
  }, [state]);

  return (
    <div>
     

      <div className="question-list">
      <div className="question-card2">
        <h3>{state?.content || '未提供'}</h3>
        <p>問題 ID: {state?.messageId || '未提供'}</p>
        <p>作者: {state?.author || '未提供'}</p>
        <p>標籤: {state?.hashtag ? state.hashtag.join(', ') : '未提供'}</p>
      </div>
        {messages.map((msg) => (
          <Answer key={msg.messageId} answer={msg} />
        ))}
      </div>

      {/* 使用 InputForm，傳遞 questionID, broadType, author */}
      <InputForm questionID={state?.messageId} broadType={state?.broadType} author={state?.author} />
    </div>
  );
};

export default QuestionDetail;
