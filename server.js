const express = require('express');
const app = express();
require('dotenv').config();
const path = require("path");
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute');
const superAdminRoute = require('./routes/superAdminRoute');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');
const instructorRoute = require('./routes/instructorRoute');
const studentRoute = require('./routes/studentRoute');
const publicRoute = require('./routes/publicRoute');
const institutionRoute = require('./routes/institutionRoute.js');
const cors = require('cors');
 

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//routes 
app.use("/api/auth",authRoutes);
//app.use("/api/superAdmin", authMiddleware.authorize("superAdmin"),adminRoutes);
app.use("/api/superAdmin", authMiddleware.authorize("superAdmin"), superAdminRoute);
app.use("/api/instructor", authMiddleware.authorize("user"), instructorRoute);
app.use("/api/student", authMiddleware.authorize("user"), studentRoute);
app.use("/api/institution", authMiddleware.authorize("user"), institutionRoute);
app.use("/api/public",  publicRoute);


//database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then((result) => {
        
        // server.timeout = 1800000; 
        console.log("DB Connected");
    })
    .catch(err => console.log(err));
    



//404 not found


if (process.env.NODE_ENV === "production") {
    //set static folder.
    
    app.use(express.static("client/build"));
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    );
  }
  const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `App listening on PORT: ${PORT}!`
      
  )
);