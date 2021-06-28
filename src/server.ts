import express from 'express'

const app = express()

app.use(express.json())



app.listen(3098, () => console.log("Rodando servidor!"))
