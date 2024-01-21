import { Router } from 'express'
import { login, register } from '../controllers/auth.js'

const router = Router()
const path = '/api/'

router.post(`${path}register`, register)
router.post(`${path}login`, login)

export default router