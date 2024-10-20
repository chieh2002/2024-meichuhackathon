import { useEffect, useState } from 'react'
import { Message } from '../types/message'
import { getMessages } from '../services/message'
import MessageList from '../components/MessageList'
import PostNewMessage from '../components/PostNewMessage'

const Board: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const refreshMessages = async () => {
    const messages = await getMessages()
    const sortedMessages = messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    setMessages(sortedMessages)
  }
  useEffect(() => {
    refreshMessages()
  }, [])

  return (
    <div>
      <h1>Message Board</h1>
      <div>
        <PostNewMessage onMessagePosted={refreshMessages} />
        <MessageList messages={messages} />
      </div>
    </div>
  )
}

export default Board
