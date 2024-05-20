const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required: true,
        // unique:true,
        minlength:4
    },
    userpassword: {
        type: String,
        required: true,
        minlength:4
    },

},{
    timestamps: true
});

const userModel = new mongoose.model('users',userSchema);

module.exports = userModel;