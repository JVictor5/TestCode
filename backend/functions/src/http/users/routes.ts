import { ensureAuthentication } from '@burand/functions/middlewares';
import { Router } from 'express';

import { handleCreateAdmin } from './useCases/createAdmin/index.js';
import { handleCreateUser } from './useCases/createUsers/index.js';
import { handleUpdateUser } from './useCases/updateUsers/index.js';

const routes = Router();

routes.post('/', handleCreateUser);
routes.post('/admins', ensureAuthentication, handleCreateAdmin);
routes.put('/:id', ensureAuthentication, handleUpdateUser);

export default routes;
