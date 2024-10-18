import React from 'react';

function RewardsList({ rewards, onRedeem }) {
  return (
    <div className="rewards-list">
      {rewards.map((reward, index) => (
        <div className="reward-card" key={index}>
          <img src={reward.image} alt={reward.name} />
          <h4>{reward.name}</h4>
          <p>{reward.cost} 點</p>
          <button onClick={() => onRedeem(reward)}>兌換</button>
        </div>
      ))}
    </div>
  );
}

export default RewardsList;
