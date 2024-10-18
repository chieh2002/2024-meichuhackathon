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
  image: String  // 每个奖品可以有一个图片的 URL
});

const Reward = mongoose.model('Reward', rewardSchema);

// 定義用戶的 Schema 和 Model
const userSchema = new mongoose.Schema({
  _id: { type: String },
  points: { type: Number, default: 100 }, // 初始化点数为 100
  redeemedRewards: [{ name: String, cost: Number, date: Date }]
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
      user = new User({ _id: userId, points: 100, redeemedRewards: [] });
      await user.save();
    }
    reply.send(user);
  } catch (error) {
    fastify.log.error('Cannot find user:', error.stack);
    reply.code(500).send({ error: '500 server error' });
  }
});

// 查詢所有獎品的 API
fastify.get('/api/rewards', async (request, reply) => {
  try {
    const rewards = await Reward.find();
    reply.send(rewards);
  } catch (error) {
    fastify.log.error('Cannot fetch rewards:', error.stack);
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

    // if (user.points < 10) {  // 假設每次抽獎需要 10 點
    //   reply.send({ success: false, message: 'Not enough points to play gacha' });
    //   return;
    // }

    // 查找所有的獎品，從中隨機選擇一個
    const rewards = await Reward.find();
    if (rewards.length === 0) {
      reply.send({ success: false, message: 'No rewards available' });
      return;
    }

    // 隨機選擇一個獎品
    const randomIndex = Math.floor(Math.random() * rewards.length);
    const selectedReward = rewards[randomIndex];

    // 扣除點數，保存抽中的獎品
    // user.points -= 10;  // 每次抽獎扣除 10 點
    // user.redeemedRewards.push({ name: selectedReward.name, cost: 0, date: new Date() }); // 抽奖的奖品不再扣除额外点数
    // await user.save();

    reply.send({ success: true, reward: selectedReward.name, points: user.points });
  } catch (error) {
    fastify.log.error('Fail to play gacha:', error.stack);
    reply.code(500).send({ error: '500 server error' });
  }
});

// 初始化獎品數據的 API（僅用於初始化或添加獎品）
fastify.post('/api/add-reward', async (request, reply) => {
  const { name, cost, image } = request.body;
  try {
    const reward = new Reward({ name, cost, image });
    await reward.save();
    reply.send({ success: true, message: 'Reward added successfully' });
  } catch (error) {
    fastify.log.error('Fail to add reward:', error.stack);
    reply.code(500).send({ error: '500 server error' });
  }
});

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
