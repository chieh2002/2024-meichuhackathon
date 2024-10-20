import * as dotenv from 'dotenv'
import { FastifyInstance } from 'fastify'

import { serverOf, serverStart } from './server'
import { AppConfig } from './types/appConfig'

dotenv.config()

const server: FastifyInstance = serverOf()
const appConfig: AppConfig = {
  host: process.env.SERVER_HOST || '0.0.0.0',
  port: parseInt(process.env.SERVER_PORT || '8080'),
  mongodbConnectionString: process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/message-board'
}

serverStart(appConfig, server)
