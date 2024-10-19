import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GachaMachine from './components/GachaMachine';
import RewardsList from './components/RewardsList';
import Survey from './components/survey';  // 引入问卷组件
import RedeemedModal from './components/RedeemedModal';
import AllRewardsModal from './components/AllRewardsModal';
import './App.css';

function App() {
  const [points, setPoints] = useState(0);
  const [redeemedRewards, setRedeemedRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState([]);
  const [allRewards, setAllRewards] = useState([]);
  const [redeemedModalVisible, setRedeemedModalVisible] = useState(false);
  const [allRewardsModalVisible, setAllRewardsModalVisible] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);  // 新增一个状态用于控制问卷显示

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
        if (response.data && Array.isArray(response.data.rewards)) {
          setRewards(response.data.rewards);
        } else {
          console.error('Error: Invalid rewards data format', response.data);
          setRewards([]);
        }
      } catch (error) {
        console.error('Error fetching rewards:', error);
        setRewards([]);
      }
    };

    const fetchAllRewards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/allrewards');
        if (response.data && Array.isArray(response.data.allrewards)) {
          setAllRewards(response.data.allrewards);
        } else {
          console.error('Error: Invalid allrewards data format', response.data);
          setAllRewards([]);
        }
      } catch (error) {
        console.error('Error fetching all rewards:', error);
        setAllRewards([]);
      }
    };

    fetchUserData();
    fetchRewards();
    fetchAllRewards();
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
      }
    } catch (error) {
      console.error('Error playing gacha:', error);
    }
  };

  // 用于切换问卷显示的函数
  const toggleSurvey = () => {
    setShowSurvey(!showSurvey);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">剩餘點數: {points}</h1>
      </header>

      {/* <div className="panal"></div> */}
      <div className="gacha-container">
        <GachaMachine onGacha={handleGacha} />
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
      {allRewardsModalVisible && (
        <AllRewardsModal
          onRedeem={handleRedeem}
          rewards={allRewards}
          onClose={() => setAllRewardsModalVisible(false)}
        />
      )}
    </div>
  );
}

export default App;
