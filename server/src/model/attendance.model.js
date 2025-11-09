import mongoose, { Schema, Types } from "mongoose";

const attendanceSchema = new Schema(
  {
    class: {
      type: Types.ObjectId,
      ref: "class",
      required: true,
    },
    period: {
      type: Number,
      required: false,
    },
    record: [
      {
        student: {
          type: Types.ObjectId,
          ref: "student",
          required: true,
        },
        status: {
          type: String,
          enum: ["present", "absent", "late"],
          required: true,
        },
      },
    ],
    sub_teacher: {
      type: Types.ObjectId,
      ref: "teacher",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    session: {
      type: Types.ObjectId,
      ref: "session",
      required: true,
    },
  },
  { timestamps: true }
);

const attendanceModel =
  mongoose.models.attendance || mongoose.model("attendance", attendanceSchema);

export default attendanceModel;
