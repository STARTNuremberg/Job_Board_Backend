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
    .get(async (req, res) => {
        const job = await Job.findById(req.params.id)
        if (job == null) res.redirect('/')
        res.render("jobs/show", {job: job})

    })
    .put((req, res) => {
        // code for update query

        })
    .delete((req, res) => {
        // code for delete query

        })

module.exports = router