import React, { useState } from 'react';
import SearchSection from '../components/SearchSection';
import TechBoard from '../components/TechBoard';
import LifeBoard from '../components/LifeBoard';
import Sidebar from '../components/Sidebar'; // 確保引入 Sidebar

const Home: React.FC = () => {
  const [currentBoard, setCurrentBoard] = useState('tech');

  const switchBoard = (board: string) => {
    setCurrentBoard(board);
  };

  return (
    <div className="home-container">
      <Sidebar currentBoard={currentBoard} switchBoard={switchBoard} /> {/* 將 Sidebar 加入到 Home */}
      <SearchSection />
      <div className="questions-list">
        {currentBoard === 'tech' ? <TechBoard /> : <LifeBoard />} {/* 根據 currentBoard 渲染相應的組件 */}
      </div>
    </div>
  );
};

export default Home;
