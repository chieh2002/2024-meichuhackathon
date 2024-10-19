// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';
// import GachaMachine from './components/GachaMachine';
// import PointsDisplay from './components/PointsDisplay';
// import RewardsList from './components/RewardsList';
// import RedeemedModal from './components/RedeemedModal';
// import AllRewardsModal from './components/AllRewardsModal';
// import './App.css';

// function App() {
//   const [points, setPoints] = useState(0);
//   const [redeemedRewards, setRedeemedRewards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [rewards, setRewards] = useState([]);
//   const [redeemedModalVisible, setRedeemedModalVisible] = useState(false);
//   const [allRewardsModalVisible, setAllRewardsModalVisible] = useState(false);
//   const [iconSize, setIconSize] = useState('2x');
//   const navigate = useNavigate();

//   // 當組件加載時，從後端獲取用戶的數據
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/user');
//         setPoints(response.data.points);
//         setRedeemedRewards(response.data.redeemedRewards);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     const fetchRewards = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/rewards');
//         setRewards(response.data);  // 保存奖品数据
//       } catch (error) {
//         console.error('Error fetching rewards:', error);
//       }
//     };

//     fetchUserData();
//     fetchRewards();
//   }, []);

//   // 處理兌換邏輯
//   const handleRedeem = async (reward) => {
//     const response = await axios.post('http://localhost:5000/api/redeem', { reward });
//     if (response.data.success) {
//       setPoints(response.data.points);
//       setRedeemedRewards(response.data.redeemedRewards);
//       alert('兌換成功！');
//     } else {
//       alert('點數不足，無法兌換');
//     }
//   };

//   // 點擊圖標時返回首頁
//   const handleIconClick = () => {
//     navigate('/');  // 導航到首頁
//   };

//   // 當滑鼠移入時，增加圖標大小
//   const handleMouseEnter = () => {
//     setIconSize('3x');
//   };

//   // 當滑鼠移出時，恢復圖標大小
//   const handleMouseLeave = () => {
//     setIconSize('2x');
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="app-container">
//       {/* 回首頁的圖標按鈕 */}
//       <FontAwesomeIcon
//         icon={faArrowRotateLeft}
//         size={iconSize}
//         style={{ margin: '20px', cursor: 'pointer', color: '#B5495B' }}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         onClick={handleIconClick}
//       />

//       {/* 左邊的扭蛋機 */}
//       <GachaMachine />

//       {/* 右側顯示剩餘點數和獎品列表 */}
//       <div className="rewards-container">
//         <PointsDisplay points={points} />
//         <RewardsList rewards={rewards} onRedeem={handleRedeem} />

//         {/* 底部按钮 */}
//         <div className="buttons">
//           <button onClick={() => setRedeemedModalVisible(true)}>已兌換獎項</button>
//           <button onClick={() => setAllRewardsModalVisible(true)}>查詢所有獎項</button>
//         </div>
//       </div>

//       {/* 已兌換獎品的彈出框 */}
//       {redeemedModalVisible && (
//         <RedeemedModal
//           redeemedRewards={redeemedRewards}
//           onClose={() => setRedeemedModalVisible(false)}
//         />
//       )}

//       {/* 查詢所有獎品的彈出框 */}
//       {allRewardsModalVisible && (
//         <AllRewardsModal onClose={() => setAllRewardsModalVisible(false)} />
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GachaMachine from './components/GachaMachine';
import RewardsList from './components/RewardsList';
import RedeemedModal from './components/RedeemedModal';
import AllRewardsModal from './components/AllRewardsModal';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [points, setPoints] = useState(0);
  const [redeemedRewards, setRedeemedRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState([]);
  const [allrewards] = useState([]);

  const [redeemedModalVisible, setRedeemedModalVisible] = useState(false);
  const [allRewardsModalVisible, setAllRewardsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user');
        setPoints(response.data.points);
        setRedeemedRewards(response.data.redeemedRewards);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchRewards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/redeem-rewards');
        console.log('Fetched rewards:', response.data);  // 調試用
        if (response.data && Array.isArray(response.data.rewards)) {
          setRewards(response.data.rewards);  // 確保 rewards 是一個數組
        } else {
          console.error('Rewards data is not in expected format:', response.data);
          setRewards([]);  // 如果數據格式不正確，設置為空數組以防止錯誤
        }
      } catch (error) {
        console.error('Error fetching rewards:', error);
        setRewards([]);  // 出現錯誤時設置為空數組
      }
    };
    const AllRewards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allrewards');
        if (response.data && Array.isArray(response.data.allrewards)) {
          setRewards(response.data.allrewards);  // 设置奖励数据
        } else {
          console.error('Error: Invalid rewards data format', response.data);
          setRewards([]);
        }
      } catch (error) {
        console.error('Error fetching all rewards:', error);
        setRewards([]);
      }
    };

    AllRewards();
    fetchUserData();
    fetchRewards();
  }, []);

  const handleRedeem = async (reward) => {
    try {
      const response = await axios.post('http://localhost:5000/api/redeem', { reward });
      if (response.data.success) {
        setPoints(response.data.points);
        setRedeemedRewards(response.data.redeemedRewards);
        alert('兌換成功！');
      } else {
        alert('點數不足，無法兌換');
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      alert('兌換失敗，請稍後再試');
    }
  };

  const handleGacha = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/gacha');
      if (response.data.success) {
        setPoints(response.data.points);
      } else {
        alert('抽獎失敗，請稍後再試');
      }
    } catch (error) {
      console.error('Error playing gacha:', error);
      alert('抽獎失敗，請稍後再試');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">剩餘點數: {points}</h1>  {/* 顯示剩餘點數 */}
      </header>
      <div className="panal"></div>
      <div className="gacha-container">
          <GachaMachine onGacha={handleGacha} />
          {/* <PointsDisplay points={points} /> */}
      </div>
      <div className="rewards-container">
        <h2>可兌換獎品</h2>
        <RewardsList rewards={rewards} onRedeem={handleRedeem} />
        <div className="buttons">
          <button onClick={() => setRedeemedModalVisible(true)}>已兌換獎項</button>
          <button onClick={() => setAllRewardsModalVisible(true)}>查詢所有獎項</button>
        </div>
      </div>
      {redeemedModalVisible && (
        <RedeemedModal
          redeemedRewards={redeemedRewards}
          onClose={() => setRedeemedModalVisible(false)}
        />
      )}
      {/* 查询所有奖品的 Modal */}
      {allRewardsModalVisible && (
        <AllRewardsModal
          onRedeem={handleRedeem}
          rewards={allrewards}
          onClose={() => setAllRewardsModalVisible(false)}
        />
      )}
    </div>
  );
}

export default App;