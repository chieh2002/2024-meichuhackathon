import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AnswerProps {
  answer: {
    messageId: string; // 可以用來導航
    content: string;   // 回答的內容
    author: string;    // 作者的名字
    likeNum: string[]; // 喜歡的用戶ID陣列
  };
}

const Answer: React.FC<AnswerProps> = ({ answer }) => {
  const navigate = useNavigate();

  // 處理點擊事件
  const handleClick = () => {
    navigate(`/answer/${answer.messageId}`, {
      state: {
        messageId: answer.messageId,
        content: answer.content,
        author: answer.author,
        likeNum: answer.likeNum,
      },
    });
  };

  return (
    <div className="answer-card">
  <h4>{answer.content}</h4>
  <p>作者: {answer.author}</p>
  <div className="like-container">
    <button className="like-button">like</button>
    <p>{answer.likeNum.length} 人</p>
  </div>
</div>
  );
};

export default Answer;
