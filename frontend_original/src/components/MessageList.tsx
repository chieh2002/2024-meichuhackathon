import { Card } from 'antd'
import React from 'react'
import { Message } from '../types/message'
import dayjs from 'dayjs'

interface MessageListProps {
  messages: Message[]
}

const dateStringFormat = (dateString: string) => dayjs(dateString).format('YYYY-MM-DD HH:mm:ss')

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <Card size={'small'} style={{ marginTop: '1em' }} key={message.messageId}>
          <span style={{ fontWeight: 'bold' }}>{message.author}</span>
          <p style={{ paddingLeft: '1em', whiteSpace: 'pre-wrap' }}>{message.content}</p>
          <p style={{ textAlign: 'right' }}>{dateStringFormat(message.createdAt)}</p>
        </Card>
      ))}
    </div>
  )
}

export default MessageList
