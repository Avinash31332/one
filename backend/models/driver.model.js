import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: String,
    password: String,
    phone: {
      type: String,
      required: false,
      unique: false,
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

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
