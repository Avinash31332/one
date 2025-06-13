import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: String,
    phone: {
      type: String,
      required: false,
      unique: false,
    },
    password: String,
    branch: String,
    academicYear: {
      type: String,
      required: false,
    },
    institutionType: {
      type: String,
      required: false,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
