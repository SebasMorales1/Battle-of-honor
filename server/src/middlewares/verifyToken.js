import jwt from 'jsonwebtoken'

const errorList = {
  'jwt must be provided': 'Token must be provided',
  'jwt malformed': 'Invalid Token',
  'jwt expired': 'Token expired'
}

export const verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.signedCookies

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
    next()
  } catch (err) {
    const error = errorList[err.message]
    console.log(err)
    if (error)
      return res.status(401).json({ error })

    res.status(500).json({ error: 'Internal error' })
  }
}