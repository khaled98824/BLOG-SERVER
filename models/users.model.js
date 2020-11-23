const mongoose = require("mongoose");
const Schama = mongoose.Schema;

const User = Schama({
username:{
    type:String,
    required: true,
    unique: true,
},

password:{
    type:String,
    required: true,
},
email:{
    type:String,
    required: true,
},
});


module.exports = mongoose.model("User", User);
