const jwt = require('jsonwebtoken');

const secret = 'rtfdgfdrewytcgd';

//生成token
exports.generateToken = function (e) {
  let paylond = { id: e, time: new Date() };
  let token = jwt.sign(paylond, secret, { expiresIn: 60 * 60 * 24 * 30 })
  return token;
}

//解码token
exports.verifyToken = function (e) {
  try {
    jwt.verify(e, secret)
    return 1
  } catch (err) {
    return 0
  }
}