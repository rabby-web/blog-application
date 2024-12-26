import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createBlog = catchAsync(async (req, res) => {
  const userEmail = req?.user?.email;

  const result = await blogService.createBlog(req.body, userEmail);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

export const blogController = {
  createBlog,
};
