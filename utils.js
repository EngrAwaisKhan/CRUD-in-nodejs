const JWT = require('jsonwebtoken');

const generateToken = (user) => {
  return JWT.sign(
    {
      _id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };

module.exports = {generateToken, isAuth};
