import React from 'react';
import { useNavigate } from 'react-router-dom';

interface QuestionProps {
  question: {
    messageId: string;
    content: string;
    author: string;
    hashtag: string[];
  };
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const navigate = useNavigate();
 console.log(question)
  const handleClick = () => {
    navigate(`/question/${question.messageId}`, {
      state: { 
        messageId: question.messageId,
        content: question.content,
        author: question.author,
        hashtag: question.hashtag,
        

      },
    });
  };

  return (
    <div className="question-card2">
    <h3>{question.content}</h3>
    <p>作者: {question.author}</p>
    <p>標籤: {question.hashtag.join(', ')}</p>
    </div>

  );
};

export default Question;
