import { Router } from 'express'
import {
  refresh,
  login,
  logout,
  profile,
  register 
} from '../controllers/auth.js'
import { loginBody, registerBody } from '../middlewares/validateData.js'
import { verifyAccessToken, verifyRefreshToken } from '../middlewares/verifyToken.js'

const router = Router()
const path = '/api/'

router.post(`${path}register`, registerBody, register)
router.post(`${path}login`, loginBody, login)

router.get(`${path}refresh/:key`, verifyRefreshToken, refresh)
router.get(`${path}profile`, verifyAccessToken, profile)
router.get(`${path}logout`, logout)

export default router