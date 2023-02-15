const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
// const { Mongoose, default: mongoose } = require("mongoose");
const mongoose = require('mongoose');
require('dotenv').config({path:'config.env'});


// server used to send send emails
const app = express();

const uri = process.env.DB;
// const  = "mongodb+srv://user:password@cluster0.aqomnhv.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 8080;


mongoose.connect(uri, {
    useNewUrlParser: true
}, ).then(()=>{
    console.log("Connections Successful")
}).catch((err)=>{
    console.log(`Connection error: ${err}`)
})
app.use(cors());
app.use(express.json());
app.use("/", router);
// app.listen(5000, () => console.log("Server Running"));
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
const user = process.env.EMAIL_USER
const pass = process.env.EMAIL_PASS

const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:user,
    pass:pass
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = {
    from: name,
    to: "deependrarajpoot178@gmail.com",
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});

app.listen(PORT, (req, res)=>{
    console.log(`${PORT}`)
}) 