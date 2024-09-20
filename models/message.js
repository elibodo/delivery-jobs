import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  seenBy: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
});

const Message = models.Message || model("Message", MessageSchema);

export default Message;
