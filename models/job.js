import { Schema, model, models } from "mongoose";
import { stringify } from "postcss";

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
  workauthorization: {
    type: String,
    required: [true, "Work Authorization not selected"],
  },
  //relocate: {
  //  type: String,
  //  required: [true, "Relocating information not selected"],
  //},
  jobtype: {
    type: String,
    required: [true, "Job type not selected"],
  },
  jobformat: {
    type: String,
    required: [true, "Job option not selected"],
  },
  shifttype: {
    type: String,
    required: [true, "Shift type not selected"],
  },
  experiencerequired: {
    type: String,
    required: [true, "Experience is required"],
  },
  additionalpay: {
    type: Number,
    required: [true, "Additional pay is required"],
  },
  benefits: {
    type: Array,
    required: [true, "Benfits are required"],
  },
  resume: {
    type: String,
    required: [true, "Resume is required"],
  },
  drugtest: {
    type: String,
    required: [true, "drug test option is required"],
  },
  emailupdates: {
    type: String,
    required: [true, "Email is required"],
  },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
