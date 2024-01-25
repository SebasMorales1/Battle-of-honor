import jwt from 'jsonwebtoken'
import crypto from 'crypto-js'
import InvalidTokenModel from '../models/InvalidToken.js'

const errorList = {
  'jwt must be provided': 'Token must be provided',
  'jwt malformed': 'Invalid Token',
  'jwt expired': 'Token expired',
  'bearer': 'Token must be bearer',
  'invalid token': 'invalid token',
  'key': 'invalid key'
}

export const verifyRefreshToken = async (req, res, next) => {
  let refreshToken = req.headers.authorization
  const { key } = req.params

  try {
    if (!refreshToken)
      throw new Error('jwt must be provided')

    if (!refreshToken.startsWith('Bearer '))
      throw new Error('bearer')

    if (!key || key !== process.env.ENCRYPT_REFRESH_TOKEN)
      throw new Error('key')

    refreshToken = refreshToken.slice(7)

    let decrypt = crypto.AES.decrypt(refreshToken, key)
    decrypt = decrypt.toString(crypto.enc.Utf8) || 'fail'
    
    jwt.verify(decrypt, process.env.REFRESH_TOKEN_KEY)

    const isInvalid = await InvalidTokenModel.findOne({ token: decrypt })

    if (isInvalid)
      throw new Error('jwt malformed')

    req.refreshToken = decrypt
    req.uid = jwt.decode(decrypt).uid
    next()
  } catch (err) {
    const error = errorList[err.message]
    if (error)
      return res.status(401).json({ error })

    console.log(`Error when tries to verify refresh token: ${err}`)
    res.status(500).json({ error: 'Internal error' })
  }
}

export const verifyAccessToken = (req, res, next) => {
  let token = req.headers.authorization

  try {
    if (!token)
      throw new Error('jwt must be provided')

    if (!token.startsWith('Bearer '))
      throw new Error('bearer')
    token = token.slice(7)
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY)

    req.token = token
    next()
  } catch (err) {
    const error = errorList[err.message]
    if (error)
      return res.status(401).json({ error })

    console.log(`Error when tries to verify access token: ${err}`)
    res.status(500).json({ error: 'Internal error' })
  }
} 