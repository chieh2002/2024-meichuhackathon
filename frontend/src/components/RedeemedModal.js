import React from 'react';

function RedeemedModal({ redeemedRewards, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>已兌換的獎品</h3>
        <ul>
          {redeemedRewards.map((reward, index) => (
            <li key={index}>
              {reward.name} - {reward.cost} 點 - 兌換時間：{new Date(reward.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>關閉</button>
      </div>
    </div>
  );
}

export default RedeemedModal;
