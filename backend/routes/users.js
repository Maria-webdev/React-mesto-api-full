const userRouter = require('express').Router();
const { userInfoValidation, avatarValidation } = require('../middlewares/validation');

const {
  updateUser,
  getCurrentUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/me', userInfoValidation, getCurrentUser);
userRouter.patch('/me', userInfoValidation, updateUser);
userRouter.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = userRouter;
