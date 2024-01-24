import jwt from 'jsonwebtoken'

const errorList = {
  'jwt must be provided': 'Token must be provided',
  'jwt malformed': 'Invalid Token',
  'jwt expired': 'Token expired',
  'bearer': 'Token must be bearer',
  'invalid token': 'invalid token'
}

export const verifyRefreshToken = (req, res, next) => {
  const { refreshToken } = req.signedCookies

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
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