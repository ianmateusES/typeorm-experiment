import { Router } from 'express';

import { InterestControllers } from '../controllers';

// URL: http://${url}:${port}/insterests
const interestsRoutes = Router();

const interestControllers = new InterestControllers();

interestsRoutes.post('/', interestControllers.store);

interestsRoutes.get('/', interestControllers.show);

interestsRoutes.put('/:interest_id', interestControllers.update);

export { interestsRoutes };
