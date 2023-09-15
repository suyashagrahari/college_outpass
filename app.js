const { error } = require("console");
const cors = require("cors");
const express = require("express");
const app = express();
require("./db/conn");
const port = process.env.PORT || 4000;

const nodemailer = require('nodemailer');
const ContactModel =  require("./models/contactusSchema");
const Register = require("./models/registration");

const hbs = require("hbs");
const path = require("path");
const multer = require('multer');
const OutpassModel = require("./models/outpassSchema");
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
                users : "student",
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
                users : "faculty",
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
app.post("/loginform",upload,async(req,res)=>{
    console.log(req.body);
    const Email  = req.body.email;
    const Password = req.body.password;
   
    console.log(Email);
    console.log(Password);
    try {
        const user = await Register.findOne({email:Email});
       console.log(user.status);
        if(user.email == Email && user.password == Password )
        {
            if(user.users === "student")
            {
                console.log("ye sturdent h")
                res.render("outpass",{user});
            }
            else
            {
                const newUser = await OutpassModel.find();
                res.render("list",{newUser,user});
            }
        }
        else{
            res.send("<h1> login credential is not matching please try again </h1>");
        }
        
    } catch (error) {
        console.log(error);
        res.render("registrationerror")
    }
   
})

// ************************************ CONTACT US FORM  ***********************************

app.post("/sendmessage",upload, async(req,res)=>{
    console.log(req.body);
    console.log("data arha h backend m !")
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

app.post("/outpass",upload, async(req,res)=>{
            const data = req.body;
            console.log(data);
        try {
            const Email = data.email;
            const user = await Register.findOne({email : Email});
            console.log(user);
            const newUser = new OutpassModel(
                {  
                    email: user.email,
                    name : user.name,
                    rollno : user.rollno,
                    phone: user.phone,
                    mode : data.mode,
                    imagename : user.imagename,
                    visitpurpose : data.visitpurpose,
                    returntime :data.time,
                    returndate : data.date,
                }
                )
            await newUser.save();
            res.render("home");
        } catch (error) {
            console.log(error);
            res.render("registrationerror")
            
        }
})

app.post("/approval",upload,async(req,res)=>{
    try {
        console.log(req.body);
        res.redirect("list");
    } catch (error) {
        console.log(error);
    }
})


// Now send Approval message through mail
// Create a transporter using your SMTP settings


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'backendtest1234@gmail.com',
      pass: 'rodshmjrrkmvlzgq',
    },
  });

//   Create an email message with the recipient's email address, subject, and content:

// const mailOptions = {
//     from: 'backendtest1234@gmail.com',
//     to: '20ume003@lnmiit.ac.in',
//     subject: 'Hacker.☠️',
//     text: 'Your laptop is hacked mrs aditya soni !!!',
//   };

//   Use the transporter to send the email:

// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });


// // ************************************ EXPRESS RUNNING CODE ***********************************
app.listen(port,()=>{
    console.log(`server is connected at ${port}`);
})
