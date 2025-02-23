const express = require("express")
const router = express.Router()

let messages = [
    {
        user: "system",
        message: "Chat has started"
    }
]

router.get("/", (req, res) => {
    res.json(messages)
})

router.post("/", async (req, res) => {
    console.log(req.body)

    let info = {
        user: req.body.username,
        message: req.body.message
    }

    messages.push(info)
    res.status(200).send()
})

module.exports = router