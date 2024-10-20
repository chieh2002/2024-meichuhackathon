export type Message = {
  messageId: string
  content: string
  author: string
  createdAt: Date
  mesgType: string
  questionID: string
  likeNum: object
  hashtag: object
  broadType: string
}
export type User = {
  userId: string
  likearticle: object
  task_accept_list: object
}
export type MessageBody = Omit<Message, 'messageId' | 'createdAt'>

