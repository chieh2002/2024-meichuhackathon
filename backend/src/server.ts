import fastifyStatic from '@fastify/static'
import fastify, { FastifyInstance } from 'fastify'
import path from 'path'

import { connectToDb } from './plugins/mongoose'
import { MessageRouter } from './routes/message'
import { TaskRouter } from './routes/task'
import { AppConfig } from './types/appConfig'

export const serverOf = () => {
  const server = fastify({ logger: true })
  server.get('/ping', async () => {
    return { message: 'pong!' }
  })
  server.register(fastifyStatic, {
    root: path.resolve(__dirname, '../../frontend/dist'),
    prefix: '/'
  })
  server.register(MessageRouter)
  server.register(MessageRouter, { prefix: '/api/task' });
  
  return server
}

export const serverStart = async (appConfig: AppConfig, server: FastifyInstance) => {
  try {
    await connectToDb(appConfig.mongodbConnectionString)
  } catch (error) {
    server.log.error(`Failed to connect to MongoDB: ${error}`)
    process.exit(1)
  }

  const listenConfig = {
    host: appConfig.host,
    port: appConfig.port
  }

  try {
    await server.listen(listenConfig)
  } catch (error) {
    server.log.error(`Failed to start server: ${error}`)
    process.exit(1)
  }
}
