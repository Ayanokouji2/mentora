import mongoose, { Schema } from 'mongoose';


const sessionModel = new Schema({
    name:{
        type:String,
        required : true
    },
    startDate :{
        type: Date,
        required : true
    },
    endDate : {
        type: Date,
        required : true
    },
    isActive:{
        type: Boolean,
        default : true
    }
});

const SessionModel = mongoose.models.session || mongoose.model("session", sessionModel)


export default SessionModel;