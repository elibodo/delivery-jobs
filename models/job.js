import { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  dispatchlocation: {
    type: String,
    required: [true, "Dispatch Location is required."],
  },
  deliverylocation: {
    type: String,
    required: [true, "Delivery Location is required."],
  },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
