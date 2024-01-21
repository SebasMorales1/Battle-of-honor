import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'

import { connection } from './db.js'

const app = express()

connection.
  then(console.log('>>> Database connected.'))
  .catch(error => console.error(`Error when trying connect in database: ${error}`))

app.use(morgan('dev'))
app.use(express.json())

export default app