import { Router } from 'express';

import { FinderControllers } from '../controllers';

// URL: http://${url}:${port}/finders
const findersRoutes = Router();

const finderControllers = new FinderControllers();

findersRoutes.post('/', finderControllers.store);

findersRoutes.get('/', finderControllers.show);

findersRoutes.get('/:finder_id', finderControllers.index);

findersRoutes.put('/:finder_id', finderControllers.update);

findersRoutes.delete('/:finder_id', finderControllers.destroy);

export { findersRoutes };
