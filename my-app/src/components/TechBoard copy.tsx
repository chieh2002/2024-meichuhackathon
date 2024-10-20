import React from 'react';
import Question from './Question';

const TechBoard: React.FC = () => {
    // add api
   
  const questions = [
    { id: 1, title: 'Q1', tags: '#123 #python #human', user: 'User1' },
    { id: 2, title: 'Q2', tags: '#123 #python #human', user: 'User2' },
    { id: 3, title: 'Q3', tags: '#123 #human', user: 'User2' },
  ];

  return (
    <div>
      {questions.map((q) => (
        <Question key={q.id} question={q} />
      ))}
    </div>
  );
};

export default TechBoard;
