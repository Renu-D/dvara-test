import express from 'express';
import config from './config';
import compression from 'compression';
import bodyParser from 'body-parser';
import log4js from './config/log4js';
const logger = log4js.getLogger('APP');

import routes from './routes';

const app = express();

// console.log(config);
app.set('port', config.API_PORT);
//compress all responses
app.use(compression());
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

process.on('uncaughtException', (err) => {
    logger.error(err.message);
    process.exit(1);
});


routes(app);

export default app;