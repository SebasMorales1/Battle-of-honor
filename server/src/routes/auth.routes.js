import { Router } from 'express'
import { login, register } from '../controllers/auth.js'
import { loginBody, registerBody } from '../middlewares/validateData.js'

const router = Router()
const path = '/api/'

router.post(`${path}register`, registerBody, register)
router.post(`${path}login`, loginBody, login)

export default router