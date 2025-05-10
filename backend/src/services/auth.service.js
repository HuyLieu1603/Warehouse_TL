import User from '../models/user.models.js';

// Check email is already exist
export const checkEmailExist = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

// Create User
export const createUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};
export const getUser = async (userID) => {
  return await User.findById(userID);
};
// Update Password
export const updatePassword = async (userID, password) => {
  const user = await User.findByIdAndUpdate(
    { _id: userID },
    { password },
    { new: true },
  );
  return Boolean(user);
};

//update status user
export const updateStatusUser = async (userID, status) => {
  const User = await User.findByIdAndUpdate(
    { _id: userID },
    { status },
    { new: true },
  );
  return Boolean(User);
};

export const checkSession = async (token) => {
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
