import { Router } from 'express';

import { RelationControllers } from '../controllers';

// URL: http://${url}:${port}/relations
const relationsRoutes = Router();

const relationControllers = new RelationControllers();

relationsRoutes.get('/', relationControllers.show);

relationsRoutes.get('/:relation_id', relationControllers.index);

export { relationsRoutes };
