import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    accountType: {
      type: String,
    },
    name: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    email: {
      type: String,
      unique: [true, "Email already exists!"],
    },
    password: {
      type: String,
      required: [true, "Username is required!"],
    },
    chats: {
      type: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
      default: [],
    },
  },
  { timestamps: true },
);

const User = models.User || model("User", UserSchema);

export default User;
