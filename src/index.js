import app from './app';
import log4js from './config/log4js';
import config from './config';
const logger = log4js.getLogger('APP-INDEX');

var port = config.API_PORT;
const server = app.listen(port, () => {
    logger.debug(
        ' App is running at http://localhost:%d in %s mode',
        port,
        app.get('env')
    );
    logger.debug(' Press CTRL-C to stop\n');
});

server.on('close', () => {
    logger.debug('Server closed');
});

process.on('SIGINT', (err) => {
    server.close();
});

export default server;
