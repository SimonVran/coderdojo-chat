const express = require("express")
const path = require("path")
const chatRouter = require("./routes/chat")
const bodyParser = require("body-parser")

const app = express()

const port = 3000

// Control + F5 to reset cache

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")))
app.use("/api/chat", chatRouter)

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})

app.get("/chat", (req,res) => {
    res.sendFile(path.join(__dirname, "views", "chat.html"))
})

app.listen(port, () => {
    console.log("Server has started")
})