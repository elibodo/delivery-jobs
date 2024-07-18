import { Schema, model, models } from "mongoose";

const EmployerAccount = new Schema(
  {
    email: {
      type: String,
    },
    companyName: {
      type: String,
    },
    companyWebsite: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    City: {
      type: String,
    },
    State: {
      type: String,
    },
    ZipCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Employer = models.Employer || model("Employer", EmployerAccount);

export default Employer;
