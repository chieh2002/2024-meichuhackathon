// routes/task.js
import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import fastifyCors from '@fastify/cors';
import { getAllTasks, getTypeTasks, getTaskDetail, addTaskToUserAcceptList } from '../services/task';
import { TaskBody } from '../types/task'; // 假設 TaskBody 是從 types 中引入的

export const TaskRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  // 註冊 CORS 中介軟體
  server.register(fastifyCors, {
    origin: true,  // 允許所有來源
  });

  // 獲取所有 task 類型
  server.get('/api/task/v1/tasks', async (request, reply) => {
    try {
      const taskTypes = await getAllTasks(); // 使用 service 中的 getAllTasks
      return reply.status(200).send({ taskTypes });
    } catch (error) {
      server.log.error(`Failed to get task types: ${error}`);
      return reply.status(500).send({ error });
    }
  });

  // 根據 taskType 獲取特定類型的 task 列表
  server.post('/api/task/v1/tasks_by_type', async (request, reply) => {
    try {
      const { taskType } = request.body as { taskType: string }; // 從 body 中獲取 taskType
      const tasks = await getTypeTasks(taskType); // 使用 service 中的 getTypeTasks
      return reply.status(200).send({ tasks });
    } catch (error) {
      server.log.error(`Failed to get tasks by type: ${error}`);
      return reply.status(500).send({ error });
    }
  });

  // 根據 taskId 獲取 task 詳情
  server.post('/api/task/v1/task_detail', async (request, reply) => {
    try {
      const { taskId } = request.body as { taskId: string }; // 從 body 中獲取 taskId
      const task = await getTaskDetail(taskId); // 使用 service 中的 getTaskDetail
      return reply.status(200).send({ task });
    } catch (error) {
      server.log.error(`Failed to get task detail: ${error}`);
      return reply.status(500).send({ error });
    }
  });

  // 將特定 task 加入 user 的接受列表
  server.post('/api/task/v1/accept_task', async (request, reply) => {
    try {
      const { userId, taskId } = request.body as { userId: string, taskId: string }; // 從 body 中獲取 userId 和 taskId
      await addTaskToUserAcceptList(userId, taskId); // 使用 service 中的 addTaskToUserAcceptList
      return reply.status(200).send({ message: `Task ${taskId} added to user ${userId}'s accept list.` });
    } catch (error) {
      server.log.error(`Failed to accept task: ${error}`);
      return reply.status(500).send({ error });
    }
  });

  done();
};
