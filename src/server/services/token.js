const jwt = require('jsonwebtoken')

module.exports.generateToken = (user, callback) => {
  const token = jwt.sign({
    user
  }, 'thisIsMySecretWord')
  return token
}

module.exports.checkToken = (token, callback) => {
  jwt.verify(token, 'thisIsMySecretWord', (err, decoded) => {
    if (err) throw err
    console.log(decoded)
  })
}
