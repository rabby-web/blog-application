import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import { blogController } from './blog.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const blogRouters = Router();

blogRouters.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  blogController.createBlog,
);

blogRouters.patch('/:id', auth(USER_ROLE.user), blogController.updateBlog);

blogRouters.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  blogController.deleteBlog,
);

// blogRouters.get('/', blogController.getAllBlogs);

export default blogRouters;
