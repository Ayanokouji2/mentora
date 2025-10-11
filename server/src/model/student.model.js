import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    reg_no: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    roll: {
      type: String,
      required: true,
    },
    class_name: {
      type: String,
      required: false,
    },
    section: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: {
        public_id: String,
        secure_url: String,
      },
      required: false,
      default: null,
    },
    password: {
      type: String,
      min: [8, "Password must be at least 4 characters"],
      max: [20, "Password must be at most 20 characters"],
      select: false,
    },
    userRole:{
      type: String,
      default: "student"
    }
  },
  { timestamps: true }
);

const studentModel =
  mongoose.models.student || mongoose.model("student", studentSchema);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default studentModel;
