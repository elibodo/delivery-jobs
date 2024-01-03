import { Schema, model, models } from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  companyName: {
    type: String,
    require: false,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
