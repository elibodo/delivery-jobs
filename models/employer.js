import { Schema, model, models } from "mongoose";

const EmployerAccount = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    companyName: {
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
    zipCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Employer = models.Employer || model("Employer", EmployerAccount);

export default Employer;
