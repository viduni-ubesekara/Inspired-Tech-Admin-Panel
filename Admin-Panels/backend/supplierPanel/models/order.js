const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const oredrSchema=new Schema({

    oid:{type:Number,unique:true,required:true},
    supplier:{type:String,required:true},
    date:{type:Date,required:true},
    bname:{type:String,required:true},
    quantity:{type:Number,required:true}

})

const order=mongoose.model("order",oredrSchema);

module.exports = order; 