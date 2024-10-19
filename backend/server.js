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
  type: { type: String, enum: ['redeem', 'gacha'], default: 'redeem' } // 添加類型屬性
});

const Reward = mongoose.model('Reward', rewardSchema);

// 定義用戶的 Schema 和 Model
const userSchema = new mongoose.Schema({
  _id: { type: String },
  points: { type: Number, default: 100 }, // 初始化点数为 100
  redeemedRewards: [{ name: String, cost: Number, date: Date }],
  interests: [{ type: String , default: "Style Enthusiasts"}]
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
    fastify.log.info(`Remaining rewards: ${JSON.stringify(remainingRewards)}`);

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

//  查詢所有抽獎獎品的 API
fastify.get('/api/gacha-rewards', async (request, reply) => {
  try {
    const gachaRewards = await Reward.find({ type: 'gacha' });  // 查找所有抽獎獎品
    reply.send(gachaRewards);
  } catch (error) {
    fastify.log.error('Cannot fetch gacha rewards:', error.stack);
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
fastify.post('/api/gacha', async (request, reply) => {
  try {
    let user = await User.findById(userId);
    if (!user) {
      reply.code(404).send({ error: 'User not found' });
      return;
    }

    // 查找所有的獎品，從中隨機選擇一個
    const gachaRewards = await Reward.find({ type: 'redeem' });
    if (gachaRewards.length === 0) {
      reply.send({ success: false, message: 'No gacha rewards available' });
      return;
    }

    // 隨機選擇一個獎品
    const randomIndex = Math.floor(Math.random() * gachaRewards.length);
    const selectedReward = gachaRewards[randomIndex];

    reply.send({ success: true, reward: selectedReward.name, points: user.points });
  } catch (error) {
    fastify.log.error('Fail to play gacha:', error.stack);
    reply.code(500).send({ error: '500 server error' });
  }
});

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
// fastify.post('/api/add-reward', async (request, reply) => {
//   const { name, cost, image, type } = request.body;
//   try {
//     const reward = new Reward({ name, cost, image, type });
//     await reward.save();
//     reply.send({ success: true, message: 'Reward added successfully' });
//   } catch (error) {
//     fastify.log.error('Fail to add reward:', error.stack);
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