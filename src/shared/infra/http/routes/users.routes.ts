import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ShowUserProfileController } from '@modules/accounts/useCases/showUserProfile/ShowUserProfileController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const showUserProfileController = new ShowUserProfileController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch(
  '/avatar',
  ensureAthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);
usersRoutes.get(
  '/profile',
  ensureAthenticated,
  showUserProfileController.handle
);

export { usersRoutes };
