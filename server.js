import cors from 'cors'
import express from 'express'
import { MongoClient } from 'mongodb'
import assert from 'assert'
import connectDB from './db.config'

connectDB()

const apiRoutes = require('./routes/api.routes')

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())

app.use(express.json())
app.use('/api', apiRoutes)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})