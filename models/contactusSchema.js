const { default: mongoose } = require("mongoose");
const manogoose = require("mongoose");

const ContactSchema  = mongoose.Schema({
    name : {
        type: String,
        lowercase:true,
    },
    email : {
        type : String,
    },
    message :{
        type : String,
    }
})

const ContactModel = mongoose.model("ContactModel",ContactSchema);
module.exports = ContactModel;