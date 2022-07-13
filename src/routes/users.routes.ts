import { Router } from 'express';

import { UserControllers } from '../controllers';

// URL: http://${url}:${port}/users
const usersRoutes = Router();

const userControllers = new UserControllers();

usersRoutes.post('/', userControllers.store);

usersRoutes.get('/', userControllers.show);

usersRoutes.get('/:user_id', userControllers.index);

usersRoutes.put('/:user_id', userControllers.update);

usersRoutes.delete('/:user_id', userControllers.destroy);

export { usersRoutes };
