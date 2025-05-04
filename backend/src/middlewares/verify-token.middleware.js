import { HTTP_STATUS } from '../common/http-status.common.js';
import { checkTypeToken } from '../utils/handler.ulti.js';
import { handleVerifyToken } from '../utils/jwt.util.js';

export const verifyToken = async (req, res, next) => {
  const bearerToken = req.headers['authorization'];
  const { query } = req;

  if (!bearerToken) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: 'Access denied!',
      success: false,
    });
  }

  const token = bearerToken.split(' ')[1];
  //verif token
  const verifyToken = await handleVerifyToken({
    token,
    secretkey: checkTypeToken(query?.type),
  });

  if (!verifyToken) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      message: 'Invalid token!',
      success: false,
    });
  }

  req.user = verifyToken;
  next();
};
