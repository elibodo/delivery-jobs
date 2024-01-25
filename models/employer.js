import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  companyname: {
    type: String,
    required: [true, "Company Name is required!"],
  },
});

const EmployerUser = models.EmployerUser || model("EmployerUser", UserSchema);

export default EmployerUser;
