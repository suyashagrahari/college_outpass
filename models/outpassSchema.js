const validator = require("validator")
const mongoose = require("mongoose")



// ****************************** STUDENT SCHEMA ****************************
const outpassSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        lowercase: true,
        validate (value){
            if(!validator.isEmail(value)){
                throw new Error("email is in valid please fill valid email id")
            }
            else{
                console.log("email is  valid");
            }
        }
    },
    name:{
        type:String,
        required : true,
        lowercase:true
    },
    rollno:{
        type: String,
        lowercase:true,
    },
    
    phone:{
        type: String,
        // unique:true,  
        required: true,
        minlength: 10, // Minimum length of 10 characters
        maxlength: 10, // Maximum length of 10 characters
        validate: {
        validator: function (value) {
            // Custom validation function to check if it's a valid phone number
            // You can implement your own validation logic here
            // For a simple example, we'll just check if it contains only numeric characters
            return /^\d+$/.test(value);
        },
        message: 'Phone number must contain only numeric characters.',
        },
    },
    imagename : {
        type : String,
    },
    visitpurpose:{
        type : String,
        },
    mode:{
        type:String,
        },
    returntime:{
        type:String,
        },
    returndate:{
        type:Date,
        },
    status : {
        type:String,
    },

});



const OutpassModel = mongoose.model("OutpassModel",outpassSchema);

module.exports = OutpassModel;
