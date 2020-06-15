import Router from 'express';
import * as userCtrl from '../controllers/user';

// get an instance of router
const router = Router();

router.route('/api/users').get(userCtrl.getData);

export default router;