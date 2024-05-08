import { data } from "autoprefixer";
import { Schema, model, models } from "mongoose";

const JobSeekerAccount = new Schema(
  {
    email: {
      type: String,
    },
    licenseClass: {
      type: String,
    },
    licenseState: {
      type: String,
    },
    licenseExpire: {
      type: Date,
    },
    DOT: {
      type: String,
    },
    DOTExpire: {
      type: Date,
    },
    endorsements: {
      type: Array,
    },
    CDL: {
      type: String,
    },
    twikCard: {
      type: String,
    },
    CDLOption1: {
      type: String,
    },
    CDLOption2: {
      type: String,
    },
    workExperience: {
      type: String,
    },
    experienceArray: {
      type: Array,
    },
    educationLevel: {
      type: String,
    },
    educationDate: {
      type: Date,
    },
    certificates: {
      type: Array,
    },
    carAccident: {
      type: String,
    },
    DUI: {
      type: String,
    },
    ageRange: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

const JobSeeker = models.JobSeeker || model("JobSeeker", JobSeekerAccount);

export default JobSeeker;
