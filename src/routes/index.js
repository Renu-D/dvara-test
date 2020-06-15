import log4js from '../config/log4js';
const logger = log4js.getLogger('ROUTES');
import userRoutes from './userRoutes';

const routes = (app) => {
    app.use(userRoutes);
    logger.debug('App routes setup.');
};

export default routes;