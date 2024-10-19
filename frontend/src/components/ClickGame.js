import React, { useState } from 'react';
import axios from 'axios';
import './ClickGame.css'; // 自定義樣式

function ClickGame({ points, setPoints }) {
  const [clickScore, setClickScore] = useState(0);

  const handleImageClick = async () => {
    // 每次點擊增加 1 分
    const newScore = clickScore + 1;
    setClickScore(newScore);

    // 如果分數達到 1000 分，增加用戶點數
    if (newScore >= 1000) {
      try {
        const response = await axios.post('http://localhost:5000/api/update-points', { points: 10 });
        if (response.data.success) {
          setPoints(response.data.points); // 更新用戶的點數
          alert('恭喜！你已經獲得 10 點數！');
        }
      } catch (error) {
        console.error('Error updating points:', error);
        alert('更新點數時出錯，請稍後再試');
      }

      // 重置分數
      setClickScore(0);
    }
  };

  return (
    <div className="game-container">
      <h2>點擊遊戲</h2>
      <p>當前分數: {clickScore}</p>
      <p>當前用戶點數: {points}</p>
      <div className="clickable-image" onClick={handleImageClick}>
        <img src="/path-to-your-image.png" alt="點擊獲得分數" />
      </div>
    </div>
  );
}

export default ClickGame;
