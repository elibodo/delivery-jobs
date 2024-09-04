import { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  numOfHires: {
    type: String,
    //required: [true, "Number of hires is required."],
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
  jobtype: {
    type: String,
    //required: [true, "Job type not selected"],
  },
  jobformat: {
    type: String,
    //required: [true, "Job option not selected"],
  },
  shifttype: {
    type: String,
    //required: [true, "Shift type not selected"],
  },
  experiencerequired: {
    type: String,
    //required: [true, "Experience is required"],
  },
  shifttime: {
    type: String,
  },
  workdays: {
    type: Array,
  },
  payrange: {
    type: Array,
  },
  additionalpay: {
    type: Number,
    //required: [true, "Additional pay is required"],
  },
  benefits: {
    type: Array,
    //required: [true, "Benfits are required"],
  },
  resume: {
    type: String,
    //required: [true, "Resume is required"],
  },
  drugtest: {
    type: String,
    //required: [true, "drug test option is required"],
  },
  backgroundcheck: {
    type: String,
  },
  dotcard: {
    type: String,
  },
  emailupdates: {
    type: String,
    //required: [true, "Email is required"],
  },
  applicants: {
    type: Array,
  },
  deniedApplicants: {
    type: Array,
  },
  companyName: {
    type: String,
  },
  clicks: {
    type: Number,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

const Job = models.Job || model("Job", JobSchema);

export default Job;
