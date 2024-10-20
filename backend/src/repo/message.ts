import { MessageModel, UserModel }  from '../models/message'
import { Message } from '../types/message'

export const getAllMessages: () => Promise<Message[]> = async () => {
  return MessageModel.find()
}

export const getBroadMessages: (broadType: String) => Promise<Message[]> = async (broadType) => {
  return MessageModel.find({ broadType: broadType, mesgType: "question" })
}

export const getAnswer: (questionId: String) => Promise<Message[]> = async (questionId) => {
  
  return MessageModel.find({ questionID: questionId, mesgType: "answer" })
}

export const createMessage: (message: Message) => Promise<Message> = async (message) => {
  return MessageModel.create(message)
}

// Define the likeArticle function
export const likeArticle: (userId: String, messageId: String) => Promise<void> = async (userId, messageId) => {
  try {
    // Find the user by userId
    const user = await UserModel.findOne({ userId });
    const mesg = await MessageModel.findOne({messageId});

    if (!user) {
      console.log('User not found');
      return;
    }
    if (!mesg) {
      console.log('mesg not found');
      return;
    }
    // Initialize likearticle as an empty array if it doesn't exist
    if (!Array.isArray(user.likearticle)) {
      user.likearticle = [];
    }
    if (!Array.isArray(mesg.likeNum)) {
      mesg.likeNum = [];
    }
    console.log(user.likearticle)
    // Check if the messageId is already in the likearticle list
    if (!user.likearticle.includes(messageId)) {
      // Save the updated user document
      user.likearticle.push(messageId);
      UserModel.updateOne({userId: userId}, {$set: {likearticle: user.likearticle.push(messageId)}});
      console.log(`Message ${messageId} liked by user ${userId}`);
    } else {
      console.log(`Message ${messageId} already liked by user ${userId}`);
    }
    if (!mesg.likeNum.includes(userId)) {
      // Add the messageId to the likearticle list
      // mesg.likeNum.push(userId);

      // Save the updated user document
      // await mesg.save();
      MessageModel.updateOne({messageId: messageId}, {$set:{likearticle: mesg.likeNum.push(userId)}});
      console.log(`Message ${messageId} liked by user ${userId}`);
    } else {
      console.log(`Message ${messageId} already liked by user ${userId}`);
    }
  } catch (error) {
    console.error('Error liking the article:', error);
  }
};

