import { Router } from 'express';

import { FriendControllers } from '../controllers';

// URL: http://${url}:${port}/friends
const friendsRoutes = Router();

const friendControllers = new FriendControllers();

friendsRoutes.post('/', friendControllers.store);

friendsRoutes.get('/', friendControllers.show);

friendsRoutes.get('/:friend_id', friendControllers.index);

friendsRoutes.put('/:friend_id', friendControllers.update);

friendsRoutes.delete('/:friend_id', friendControllers.destroy);

export { friendsRoutes };
