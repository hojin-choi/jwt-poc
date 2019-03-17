import * as bodyParser from 'body-parser';
import * as express from 'express';

import { login } from './login';
import { api } from './api';

const router = express.Router();

router.post('/login', bodyParser.json(), login);
router.get('/api', bodyParser.json(), api);

export default router;
