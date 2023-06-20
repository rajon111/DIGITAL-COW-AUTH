import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICow } from './cow.interface';
import { Cow } from './cow.model';

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const createCow = (await Cow.create(payload)).populate('seller');

  if (!createCow) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot create a new Cow');
  }

  return createCow;
};

const getSingleCow = async (id: string) => {
  const result = await Cow.findById(id).populate('seller');
  return result;
};

export const CowService = {
  createCow,
  getSingleCow,
};
