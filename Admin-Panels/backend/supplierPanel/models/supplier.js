const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const supplierSchema=new Schema({

    name:{type:String,required:true},
    nic:{type:String,unique:true,required:true},
    address:{type:String,required:true},
    mobile:{type:Number,required:true},
    email:{type:String,required:true},
    wname:{type:String,required:true}

})

const supplier=mongoose.model("Supplier",supplierSchema);

module.exports = supplier; 