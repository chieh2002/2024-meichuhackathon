import * as uuid from 'uuid'

import * as messageRepo from '../repo/message'
import { Message, MessageBody } from '../types/message'

export const getAllMessages: () => Promise<Message[]> = async () => {
  return messageRepo.getAllMessages()
}

export const getTypeMessages: (BroadType: String) => Promise<Message[]> = async (BroadType) => {
  return messageRepo.getBroadMessages(BroadType)
}

export const getAnswer: (questionId: String) => Promise<Message[]> = async (questionId) => {
  return messageRepo.getAnswer(questionId)
}

export const addMessage: (messageBody: MessageBody) => Promise<Message> = async (messageBody) => {
  const message: Message = {
    ...messageBody,
    messageId: uuid.v4(),
    createdAt: new Date(),
  }
  return messageRepo.createMessage(message)
}


export const addQuestion: (messageBody: MessageBody) => Promise<Message> = async (messageBody) => {
  const message: Message = {
    ...messageBody,
    messageId: uuid.v4(),
    createdAt: new Date(),
    mesgType: 'question',
    questionID: ''
  }
  return messageRepo.createMessage(message)
}
export const addAnswer: (messageBody: MessageBody) => Promise<Message> = async (messageBody) => {
  const message: Message = {
    ...messageBody,
    messageId: uuid.v4(),
    createdAt: new Date(),
    mesgType: 'answer',
   
  }
  return messageRepo.createMessage(message)
}


export const likeArticle = (userId: String, messageId: String): Promise<void> => {
  return messageRepo.likeArticle(userId, messageId).catch((error) => {
    console.error('Error liking the article:', error);
    throw error;
  });
}