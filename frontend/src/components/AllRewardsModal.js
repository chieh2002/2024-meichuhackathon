import React, { useState } from 'react';

function AllRewardsModal({ rewards, onClose }) {
  const [searchTerm, setSearchTerm] = useState(''); // 用于存储搜索关键字

  // 根据搜索关键字过滤奖项
  const filteredRewards = rewards.filter(reward =>
    reward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>所有獎項</h2>

        {/* 搜索输入框 */}
        <input
          type="text"
          placeholder="搜索獎項..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '100%', marginBottom: '20px' }} // 样式可根据需求调整
        />

        {/* 显示过滤后的奖项 */}
        <div className="rewards-list">
          {filteredRewards.length > 0 ? (
            filteredRewards.map((reward, index) => (
              <div className="reward-item" key={index}>
                <img src={reward.image} alt={reward.name} />
                <h4>{reward.name}</h4>
                <p>{reward.cost} 點</p>
              </div>
            ))
          ) : (
            <p>沒有找到符合的獎項</p> // 如果没有匹配的奖项，显示提示
          )}
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="modal">
  //     <div className="modal-content">
  //       <h3>所有獎項</h3>
  //       {/* 這裡可以展示更多的所有獎項信息 */}
  //       <button onClick={onClose}>關閉</button>
  //     </div>
  //   </div>
  // );
}

export default AllRewardsModal;
