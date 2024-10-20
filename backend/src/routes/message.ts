import { FastifyInstance, RouteShorthandOptions} from 'fastify'
import fastifyCors from '@fastify/cors';
import { addMessage, getAllMessages, getTypeMessages, getAnswer, addQuestion, addAnswer, likeArticle} from '../services/message'
import { MessageBody } from '../types/message'
import {createUser} from '../repo/test'

import { getAllTasks, getTypeTasks, getTaskDetail, addTaskToUserAcceptList } from '../services/task';


export const MessageRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  server.register(fastifyCors, {
    origin: true,  // 允許所有來源
  });
  server.get('/api/v1/test', async (request, reply) => {
    try {
      const messages = await createUser()
      return reply.status(200).send({ messages })
    } catch (error) {
      server.log.error(`Failed to get messages: ${error}`)
      return reply.status(500).send({ error })
    }
  })
  server.get('/api/v1/messages', async (request, reply) => {
    try {
      const messages = await getAllMessages()
      return reply.status(200).send({ messages })
    } catch (error) {
      server.log.error(`Failed to get messages: ${error}`)
      return reply.status(500).send({ error })
    }
  })
  server.post<{ Body: MessageBody }>('/api/v1/messages', async (request, reply) => {
    try {
      const messageBody = request.body
      const message = await addMessage(messageBody)
      return reply.status(201).send({ message })
    } catch (error) {
      server.log.error(`Failed to add message: ${error}`)
      return reply.status(500).send({ error })
    }
  })
  server.post('/api/v1/open_broad', async (request, reply) => {
    try {
      const {broadType} = request.body as {broadType: String}
      console.log(broadType)
      const messages = await getTypeMessages(broadType)
      return reply.status(200).send({ messages })
    } catch (error) {
      server.log.error(`Failed to get messages: ${error}`)
      return reply.status(500).send({ error })
    }
  })
  // get lists of answers article
  server.post('/api/v1/getanswers', async (request, reply) => {
    try {
      const {questionId} = request.body as {questionId: String}
      const messages = await getAnswer(questionId)

      return reply.status(200).send({ messages })
    } catch (error) {
      server.log.error(`Failed to get messages: ${error}`)
      return reply.status(500).send({ error })
    }
  })

  // add question article
  server.post<{ Body: MessageBody }>('/api/v1/addquestion', async (request, reply) => {
    try {
      const messageBody = request.body
      const message = await addQuestion(messageBody)
      return reply.status(201).send({ message })
    } catch (error) {
      server.log.error(`Failed to add message: ${error}`)
      return reply.status(500).send({ error })
    }
  })

   // add answer article
  server.post<{ Body: MessageBody }>('/api/v1/addAnswer', async (request, reply) => {
    try {
      const messageBody = request.body
      const message = await addAnswer(messageBody)
      return reply.status(201).send({ message })
    } catch (error) {
      server.log.error(`Failed to add message: ${error}`)
      return reply.status(500).send({ error })
    }
  })


  // user likes article
  server.post('/api/v1/userlikearticle', async (request, reply) => {
    try {
      const{userId, messageId} = request.body as {userId: String, messageId: String}
      const message = await likeArticle(userId, messageId)
      return reply.status(201).send({ message })
    } catch (error) {
        server.log.error(`Failed to add message: ${error}`)
      return reply.status(500).send({ error })
    }
  })
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
  
  done()
}
