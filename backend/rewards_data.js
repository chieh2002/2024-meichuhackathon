const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/rewards', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const rewardSchema = new mongoose.Schema({
    name: String,
    cost: Number,
    image: String,  // 每个奖品可以有一个图片的 URL
    interest: String,
    type: { type: String, enum: ['redeem', 'gacha'], default: 'redeem' } // 添加類型屬性
  });
  
  const Reward = mongoose.model('Reward', rewardSchema);

// 读取 rewards.json 文件
const rewardsFilePath = path.join(__dirname, 'rewards.json');
const rewardsData = JSON.parse(fs.readFileSync(rewardsFilePath, 'utf-8'));

// 扁平化数据并将 interest 属性加入每个奖品
const allRewards = [];
Object.keys(rewardsData).forEach(interest => {
  rewardsData[interest].forEach(reward => {
    reward.interest = interest;  // 添加兴趣分类到每个奖品
    allRewards.push(reward);
  });
});

// 将处理后的数据插入到 MongoDB
async function insertRewards() {
    try {
      const docs = await Reward.insertMany(allRewards);  // 使用 Promise 形式
      console.log('Rewards inserted into MongoDB:', docs);
    } catch (err) {
      console.error('Error inserting rewards:', err);
    } finally {
      mongoose.connection.close();  // 关闭数据库连接
    }
  }
  
  // 调用插入函数
  insertRewards();