import Jwt from 'jsonwebtoken'

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
        resolve(token)
      }
    )
  })
}