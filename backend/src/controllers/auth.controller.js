import * as dotenv from 'dotenv';
import {
  checkEmailExist,
  checkSessionUser,
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
    console.log(body);
    const isExist = await checkEmailExist(body.email);
    if (isExist)
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: 'Địa chỉ email đã được sử dụng',
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
    res.cookie('token', accessToken, {
      httpOnly: true, // ❗ Không cho JS truy cập cookie
      secure: false, // ✅ true nếu dùng HTTPS
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(HTTP_STATUS.OK).json({
      message: 'Đăng nhập thành công!',
      success: true,
      user,
    });
  },

  logOut: async (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    return res.status(HTTP_STATUS.OK).json({ message: 'Logged out' });
  },

  checkSession: async (req, res) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(' ')[1] || null;
      if (!token)
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: 'Vui lòng cung cấp token',
          success: false,
        });
      const decoded = await checkSessionUser(token);
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
    } catch (error) {
      console.log(error);
    }
  },
};
