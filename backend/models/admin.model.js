import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    collegeName: {
      type: String,
      required: true,
    },
    institutionType: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
      default: null,
    },
    // college: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "CollegeRegistration",
    //   required: true,
    // },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    drivers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
