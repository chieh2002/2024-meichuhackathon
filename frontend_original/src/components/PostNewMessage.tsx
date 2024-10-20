import React, { useState } from 'react'
import { Modal, Button, Input, Form, message as notifyMessage, FormProps } from 'antd'
import { addMessage } from '../services/message'
import { MessageBody } from '../types/message'

interface PostNewMessageProps {
  onMessagePosted: () => void
}

type FieldType = {
  author: string
  content: string
}

const PostNewMessage: React.FC<PostNewMessageProps> = ({ onMessagePosted }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [notifyMessageApi, contextHolder] = notifyMessage.useMessage()
  const [form] = Form.useForm<FieldType>()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const messageBody: MessageBody = {
      author: values.author,
      content: values.content
    }
    addMessage(messageBody)
      .then(() => {
        form.resetFields()
        setIsModalVisible(false)
        notifyMessageApi.success('Message posted!')
        onMessagePosted()
      })
      .catch((error) => {
        console.error('Failed to post message', error)
        notifyMessageApi.error('Failed to post message')
      })
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div style={{ textAlign: 'right' }}>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Post New Message
      </Button>
      <Modal title="Post New Message" open={isModalVisible} footer={<></>}>
        <Form form={form} initialValues={{ author: '', content: '' }} autoComplete={'off'} onFinish={onFinish}>
          <Form.Item label="Author" name="author" labelCol={{ span: 4 }}>
            <Input required />
          </Form.Item>
          <Form.Item label="Content" name="content" labelCol={{ span: 4 }}>
            <Input.TextArea rows={5} required />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Post
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PostNewMessage
