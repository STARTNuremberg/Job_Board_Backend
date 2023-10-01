const express = require("express")
const Job = require("./../models/job")
const router = express.Router()

// get all jobs
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();

        if (!jobs) {
            // Handle the case when no job with the given ID is found
            // res.redirect("/")
            return res.status(404).json({ message: "Jobs not found" });
        }
        // You have the job document
        res.json({ jobs });
    } catch (error) {
        // Handle any errors that occur during the query
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
})

// get create form
router.get("/new", ((req, res) => {
    res.send("new job form")
}))

// create a new job
// curl -X POST http://localhost:3080/jobs/
// t = {title: "someTitle", description: "someDescription"}
router.post("/", async (req, res) => {
    let job = new Job({
        title: req.body.title,
        description: req.body.description
    })
    // let job = new Job(t)
    try {
        job = await job.save()
        res.redirect(`/jobs/${job.id}`)
    } catch (e) {

    }
})

router
    .route("/:id")
    .get(async (req, res) => {
        try {
            const job = await Job.findById(req.params.id);

            if (!job) {
                // Handle the case when no job with the given ID is found
                // res.redirect("/")
                return res.status(404).json({ message: "Job not found" });
            }
            // You have the job document
            res.json({ job });
        } catch (error) {
            // Handle any errors that occur during the query
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    })
    //  curl -X PUT http://localhost:3080/jobs/6519d04f5590b335af56b575
    .put(async (req, res) => {
        // code for update query
        // const updatedJob = {title: "someTitle", description: "someDescription"}
        try {
            const jobId = req.params.id;
            const updatedJob = {
                title: req.body.title,
                description: req.body.description
            };

            const job = await Job.findOneAndUpdate(
                { _id: jobId }, // Query to find the job by its _id
                updatedJob,     // Update object
                { new: true }   // Optional: Return the updated document
            );

            if (!job) {
                // Handle the case when no job with the given ID is found
                // res.redirect("/")
                return res.status(404).json({ message: "Job not found" });
            }
            // You have the job document
            res.json({ job });
        } catch (error) {
            // Handle any errors that occur during the query
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }

        })
    //  curl -X DELETE http://localhost:3080/jobs/6519d8481a7367f52c057b2b
    .delete(async (req, res) => {
        // code for delete query
        try {
            await Job.findByIdAndDelete(req.params.id);

            if (!job) {
                // Handle the case when no job with the given ID is found
                // res.redirect("/")
                return res.status(404).json({ message: "Job not found" });
            }
            res.redirect('/')
        } catch (error) {
            // Handle any errors that occur during the query
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }

        })

module.exports = router