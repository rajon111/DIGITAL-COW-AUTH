import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICow, ICowfilters } from './cow.interface';
import { Cow } from './cow.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { SortOrder } from 'mongoose';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const createCow = (await Cow.create(payload)).populate('seller');

  if (!createCow) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot create a new Cow');
  }

  return createCow;
};

const getAllCows = async (
  filters: ICowfilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: [
        { location: { $regex: searchTerm, $options: 'i' } },
        { breed: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    });
  }

  if (minPrice && maxPrice) {
    andConditions.push({
      price: { $gte: minPrice, $lte: maxPrice },
    });
  } else if (minPrice) {
    andConditions.push({
      price: { $gte: minPrice },
    });
  } else if (maxPrice) {
    andConditions.push({
      price: { $lte: maxPrice },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .populate('seller')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const count = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');
  return result;
};

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
