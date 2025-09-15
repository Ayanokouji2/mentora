import mongoose, { Schema, Types } from "mongoose";

const classSchema = new Schema(
  {
    class_name: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
      enum: ["A", "B", "C", "D", "E"],
      default: "A",
    },
  },
  { timestamps: true }
);

const classModel =
  mongoose.models.class || mongoose.model("class", classSchema);

export default classModel;
