const express = require("express")
const Job = require("./../models/job")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("all jobs")
})

router.get("/new", ((req, res) => {
    res.send("new job form")
}))

// create a new job
router.post("/", async (req, res) => {
    let job = new Job({
        title: req.body.title,
        description: req.body.description
    })
    try {
        job = await job.save()
        res.redirect(`/jobs/${job.id}`)
    } catch (e) {

    }
})

router
    .route("/:id")
    .get((req, res) => {
        const jobId = req.params.id;
        // code for get query
    })
    .put((req, res) => {
        const jobId = req.params.id;
        // code for update query
        })
    .delete((req, res) => {
        const jobId = req.params.id;
        // code for delete query
        })

module.exports = router