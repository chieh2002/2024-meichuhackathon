export type Message = {
  messageId: string
  content: string
  author: string
  createdAt: string
}

export type MessageBody = Omit<Message, 'messageId' | 'createdAt'>
