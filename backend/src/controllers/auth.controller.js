import * as dotenv from 'dotenv';
import {
  checkEmailExist,
  checkSession,
  createUser,
  updatePassword,
} from '../services/auth.service.js';
import {
  handleComparePassword,
  handleHashPassword,
} from '../utils/hash-password.util.js';
import { HTTP_STATUS } from '../common/http-status.common.js';
import { handleGenerateToken } from '../utils/jwt.util.js';

dotenv.config();

export const authController = {
  register: async (req, res) => {
    const body = req.body;

    const isExist = await checkEmailExist(body.email);
    if (isExist)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Địa chỉ email đã được sử dụng',
        success: false,
      });

    if (body.password !== body.confirmPassword)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Mật khẩu không khớp',
        success: false,
      });

    const hashPassword = await handleHashPassword({
      password: body.password,
      saltNumber: 5,
    });

    const newUser = await createUser({ ...body, password: hashPassword });
    if (!newUser)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'User not created',
        success: false,
      });

    const accessToken = await handleGenerateToken({
      payload: { _id: newUser._id, email: newUser.email },
    });

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Đăng ký thành công',
      success: true,
      data: newUser,
      accessToken,
    });
  },

  login: async (req, res) => {
    const body = req.body;
    console.log(body);
    //Check
    const user = await checkEmailExist(body.email);
    if (!user)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Địa chỉ email chưa được đăng ký!',
        success: false,
      });
    //Compare password
    const isMatch = await handleComparePassword({
      password: body.password,
      hashPassword: user.password,
    });
    if (!isMatch)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Sai mật khẩu!',
        success: false,
      });
    // generate token
    const accessToken = await handleGenerateToken({
      payload: { _id: user._id, email: user.email, role: user.role },
    });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Đăng nhập thành công!',
      success: true,
      accessToken,
    });
  },

  checkSession: async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Vui lòng cung cấp token',
        success: false,
      });
    const decoded = await checkSession(token);
    if (!decoded)
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        message: 'Token không hợp lệ',
        success: false,
      });
    return res.status(HTTP_STATUS.OK).json({
      message: 'Token hợp lệ',
      success: true,
      data: decoded,
    });
  },
};
