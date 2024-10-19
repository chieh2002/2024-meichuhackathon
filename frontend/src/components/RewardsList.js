import React from 'react';

function RewardsList({ rewards, onRedeem }) {
  console.log('Rewards data in RewardsList:', rewards); // 调试日志

  // 确保 rewards 是数组，并且不为空
  if (!Array.isArray(rewards) || rewards.length === 0) {
    return <p>目前沒有可用的獎項</p>;
  }

  return (
    <div className="rewards-list">
      {rewards.map((reward, index) => (
        <div className="reward-card" key={index} style={{ textAlign: 'center' }}>
          <img src={reward.image} alt={"圖片"} 
                style={{ width: '150px', height: '27px' }}/>
          {/* <h4>{reward.name}</h4> */}
          <p>{reward.cost} 點</p>
          <button onClick={() => onRedeem(reward)}>兌換</button>
        </div>
      ))}
    </div>
  );
}

export default RewardsList;
