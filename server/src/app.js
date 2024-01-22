import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { connection } from './db.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

connection.
  then(console.log('>>> Database connected.'))
  .catch(error => console.error(`Error when trying connect in database: ${error}`))

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(authRoutes)

export default app