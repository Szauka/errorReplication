import '@tsed/ajv';
import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from '@tsed/common';
import '@tsed/swagger';
import { appConfig } from './config/app.config';
import bodyParser = require('body-parser');
import compress = require('compression');
import cookieParser = require('cookie-parser');

const _settings = {
    rootDir: appConfig.rootDir,
    mount: appConfig.mount,
    componentsScan: appConfig.componentsScan,
    httpPort: appConfig.appPort,
    httpsPort: false,
    acceptMimes: appConfig.acceptMimes,
    swagger: appConfig.swagger,
    logger: {
        logRequest: appConfig.logRequest
    }
};

@ServerSettings(_settings)
export class Server extends ServerLoader {
    /**
	 * This method let you configure the middleware required by your application to works.
	 * @returns {Server}
	 */
    $onMountingMiddlewares(): void | Promise<any> {
        this
            .use(GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }));
    }

    $onReady() {
        console.log('Server initialized');
    }

    $onServerInitError(error: any): any {
        console.log('Server encounter an error =>', error);
    }
}