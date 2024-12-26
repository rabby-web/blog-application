import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { IBlog } from './blog.interface';
import Blog from './blog.model';

const createBlog = async (payload: IBlog, userEmail: string) => {
  const user = await User.isUserExists(userEmail);

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const userId = user?._id;

  const blogData = { ...payload, author: userId };

  const result = await Blog.create(blogData);
  return result;
};

export const blogService = {
  createBlog,
};
