import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CowService } from './cow.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ICow } from './cow.interface';
import pick from '../../../shared/pick';
import { pagenationFields } from '../../../constants/pagenation';
import { cowFilterableFields } from './cow.constant';

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body;
  const result = await CowService.createCow(cowData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow created successfully',
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, pagenationFields);

  const result = await CowService.getAllCows(filters, paginationOptions);

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow  fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved  successfully',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.updateCow(id, req.body);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow Updated  successfully',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CowService.deleteCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow Delete  successfully',
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
