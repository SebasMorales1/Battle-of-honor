import UserModel from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createToken } from '../utils/manageToken.js'

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
    const expire = new Date() + 15 * 60 * 1000

    res.cookie('token', token, { 
      expire,
      httpOnly: true,
      secure: process.env.MODE !== 'dev'
    })
    res.status(201).json({ msg: 'User registered' })
  } catch (error) {
    console.error(`Error when user tries to register: ${error}`);
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email })

    if (!user.email)
      return res.status(400).json({ msg: 'Invalid credentials' })

    const matchPasswords = await bcrypt.compare(password, user.password)

    if (!matchPasswords)
      return res.status(400).json({ msg: 'Invalid credentials' })

    const token = await createToken(user._id)
    const expire = new Date() + 15 * 60 * 1000

    res.cookie('token', token, { 
      expire,
      httpOnly: true,
      secure: process.env.MODE !== 'dev'
    })
    res.json({ msg: 'User logged' })
  } catch (error) {
    console.error(`Error when user tries to register: ${error}`);
    res.status(500).json({ msg: 'Internal server error' })
  }
}