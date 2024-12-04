const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type:String,
        required:true,
        maxLength:100
    },
    description:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:true,
        default:'TO DO'
    },
    priority:{
        type:String,
        required:true
    },
    dueDate:{
        type:Date,
        required:false
    }
},
{
    timestamps:true,
    versionKey:false
});

const userModel = new mongoose.model('javascript',taskSchema);
module.exports = userModel;