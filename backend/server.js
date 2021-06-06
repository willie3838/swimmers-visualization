import express from "express"
import cors from "cors"
import athletes from "./api/athletes.route.js"
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/athletes", athletes)
app.unsubscribe("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app 