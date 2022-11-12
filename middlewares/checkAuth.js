import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const checkAuth = async (req, res, next) => {
  let token;
  const authorization = req.headers.authorization;

  if(authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id);

      return next();
    } catch (err) {
      const error = new Error("Invalid token");
      res.json({msg: error.message});
    }
  }

  if(!token) {
    const error = new Error("There isn't token in headers");
    res.json({msg: error.message});
  }
}

export default checkAuth;