const express = require("express");
const app = express()
const path = require("path")
const {sequelize} = require('./models')
const RootRouters = require('./routers')
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const YAML = require('yaml')
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// setup app using json
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 100 requests per window (15 minutes)
  // Other options like custom headers can be configured here
});
app.use(limiter);

// set up router
app.use('/api/v1/deepfake_detector',RootRouters)

app.get("/",(req,res)=>{

    res.send("Hello worlds !")
})

const publicPathhDirectory = path.join(__dirname,"./public")
app.use("/public",express.static(publicPathhDirectory))

// set up swagger 
const file  = fs.readFileSync('./swagger.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = 5000;
app.listen(port,async ()=>{
    console.log(`App listen on port localhost ${port}`);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})
