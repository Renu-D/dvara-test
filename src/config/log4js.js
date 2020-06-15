// const log4js = require('log4js');
import log4js from 'log4js';

const log4jsConf = {
    console: {
        appenders: {
            app: {
                type: 'stdout'
            }
        },
        categories: {
            default: {
                appenders: [
                    'app'
                ],
                level: 'DEBUG'
            }
        }
    }
};
log4js.configure(log4jsConf.console);
// exports.default = log4js;
export default log4js;