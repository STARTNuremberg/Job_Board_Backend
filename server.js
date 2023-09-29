const express = require("express")
const mongoose = require("mongoose")

const app = express()


mongoose.connect("mongodb://db:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Access form data
app.use(express.urlencoded({extended: false}))

// Landing page
app.get('/', ((req, res) => {
    res.send("Hello World")
}))

// Routers
const jobRouter = require("./routes/jobs")
const userRouter = require("./routes/user")
const companyRouter = require("./routes/companies")

app.use("/jobs", jobRouter)
app.use("/user", jobRouter)
app.use("/companies", jobRouter)



// LP
// overview jobs
// login
// register
// details jobs

app.listen(3080)