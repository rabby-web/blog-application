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

const updateBlog = async (
  id: string,
  userEmail: string,
  payload: Partial<IBlog>,
) => {
  // check user is exists
  const user = await User.isUserExists(userEmail);

  if (!user) {
    throw new AppError(403, 'User not found! You cannot update the blog.');
  }

  // check blog is exists
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(404, 'Blog not found! You cannot update it.');
  }

  // check the owner

  if (blog.author.toString() !== user._id.toString()) {
    throw new AppError(
      403,
      'You are not the owner of this blog and cannot update it.',
    );
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const blogService = {
  createBlog,
  updateBlog,
};
