import { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
  employer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  location: {
    type: String,
    required: [true, "Location is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
