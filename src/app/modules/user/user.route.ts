import { Router } from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { USER_ROLE } from './user.constant';
import auth from '../../middleware/auth';

const userRoutes = Router();

userRoutes.post(
  '/register',
  validateRequest(UserValidation.registerUserValidationSchema),
  userController.register,
);

userRoutes.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  userController.login,
);

userRoutes.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  userController.userBlock,
);

userRoutes.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  userController.deleteBlog,
);

export default userRoutes;
