import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import User from './user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Blog from '../blog/blog.model';

const register = async (payload: IUser) => {
  const user = await User.isUserExists(payload.email);
  if (user) {
    throw new AppError(400, 'User Already exists !');
  }

  const result = await User.create(payload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  const isBlocked = user.isBlocked; // Assuming isBlocked is boolean

  if (isBlocked) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  //checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  //create token and sent to the  client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  // const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
  //   expiresIn: '30d',
  // });
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });

  // jwt.verify(token, config.jwt_access_secret as string); // Ensure this matches

  return { token, user };
};

const userBlock = async (userId: string, payload: Partial<IUser>) => {
  // check user is exits
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  if (user?.role !== 'user') {
    throw new AppError(403, 'Only user roles can be blocked!');
  }

  if (user.isBlocked === true) {
    throw new AppError(
      400,
      'This user is already blocked you can not blocked again!',
    );
  }

  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBlog = async (id: string) => {
  // check blog is exists
  const blog = await Blog.findById(id);

  if (!blog) {
    throw new AppError(404, 'Blog not found!');
  }

  const result = await Blog.findByIdAndUpdate(id, { isDeleted: true });

  return result;
};

export const userService = {
  register,
  login,
  userBlock,
  deleteBlog,
};
