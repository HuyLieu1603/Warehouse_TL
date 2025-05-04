import joi from "joi";

// REGISTER
export const registerValidation = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email không được để trống",
    "string.empty": "Email không được để trống",
  }),
  password: joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải lớn hơn 6 ký tự",
    "any.required": "Mật khẩu không được để trống",
    "string.empty": "Mật khẩu không được để trống",
  }),
  confirmPassword: joi.string().required().valid(joi.ref("password")).messages({
    "any.only": "Mật khẩu không khớp",
    "any.required": "Mật khẩu không được để trống",
  }),
});

// LOGIN
export const loginValidation = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email không được để trống",
    "string.empty": "Email không được để trống",
  }),
  password: joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải lớn hơn 6 ký tự",
    "any.required": "Mật khẩu không được để trống",
    "string.empty": "Mật khẩu không được để trống",
  }),
});

// SEND EMAIL
export const sendEmailValidation = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email không hợp lệ",
    "any.required": "Email không được để trống",
    "string.empty": "Email không được để trống",
  }),
});

// RESET PASSWORD
export const resetPasswordValidation = joi.object({
  newPassword: joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải lớn hơn 6 ký tự",
    "any.required": "Mật khẩu không được để trống",
    "string.empty": "Mật khẩu không được để trống",
  }),
  confirmPassword: joi
    .string()
    .required()
    .valid(joi.ref("newPassword"))
    .messages({
      "any.only": "Mật khẩu không khớp",
      "any.required": "Mật khẩu không được để trống",
    }),
});

// CHANGE PASSWORD
export const changePasswordValidation = joi.object({
  oldPassword: joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải lớn hơn 6 ký tự",
    "any.required": "Mật khẩu không được để trống",
    "string.empty": "Mật khẩu không được để trống",
  }),
  newPassword: joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải lớn hơn 6 ký tự",
    "any.required": "Mật khẩu không được để trống",
    "string.empty": "Mật khẩu không được để trống",
  }),
  confirmPassword: joi.string().required().valid(joi.ref("password")).messages({
    "any.only": "Mật khẩu không khớp",
    "any.required": "Mật khẩu không được để trống",
  }),
});
