import jwt from 'jsonwebtoken';

// take in user id because we want to add as payload on token
const generateTokn = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export default generateTokn;