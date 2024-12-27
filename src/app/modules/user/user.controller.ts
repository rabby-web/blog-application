import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { userService } from './user.service';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.register(req.body);
  const { _id, name, email } = result;

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: { _id, name, email },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.login(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: 'User logged in successfully',
    // token: result?.token,
    data: result?.token,
  });
});

const userBlock = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  const result = await userService.userBlock(userId, updatedData);
  sendResponse(res, {
    statusCode: StatusCodes.ACCEPTED,
    success: true,
    message: 'User block successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  await userService.deleteBlogFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: {},
  });
});

export const userController = {
  register,
  login,
  userBlock,
  deleteBlog,
};
