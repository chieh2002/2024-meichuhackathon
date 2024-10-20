import React from 'react';
import SearchSection from '../components/SearchSection';
import LifeBoard from '../components/LifeBoard';

const LifeBoardPage: React.FC = () => {
  return (
    <div className="home-container">
      <SearchSection boardType="Life" />
      <div className="questions-list">
        <LifeBoard /> {/* 只渲染 TechBoard */}
      </div>
    </div>

  );
};

export default LifeBoardPage;
