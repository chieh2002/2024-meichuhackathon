;import mongoose, { model, Schema } from 'mongoose'

import { Message, User } from '../types/message'

const messageSchema: Schema = new Schema(
  {
    messageId: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    mesgType: {
      type: String,
      required: true
    },
    questionID: {
      type: String,
      required: false
    },
    likeNum: {
      type: Object,
      required: false
    },
    hashtag: {
      type: Object,
      required: false
    },
    broadType: {
      type: String,
      required: false
    }

  },
  {
    timestamps: false
  }
)

messageSchema.set('toJSON', {
  versionKey: false
})

const userSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    likearticle: {
      type: Object,
      required: true
    },
    task_accept_list: {
      type: Object,
      required: true
    }
  },
  {
    timestamps: false
  }
)


userSchema.set('toJSON', {
  versionKey: false
})

export const MessageModel = mongoose.models.message || model<Message>('message', messageSchema);
export const UserModel = mongoose.models.user || model<User>('user', userSchema);