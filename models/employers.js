import { rewrites } from "@next.config";
import { Schema, model, models } from "mongoose";

const EmployerSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    name: {
      type: String,
      required: [true, "Username is required!"],
    },
    company: {
      type: String,
      required: [true, "Username is required!"],
    },
    password: {
      type: String,
      required: [true, "Username is required!"],
    },
  },
  { timestamps: true }
);

const Employer = models.Employer || model("Employer", EmployerSchema);

export default Employer;
