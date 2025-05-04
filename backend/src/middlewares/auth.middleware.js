import {
  loginValidation,
  registerValidation,
  resetPasswordValidation,
  sendEmailValidation,
} from "../validations/auth.validation.js";

import { HTTP_STATUS } from "../common/http-status.common.js";

// REGISTER MIDDLE-WARE
export const validationRegister = async (req, res, next) => {
  const body = req.body;

  //validate
  const { error } = registerValidation.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((item) => item.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: errors,
      success: false,
    });
  }

  req.user = body;

  next();
};
// LOGIN MIDDLE-WARE
export const validationLogin = async (req, res, next) => {
  const body = req.body;
  //validate
  const { error } = loginValidation.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((item) => item.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: errors,
      success: false,
    });
  }
  req.body = body;
  next();
};
// SEND EMAIL MIDDLE-WARE
export const validationSendEmail = async (req, res, next) => {
  const body = req.body;

  //validate
  const { error } = sendEmailValidation.validate(body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((item) => item.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: errors,
      success: false,
    });
  }
  req.email = body;
  next();
};
//RESET PASSWORD MIDDLE-WARE
export const validationResetPassword = async (req, res, next) => {
  const body = req.body;
  //validate
  const { error } = resetPasswordValidation.validate(body, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((item) => item.message);
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: errors,
      success: false,
    });
  }
  req.body = body;
  next();
};
