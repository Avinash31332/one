import mongoose from "mongoose";

const collegeRegistrationSchema = new mongoose.Schema(
  {
    collegeName: {
      type: String,
      required: false,
    },
    institutionType: {
      type: String, // School, Intermediate, College
      required: false,
    },
    address: {
      type: String,
      required: false,
      default: null,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const CollegeRegistration = mongoose.model(
  "CollegeRegistration",
  collegeRegistrationSchema
);

export default CollegeRegistration;
