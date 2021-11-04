const userRouter = require('express').Router();
const { userInfoValidation, avatarValidation, userIdValidation } = require('../middlewares/validation');

const {
  updateUser,
  getCurrentUser,
  updateAvatar,
  getUser,
} = require('../controllers/users');

userRouter.get('/me', userInfoValidation, getCurrentUser);
userRouter.patch('/me', userInfoValidation, updateUser);
userRouter.patch('/me/avatar', avatarValidation, updateAvatar);
userRouter.get('/:_id', userIdValidation, getUser);

module.exports = userRouter;
