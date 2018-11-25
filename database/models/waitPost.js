const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let waitPost=Schema({
    "idx":{type:Number,require:true,unique:true},
    "content":{type:String, require:true, unique:false},
    "writeDate":{type:Date,require:true,default:Date.now},
    "type":{type:Number, require:true, unique:false},
    "images":{type:[String],require:false},
    "writerPicture":{type:String,require:false},
    "writerName":{type: String, require:false},
    "writerUrl":{type:String, require:false},
    "personalString": {type: String, require: true},
    "isChange": {type: Boolean, require: false, default: false},
    },
    {
        collection:"waitPost"
    }
);
module.exports=mongoose.model('waitPost',waitPost);