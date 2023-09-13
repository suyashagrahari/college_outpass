const { error } = require("console");
const cors = require("cors");
const express = require("express");
const app = express();
require("./db/conn");
const port = process.env.PORT || 4000;


const ContactModel = require("./models/contactusSchema");
const Register = require("./models/registration");

const hbs = require("hbs");
const path = require("path");
const multer = require('multer');

app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

const static_path = path.join(__dirname,"./public/")
// console.log(static_path);
const template_path = path.join(__dirname,"./templates/views");
// console.log(template_path);
const partial_path = path.join(__dirname,"./templates/partials");
// console.log(partial_path);

// for hbs 
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);


// // ************************************************************* GETTING PAGE AND RENDER PAGE ONLY ****************************************************************



// ************************************ REGISTRATION ERROR PAGE ***********************************
app.get("/registrationerror",async(req,res)=>{
    try {
        res.render("registrationerror");
        
    } catch (x) {
        console.log(error);
        
    }
})

// ************************************ HOME PAGE ***********************************
app.get("/",async(req,res)=>{
    try {
        res.render("home");
        
    } catch (x) {
        console.log(error);
        
    }
})


// ************************************ ABOUT PAGE ***********************************
app.get("/about",async(req,res)=>{
    try {
        res.render("about");
        
    } catch (x) {
        console.log(error);
        
    }
})

// ************************************ LIST PAGE ***********************************
app.get("/list",async(req,res)=>{
    try {
        res.render("list");
        
    } catch (x) {
        console.log(error);
        
    }
})


// ************************************ OUTPASS PAGE ***********************************
app.get("/outpass",async(req,res)=>{
    try {
        res.render("outpass");
        
    } catch (x) {
        console.log(error);
        
    }
})

// ************************************ STUDENT REGISTER PAGE ***********************************
app.get("/studentregister",async(req,res)=>{
    try {
        res.render("studentregister");
        
    } catch (x) {
        console.log(error);
        
    }
})

// ************************************ FACULTY REGISTER PAGE ***********************************
app.get("/facultyregister",async(req,res)=>{
    try {
        res.render("facultyregister");
        
    } catch (x) {
        console.log(error);
        
    }
})

// ************************************ REGISTRATIONS PAGE ***********************************
app.get("/registrations",async(req,res)=>{
    try {
        res.render("registrations");
        
    } catch (x) {
        console.log(error);
        
    }
})

// ************************************ CONATCT PAGE ***********************************
app.get("/contact",async(req,res)=>{
    try {
        res.render("contact");
        
    } catch (x) {
        console.log(error);
        
    }
})

// ************************************ LOIGIN PAGE ***********************************
app.get("/login",async(req,res)=>{
    try {
        res.render("login");
        
    } catch (x) {
        console.log(error);
        
    }
})


// ************************************ ERROR PAGE ***********************************
app.get("/error",async(req,res)=>{
    try {
        res.render("error");
        
    } catch (x) {
        console.log(error);
        
    }
})

// // ********************************** SEND IMAGE OR FILE DATA IN MONGOOSE ATLAS DATABASE UING POST METHOD OR MULTER  **********************************




const upload = multer({
    storage : multer.diskStorage({
        destination: function(req,res,cb)
        {
            cb(null,"./public/uploads/")  // ynha hmne directory ka name diya h jnha hme file save krna h 
        },
        filename:function(req,file,cb)
        {
            cb(null,file.fieldname + "-" + Date.now()+".jpg")
        }
    })
}).single("uploadfile");




// // ************************************************** SEND DATA IN MONGOOSE ATLAS DATABASE UING POST METHOD ***************************************************



// ************************************ STUDENT REGISTRATION ***********************************


app.post("/registerstudent",upload, async(req,res)=>{
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    console.log(password);
    console.log(confirmpassword);
    console.log(req.body.name)
    console.log(req.file.filename);
    console.log(req.body);
    
    try {
        if(password === confirmpassword)
        {
            const newUser = new Register({
                name : req.body.name,
                rollno : req.body.rollno,
                phone : req.body.phone,
                email : req.body.email,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword,
                imagename : req.file.filename,
                status : "student",
            })

            const User  = await newUser.save();
            console.log(User);
            res.render("home");
        }
        else{
            res.send("Password is not matched !")
        }
        
    } catch (error) {
        console.log(error);
        res.render("registrationerror");
    }
    
})



// ************************************ FACULTY REGISTRATION ***********************************

app.post("/registerfaculty",upload, async(req,res)=>{
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    console.log(password);
    console.log(confirmpassword);
    console.log(req.body.name)
    console.log(req.file.filename);
    console.log(req.body);
   
    try {
        if(password === confirmpassword)
        {
            const newUser = new Register({
                name : req.body.name,
                phone : req.body.phone,
                email : req.body.email,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword,
                imagename : req.file.filename,
                status : "faculty",
            })

            const User  = await newUser.save();
            console.log(User);
            res.render("home");
        }
        else{
            res.send("Password is not matched !")
        }
        
    } catch (error) {
        console.log(error);
        res.render("registrationerror");
    }
    
})


// ************************************ LOGIN FORM ***********************************
app.post("/loginform",async(req,res)=>{
    console.log(req.body);
    res.send("chla gya");
})

// ************************************ CONTACT US FORM  ***********************************

app.post("/sendmessage", async(req,res)=>{
    console.log(req.body);
       try {
            const newUser = new ContactModel(
                {
                    name : req.body.name,
                    email : req.body.email,
                    message : req.body.message,
                }
            );
            const user = await newUser.save();
            console.log(user);
            res.send("<h1>Message is successfully sent </h1>");
       } catch (error) {
        console.log(error);
        
       }
})


// ************************************ OUTPASS FORM  ***********************************

app.post("/outpass", async(req,res)=>{
        
        try {
            const student  = await Contactform.findOne({email : req.body.email})
            const newUser = new Outpassprocess({
                name:req.body.name,
                mode:req.body.visit,
                data:req.body.date,
                time:req.body.time,
                visitpurpose:req.body.visitpurpose,      

            })
            const saveUser = await newUser.save();
            console.log(saveUser);
            res.render("outpass");
        } catch (error) {
            console.log(error);
            res.render("registrationerror");
            
        }
    
})


// // ************************************ EXPRESS RUNNING CODE ***********************************
app.listen(port,()=>{
    console.log(`server is connected at ${port}`);
})
