import { rewrites } from "@next.config";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    accountType: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, "Email already exists!"],
    },
    name: {
      type: String,
    },

    company: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Username is required!"],
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
