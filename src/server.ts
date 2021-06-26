import express from 'express'
import { createGiftCard } from './routes'

const app = express()

app.get("/", (req, res) => {
    return res.json({message: "Hello"})
})

app.get("/s", createGiftCard)

app.listen(3098)