import axios from 'axios'
import { Message, MessageBody } from '../types/message'

export const getMessages: () => Promise<Message[]> = async () => {
  const response = await axios.get('/api/v1/messages')
  const messages = response.data['messages']
  return messages
}

export const addMessage: (message: MessageBody) => Promise<Message> = async (message) => {
  const response = await axios.post('/api/v1/messages', message)
  const newMessage = response.data['message']
  return newMessage
}
