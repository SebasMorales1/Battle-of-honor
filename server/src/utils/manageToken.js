import Jwt from 'jsonwebtoken'
import crypto from 'crypto-js'

export function createAccessToken(uid) {
  return new Promise((resolve, reject) => {
    Jwt.sign(
      { uid },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRE)
      },
      (error, token) => {
        if (error)
          reject(error)
        resolve(token)
      }
    )
  })
}

export function createRefreshToken(uid) {
  return new Promise((resolve, reject) => {
    Jwt.sign(
      { uid },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRE)
      },
      (error, token) => {
        if (error)
          reject(error)
        const encrypt = crypto.AES.encrypt(token, process.env.ENCRYPT_REFRESH_TOKEN)
        resolve(encrypt.toString())
      }
    )
  })
}