import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogService } from './blog.service';

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

const getAllBlogs = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await blogService.getAllBlogs(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const userEmail = req?.user?.email;

  const result = await blogService.updateBlog(id, userEmail, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

// const deleteBlog = catchAsync(async (req, res) => {
//   const id = req.params.id;
//   await blogService.deleteBlog(id);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Blog deleted successfully',
//     data: {},
//   });
// });

const deleteBlog = catchAsync(async (req, res) => {
  const id = req.params.id;
  const userEmail = req?.user?.email;
  await blogService.deleteBlog(id, userEmail);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: {},
  });
});

export const blogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
