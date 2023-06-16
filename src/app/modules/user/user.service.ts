import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config';

const createUser = async (user: IUser) => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const createUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create user');
  }

  return createUser;
};

export const UserService = {
  createUser,
};
