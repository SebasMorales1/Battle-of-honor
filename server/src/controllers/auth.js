import UserModel from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createAccessToken, createRefreshToken } from '../utils/manageToken.js'
import { decode } from 'jsonwebtoken'

const refreshTokenCookie = {
  sameSite: 'Lax',
  secure: process.env.MODE !== 'dev',
  httpOnly: true,
  signed: true,
  expires: new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRE * 1000)
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
    const refreshToken = await createRefreshToken(newUser._id)

    res.status(201).cookie('refreshToken', refreshToken, refreshTokenCookie).json({ msg: 'User registered' })
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

    const refreshToken = await createRefreshToken(user._id)

    res.cookie('refreshToken', refreshToken, refreshTokenCookie).json({ msg: 'User logged' })
  } catch (error) {
    console.error(`Error when user tries to register: ${error}`);
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const generateAccessToken = async (req, res) => {
  const { uid } = decode(req.signedCookies.refreshToken)
  const accesToken = await createAccessToken(uid)
  
  res.json({ accessToken: accesToken })
}