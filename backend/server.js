const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const cors = require('@fastify/cors');

// 啟用 CORS 以允許前端訪問
fastify.register(cors, {
  origin: '*',  // 允許所有跨域請求
});

// MongoDB 連接設置
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/rewards', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    fastify.log.info('MongoDB successfully connect');
  } catch (err) {
    fastify.log.error('Fail to connect MongoDB:', err);
  }
};

// 定義獎品的 Schema 和 Model
const rewardSchema = new mongoose.Schema({
  name: String,
  cost: Number,
  image: String,  // 每个奖品可以有一个图片的 URL
  interest: String,
  lastGachaTime: { type: Date, default: null },
  type: { type: String, enum: ['redeem', 'gacha'], default: 'redeem' } // 添加類型屬性
});
const Reward = mongoose.model('Reward', rewardSchema);

// 定義抽獎獎品的 Schema 和 Model
const gachaSchema = new mongoose.Schema({
  name: String,
  count: Number,
  bonus: Number,
  type: { type: String, enum: ['points', 'return', 'gifts', 'medal'], default: 'gifts' } // 添加類型屬性
});
const Gacha = mongoose.model('Gacha', gachaSchema);


// 定義用戶的 Schema 和 Model
const userSchema = new mongoose.Schema({
  _id: { type: String },
  points: { type: Number, default: 100 }, // 初始化点数为 100
  redeemedRewards: [{ name: String, cost: Number, date: Date }],
  interests: [{ type: String , default: "Style Enthusiasts"}], 
  lastGachaTime: { type: Date, default: null }
});

const User = mongoose.model('User', userSchema);

// 假設用戶 ID 為 "default_user"
const userId = 'default_user';

// 查詢用戶點數和已兌換獎品的 API
fastify.get('/api/user', async (request, reply) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      // 如果用戶不存在，初始化用戶數據
      user = new User({ _id: userId, points: 100, redeemedRewards: [], interests: [] });
      await user.save();
    }
    reply.send(user);
  } catch (error) {
    fastify.log.error('Cannot find user:', error.stack);
    reply.code(500).send({ error: '500 server error' });
  }
});

// 查詢所有兌換獎品的 API
fastify.get('/api/redeem-rewards', async (request, reply) => {
  try {
    // 假設 userId 代表當前用戶，查詢該用戶的興趣
    let user = await User.findById(userId);
    if (!user || !user.interests || user.interests.length === 0) {
      reply.send({ success: false, message: 'User or interests not found' });
      return;
    }

    fastify.log.info(`User interests: ${user.interests}`);

    // 根据用户兴趣从数据库中查询奖品
    const userInterestRewards = await Reward.find({
      type: 'redeem',
      interest: { $in: user.interests }  // 查询匹配用户兴趣的奖品
    });

    fastify.log.info(`User interest rewards: ${JSON.stringify(userInterestRewards)}`);

    // 查询所有可供兑换的奖品
    const allRedeemableRewards = await Reward.find({ type: 'redeem' });
    fastify.log.info(`All redeemable rewards: ${JSON.stringify(allRedeemableRewards)}`);

    // 排除掉用户兴趣对应的奖品，获取剩余的奖品
    const remainingRewards = allRedeemableRewards.filter(reward => 
      !userInterestRewards.some(interestReward => interestReward.name === reward.name)
    );
    // fastify.log.info(`Remaining rewards: ${JSON.stringify(remainingRewards)}`);

    // 随机选择剩余的奖品，补全到6个
    const randomRemainingRewards = remainingRewards.sort(() => 0.5 - Math.random()).slice(0, 6 - userInterestRewards.length);

    // 合并用户的兴趣奖品和随机选出的剩余奖品
    const finalRewards = [...userInterestRewards, ...randomRemainingRewards];
    fastify.log.info(`Final rewards to return: ${JSON.stringify(finalRewards)}`);
    reply.send({ success: true, rewards: finalRewards });
  } catch (error) {
    fastify.log.error('Cannot fetch redeem rewards:', error.stack);
    reply.code(500).send({ error: '500 server error' });
  }
});

// 查詢所有兌換獎品的 API
fastify.get('/api/allrewards', async (request, reply) => {
  try {
    fastify.log.info('Fetching all rewards...');
    const allRewards = await Reward.find({ type: 'redeem' });  // 查找所有可兌換的獎品
    fastify.log.info(`All rewards fetched: ${JSON.stringify(allRewards)}`);
    reply.send({
      success: true,
      allrewards: allRewards
    });
  } catch (error) {
    fastify.log.error('Cannot fetch all rewards:', error.stack);
    reply.code(500).send({ error: '500 server error' });
  }
});

// 處理兌換獎品的 API
fastify.post('/api/redeem', async (request, reply) => {
  const { reward } = request.body;  // 從前端獲取獎品資料

  try {
    let user = await User.findById(userId);
    if (!user) {
      reply.code(404).send({ error: 'User not found' });
      return;
    }

    const redeemReward = await Reward.findOne({ name: reward.name, type: 'redeem' });
    if (!redeemReward) {
      reply.send({ success: false, message: 'Reward not found or not redeemable' });
      return;
    }

    if (user.points >= reward.cost) {
      // 扣除點數並保存兌換的獎品，记录兑换时间
      user.points -= reward.cost;
      user.redeemedRewards.push({ name: reward.name, cost: reward.cost, date: new Date() });
      await user.save();
      reply.send({ success: true, points: user.points, redeemedRewards: user.redeemedRewards });
    } else {
      reply.send({ success: false, message: 'insufficient points' });
    }
  } catch (error) {
    fastify.log.error('Fail to redeem gifts:', error.stack);
    reply.code(500).send({ error: '500 server error' });
  }
});

// 抽獎 API

// 抽獎 API 修改
fastify.post('/api/gacha', async (request, reply) => {
  try {
    // 获取用户数据
    let user = await User.findById(userId);
    if (!user) {
      reply.code(404).send({ error: 'User not found' });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // 设置为当天的 00:00:00
    const lastGachaTime = user.lastGachaTime ? new Date(user.lastGachaTime) : null;

    let isFirstGachaToday = false;

    // 如果用户从未抽过奖，或者上一次抽奖时间不是今天，视为今天第一次抽奖
    if (!lastGachaTime || lastGachaTime < today) {
      isFirstGachaToday = true;
    }

    // 如果不是今天第一次抽奖，检查用户是否有足够的点数
    if (!isFirstGachaToday && user.points < 80) {
      reply.send({ success: false, message: 'Insufficient points' });
      return;
    }

    // 查找所有可抽的奖品
    const gachaRewards = await Gacha.find();
    fastify.log.info(`Gacha rewards fetched: ${JSON.stringify(gachaRewards)}`);

    if (gachaRewards.length === 0) {
      reply.send({ success: false, message: 'No gacha rewards available' });
      return;
    }

    // 计算总的奖品数量
    const totalQuantity = gachaRewards.reduce((sum, reward) => sum + reward.count, 0);

    if (totalQuantity === 0) {
      reply.send({ success: false, message: 'All rewards are out of stock' });
      return;
    }

    // 生成随机数
    const randomPick = Math.floor(Math.random() * totalQuantity);

    // 根据随机数和权重选择奖品
    let cumulativeCount = 0;
    let selectedReward = null;

    for (let reward of gachaRewards) {
      cumulativeCount += reward.count;
      if (randomPick < cumulativeCount) {
        selectedReward = reward;
        break;
      }
    }

    if (!selectedReward) {
      reply.send({ success: false, message: 'Failed to pick a reward' });
      return;
    }

    // 如果不是今天第一次抽奖，则扣除80点数
    if (!isFirstGachaToday) {
      user.points -= 80;
    }

    // 处理不同类型的奖品
    if (selectedReward.type === 'return') {
      // `return` 类型的奖品，允许用户再次抽奖，但更新奖品数量
      selectedReward.count -= 1;
      if (selectedReward.count === 0) {
        await Gacha.deleteOne({ _id: selectedReward._id });
      } else {
        await selectedReward.save();
      }

      // 更新用户的最后抽奖时间
      user.lastGachaTime = new Date();
      await user.save();

      reply.send({ success: true, reward: selectedReward.name, message: 'You can draw again!', points: user.points });
      return;

    } else if (selectedReward.type === 'points') {
      // `points` 类型的奖品，增加用户的点数，并减少奖品数量
      user.points += selectedReward.bonus; // `bonus` 表示额外获得的点数

      selectedReward.count -= 1;
      if (selectedReward.count === 0) {
        await Gacha.deleteOne({ _id: selectedReward._id });
      } else {
        await selectedReward.save();
      }

      reply.send({ success: true, reward: selectedReward.name, message: `You've earned ${selectedReward.bonus} points!`, points: user.points });
      return;
    }

    // 对于其他类型的奖品，减少数量并保存
    selectedReward.count -= 1;
    if (selectedReward.count === 0) {
      await Gacha.deleteOne({ _id: selectedReward._id });
    } else {
      await selectedReward.save();
    }

    // 更新用户的已兑换奖品
    user.redeemedRewards.push({ name: selectedReward.name, date: new Date() });
    user.lastGachaTime = new Date(); // 更新最后一次抽奖时间

    // 保存用户状态
    await user.save();

    // 返回抽中的奖品
    reply.send({ success: true, reward: selectedReward.name, points: user.points });
  } catch (error) {
    fastify.log.error('Fail to play gacha:', error.stack);
    reply.code(500).send({ error: '500 server error' });
  }
});
{/* <ProfileTwoTone /> */}


// 點擊遊戲
fastify.post('/api/update-points', async (request, reply) => {
  const { points } = request.body;

  try {
    let user = await User.findById(userId);
    if (!user) {
      reply.code(404).send({ error: 'User not found' });
      return;
    }

    // 增加用戶的點數
    user.points += points;
    await user.save();

    reply.send({ success: true, points: user.points });
  } catch (error) {
    fastify.log.error('Error updating points:', error.stack);
    reply.code(500).send({ error: '500 server error' });
  }
});
// 初始化獎品數據的 API（僅用於初始化或添加獎品）
// fastify.post('/api/add-gacha-reward', async (request, reply) => {
//   const { name, count, type } = request.body;
//   try {
//     const reward = new Gacha({ name, count, type });
//     await reward.save();
//     reply.send({ success: true, message: 'Gacha reward added successfully' });
//   } catch (error) {
//     fastify.log.error('Fail to add gacha reward:', error.stack);
//     reply.code(500).send({ error: '500 server error' });
//   }
// });

// 啟動 Fastify 伺服器
const start = async () => {
  try {
    await fastify.listen({ port: 5000, host: 'localhost' });
    fastify.log.info('server is running on http://localhost:5000');
    // 在服務器啟動後連接 MongoDB
    connectDB();
  } catch (error) {
    fastify.log.error('Fail to launch the server:', error.message);  // 紀錄具體錯誤消息
    fastify.log.error(error.stack);  // 打印完整的錯誤堆棧信息
    process.exit(1);
  }
};

start();