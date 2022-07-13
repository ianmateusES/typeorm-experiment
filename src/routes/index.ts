import { Router } from 'express';

import { findersRoutes } from './finders.routes';
import { friendsRoutes } from './friends.routes';
import { interestsRoutes } from './interests.routes';
import { relationsRoutes } from './relations.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Application running' });
});

routes.use('/users', usersRoutes);
routes.use('/friends', friendsRoutes);
routes.use('/finders', findersRoutes);
routes.use('/relations', relationsRoutes);
routes.use('/interests', interestsRoutes);

export { routes };
