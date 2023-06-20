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

export const CowService = {
  createCow,
};
