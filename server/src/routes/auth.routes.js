import { Router } from 'express'
import { register } from '../controllers/auth.js'

const router = Router()

router.post('/api/register', register)

export default router