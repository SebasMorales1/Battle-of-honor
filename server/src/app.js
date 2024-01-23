import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { connection } from './db.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

connection.
  then(console.log('>>> Database connected.'))
  .catch(error => console.error(`Error when trying connect in database: ${error}`))

const whiteList = process.env.ORIGINS.split(';')
 
app.use(cors({
  origin: function (origin, callback) {
    console.log(`Origin => ${origin}`)

    if ((process.env.MODE==="dev" ? !origin : false) || whiteList.includes(origin))
      return callback(null, origin)
    return callback(`Error cors origin ${origin} not authorization`)
  },
  credentials: true,
}))

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan('dev'))
app.use(express.json())

app.use(authRoutes)

export default app