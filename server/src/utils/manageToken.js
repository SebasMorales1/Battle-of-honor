import Jwt from 'jsonwebtoken'

export function createToken(uid) {
  const expiresIn = 60 * 15

  return new Promise((resolve, reject) => {
    Jwt.sign(
      { uid },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn
      },
      (error, token) => {
        if (error)
          reject(error)
        resolve(token)
      }
    )
  })
}