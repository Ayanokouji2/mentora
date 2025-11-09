import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const teacherSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female", "other"],
		},
		subject: {
			type: [String],
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		address: {
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
		isClassTeacher: {
			type: Boolean,
			default: false,
		},
		userRole: {
			type: String,
			default: "teacher",
		},
		teacherId: {
			type: String,
      required: true,
			unique: true,
		}
	},
	{ timestamps: true }
);

teacherSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	const hashpassword = await bcrypt.hash(this.password, 10);

	this.password = hashpassword;
	next();
});


const teacherModel =
	mongoose.models.teacher || mongoose.model("teacher", teacherSchema);


export default teacherModel;
