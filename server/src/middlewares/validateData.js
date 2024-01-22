import { body, validationResult } from 'express-validator'
import UserModel from '../models/User.js'

const validate = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() })

  next()
}

export const registerBody = [
  body('email', 'E-mail format error')
    .trim()
    .normalizeEmail()
    .isEmail(),
  body('email', 'E-mail is required')
    .exists(),
  body('email')
    .custom(async (value) => {
      const user = await UserModel.findOne({ email: value })

      if (user)
        throw new Error('E-mail is already taken')
      return true
    }),
  body('nickname', 'Nickname is required')
    .exists(),
  body('nickname', 'Nickname must be a minimum of 3 characters and a maximum of 50 characters')
    .trim()
    .isLength({ min: 3, max: 50 }),
  body('nickname')
    .custom(async (value) => {
      const user = await UserModel.findOne({ nickname: value })

      if (user)
        throw new Error('Nickname is already taken')
      return true
    }),
  body('password', 'Password is required')
    .exists(),
  body('password', 'Password must be a minimum of 8 characters and a maximum of 30 characters')
    .trim()
    .isLength({ min: 8, max: 30 }),
  body('password')
    .custom((value, { req }) => {
      if (value !== req.body.repassword || !req.body.repassword)
        throw new Error('Passwords do not match')
      return true
    }),
  validate
]

export const loginBody = [
  body('email', 'E-mail is required')
    .exists(),
  body('email', 'E-mail format error')
    .trim()
    .normalizeEmail()
    .isEmail(),
  body('password', 'Password is required')
    .exists(),
  validate
]