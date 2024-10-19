// import React, { useState } from 'react';

// function AllRewardsModal({ rewards, onClose, onRedeem }) {

//   const [searchTerm, setSearchTerm] = useState(''); // 用于存储搜索关键字
//   const [selectedInterest, setSelectedInterest] = useState('all'); // 选择的兴趣类型

//   // 根据搜索关键字和兴趣类型过滤奖项
//   const filteredRewards = rewards.filter(reward => {
//     return (selectedInterest === 'all' || reward.interest.toLowerCase() === selectedInterest.toLowerCase()) &&
//            reward.name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <button className="close-button" onClick={onClose}>X</button>
//         <h2>所有獎項</h2>

//         {/* 搜索输入框 */}
//         <input
//           type="text"
//           placeholder="搜索獎項..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
//         />

//         {/* 兴趣类型下拉选单 */}
//         <select 
//           value={selectedInterest}
//           onChange={(e) => setSelectedInterest(e.target.value)}
//           className="interest-filter-select"
//           style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
//         >
//           <option value="all">顯示所有</option>
//           <option value="Outdoor Junkies">戶外探險</option>
//           <option value="Fitness Gurus">健身愛好者</option>
//           <option value="Creative Souls">創意靈魂</option>
//           {/* 添加更多興趣選項 */}
//         </select>

//         {/* 显示过滤后的奖项 */}
//         <div className="rewards-list">
//           {filteredRewards.length > 0 ? (
//             filteredRewards.map((reward, index) => (
//               <div className="reward-item" key={index}>
//                 <img src={reward.image}  style={{ width: '150px', height: '27px' }} />
//                 <p>{reward.cost} 點</p>
//                 <button onClick={() => onRedeem(reward)}>兌換</button>
//               </div>
//             ))
//           ) : (
//             <p>沒有找到符合的獎項</p> // 如果没有匹配的奖项，显示提示
//           )}
//         </div>
//       </div>
//     </div>
//   );
//   // return (
//   //   <div className="modal">
//   //     <div className="modal-content">
//   //       <button className="close-button" onClick={onClose}>X</button>
//   //       <h2>所有獎項</h2>

//   //       {/* 搜索输入框 */}
//   //       <input
//   //         type="text"
//   //         placeholder="搜索獎項..."
//   //         value={searchTerm}
//   //         onChange={(e) => setSearchTerm(e.target.value)}
//   //         style={{ padding: '10px', width: '100%', marginBottom: '20px' }} // 样式可根据需求调整
//   //       />

//   //       {/* 显示过滤后的奖项 */}
//   //       <div className="rewards-list">
//   //         {filteredRewards.length > 0 ? (
//   //           filteredRewards.map((reward, index) => (
//   //             <div className="reward-item" key={index}>
//   //               <img src={reward.image} alt={reward.name} />
//   //               <h4>{reward.name}</h4>
//   //               <p>{reward.cost} 點</p>
//   //             </div>
//   //           ))
//   //         ) : (
//   //           <p>沒有找到符合的獎項</p> // 如果没有匹配的奖项，显示提示
//   //         )}
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
//   // // return (
//   // //   <div className="modal">
//   // //     <div className="modal-content">
//   // //       <h3>所有獎項</h3>
//   // //       {/* 這裡可以展示更多的所有獎項信息 */}
//   // //       <button onClick={onClose}>關閉</button>
//   // //     </div>
//   // //   </div>
//   // // );
// }

// export default AllRewardsModal;
import React, { useState } from 'react';

function AllRewardsModal({ rewards, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');  // 用于存储搜索关键字
  const [selectedInterest, setSelectedInterest] = useState('');  // 用于存储选择的兴趣类型

  // 根据搜索关键字和兴趣类型过滤奖品
  const filteredRewards = rewards.filter(reward => {
    const matchesInterest = selectedInterest ? reward.interest === selectedInterest : true;
    const matchesSearchTerm = reward.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesInterest && matchesSearchTerm;
  });
  console.log('Rewards data in AllRewardsList:', rewards); // 调试日志

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
          style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
        />

        {/* 兴趣类型选择框 */}
        <select
          value={selectedInterest}
          onChange={(e) => setSelectedInterest(e.target.value)}
          style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
        >
          <option value="">所有類別</option>
          <option value="Outdoor Junkies">戶外狂熱者</option>
          <option value="Fitness Gurus">健身達人</option>
          <option value="Creative Souls">創意靈魂</option>
          <option value="Food Explorers">美食探索者</option>
          <option value="Diehard Sports Fans">運動狂熱分子</option>
          <option value="Gamer at Heart">骨灰級遊戲玩家</option>
          <option value="Globetrotters">環球旅行者</option>
          <option value="Music Junkies">音樂狂迷</option>
          <option value="Tech Geeks">科技狂人</option>
          <option value="Book Lovers">書籍愛好者</option>
          <option value="Movie Buffs">電影狂熱者</option>
          <option value="Pet Parents">寵物爸媽</option>
          <option value="Style Enthusiasts">時尚潮人</option>
          <option value="Eco Warriors">環保鬥士</option>
          <option value="Social Butterflies">社交蝴蝶</option>
          <option value="Health Trackers">健康數據狂</option>
          <option value="Thrill Seekers">刺激挑戰者</option>
          <option value="Mindfulness Advocates">正念擁護者</option>
          <option value="DIY Creators">手作創作者</option>
          <option value="Community Heroes">社區英雄</option>


          {/* 根据需要添加更多兴趣选项 */}
        </select>

        {/* 显示过滤后的奖品 */}
        <div className="allrewards-list">
          {filteredRewards.length > 0 ? (
            filteredRewards.map((reward, index) => (
              <div className="allreward-item" key={index}>
                <img src={reward.image} alt={reward.name} style={{ width: '187px', height: '34px' }} />
                {/* <h4>{reward.name}</h4> */}
                <p>{reward.cost} 點</p>
                <button onClick={() => alert(`兌換 ${reward.name}`)}>兌換</button>
              </div>
            ))
          ) : (
            <p>沒有找到符合條件的獎項</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllRewardsModal;
