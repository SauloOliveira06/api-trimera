const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World!"); 
});

app.post("/api/forma", (req, res) => {
  let data = req.body;

  let smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    
    auth: {
      user: "oliveira.saulo06@gmail.com",
      pass: "godofwar06",
    },
  });

  let mailOptions = {
    from: data.email,
    to: "oliveira.saulo06@gmail.com",
    subject: `Message from ${data.name}`,
    html: `
    
    <h3>Informations</h3>
    <ul>
      <li>Name: ${data.name}</li>      
      <li>Email: ${data.email}</li>
      <li>Available Position: ${data.availablePosition}</li>
      <li>Portfolio Link: ${data.portfolioLink}</li>
      <li>Other Position: ${data.otherPosition}</li>
      <li>Industry Status: ${data.industryStatus}</li>
      <li>Discord Tag: ${data.discordTag}</li>
      <li>Instagram Tag: ${data.instagramTag}</li>
    
    </ul> 
    <h3>Message</h3> 
    <p>${data.message}</p>  
    `,
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send("Success");
    }

    smtpTransport.close();
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
