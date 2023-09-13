const mongoose  = require("mongoose");
const dbLink = "mongodb+srv://suyash:ihMhoWCFqBqTXYZk@cluster0.h6vwn4c.mongodb.net/?retryWrites=true&w=majority";

const connection = async()=>{
    try {
        await mongoose.connect(dbLink);
        console.log("DB is connected");
    } catch (error) {
        console.log(error);
    }
}


connection();

