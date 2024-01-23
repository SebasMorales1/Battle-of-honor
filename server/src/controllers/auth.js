import UserModel from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createToken } from '../utils/manageToken.js'

const cookieOptions = (expires) => {
  return {
    expires,
    sameSite: 'Lax',
    secure: process.env.MODE !== 'dev',
    httpOnly: true,
    signed: true
  }
}

export const register = async (req, res) => {
  const { nickname, email, password } = req.body

  try {
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({
      nickname,
      email,
      password: hashPassword
    })

    await newUser.save()

    const token = await createToken(newUser._id)

    const expires = new Date(Date.now() + 60 * 15 * 1000)

    res.status(201).cookie('token', token, cookieOptions(expires)).json({ msg: 'User registered' })
  } catch (error) {
    console.error(`Error when user tries to register: ${error}`);
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email })

    if (!user)
      return res.status(400).json({ msg: 'Invalid credentials' })

    const matchPasswords = await bcrypt.compare(password, user.password)

    if (!matchPasswords)
      return res.status(400).json({ msg: 'Invalid credentials' })

    const token = await createToken(user._id)
    const expires = new Date(Date.now() + 60 * 15 * 1000)

    res.cookie('token', token, cookieOptions(expires)).json({ msg: 'User logged' })
  } catch (error) {
    console.error(`Error when user tries to register: ${error}`);
    res.status(500).json({ msg: 'Internal server error' })
  }
}