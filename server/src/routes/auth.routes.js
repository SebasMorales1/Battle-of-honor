import { Router } from 'express'
import { generateAccessToken, login, register } from '../controllers/auth.js'
import { loginBody, registerBody } from '../middlewares/validateData.js'

const router = Router()
const path = '/api/'

router.post(`${path}register`, registerBody, register)
router.post(`${path}login`, loginBody, login)
router.post(`${path}generate-token`, generateAccessToken)

export default router