import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
  members: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  messages: {
    type: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
  jobAppliedTo: {
    type: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    default: [],
  },
});

const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;
