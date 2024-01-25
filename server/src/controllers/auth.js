import UserModel from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createAccessToken, createRefreshToken } from '../utils/manageToken.js'
import { decode } from 'jsonwebtoken'
import crypto from 'crypto-js'

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
    let refreshToken = await createRefreshToken(newUser._id)

    res.status(201).json({ msg: 'User registered', refreshToken })
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

    res.json({ msg: 'User logged', refreshToken })
  } catch (error) {
    console.error(`Error when user tries to login: ${error}`);
    res.status(500).json({ msg: 'Internal server error' })
  }
}

export const refresh = async (req, res) => {
  try {
    const uid = req.uid
    const accessToken = await createAccessToken(uid)

    res.json({ accessToken })
  } catch (error) {
    console.log(`Error when tries to generate access token: ${error}`)
    res.status(500).json({ msg: 'Internal error' })
  }
}

export const profile = async (req, res) => {
  const { uid } = decode(req.token)

  try {
    const user = await UserModel.findById(uid).select('nickname email')

    res.json({
      id: user._id,
      nickname: user.nickname,
      email: user.email
    })
  } catch (error) {
    console.log(`Error when tries to get user profile: ${error}`)
    res.status(500).json({ error: 'Internal error' })
  }
}

export const logout = async (_, res) => {
  res.clearCookie('refreshToken')

  res.json({ msg: 'User logouted' })
}