import React from 'react';
import SearchSection from '../components/SearchSection';
import TechBoard from '../components/TechBoard';

const TechBoardPage: React.FC = () => {
  return (
    
    <div className="home-container">
      <SearchSection boardType="Tech" />
      <div className="questions-list">
        <TechBoard /> {/* 只渲染 TechBoard */}
      </div>
    </div>

  );
};

export default TechBoardPage;
