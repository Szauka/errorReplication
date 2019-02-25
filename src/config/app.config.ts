/* istanbul ignore file */
import * as Path from 'path';
import { ApiKeySecurity, Info } from 'swagger-schema-official';

class ApplicationConfig {
    private _appPort: number;
    private _rootDir: string;
    private _mount: any;
    private _componentsScan: string[];
    private _acceptMimes: string[];
    private _swaggerEnabled: boolean;
    private _swagger: any;
    private _logRequest: boolean = false;

    constructor() {
        this.setup();

        // -----------------------------------------------------------------------------------
        // @ServerSettings declaration
        // -----------------------------------------------------------------------------------
        this._rootDir = Path.resolve(__dirname, '..');
        this._mount = { '/api': Path.join(this._rootDir, 'controllers', '**', '*.ts') };
        this._componentsScan = [
            Path.join(this._rootDir, 'services', '**', '*.ts'),
            Path.join(this._rootDir, 'middlewares', '**', '*.ts')
        ];
        this._acceptMimes = ['application/json', 'multipart/form-data'];

        // -----------------------------------------------------------------------------------
        // Swagger settings
        // -----------------------------------------------------------------------------------
        if (this._swaggerEnabled) {
            this._swagger = {
                showExplorer: true,
                path: '/api-docs',
                spec: {
                    swagger: '2.0',
                    schemes: ['http'],
                    info: {
                        version: '0.0.0.1',
                        title: '',
                        description: ''
                    } as Info,
                    externalDocs: {
                        url: '',
                        description: ''
                    },
                    paths: undefined,
                    security: [{
                        Bearer: []
                    }],
                    securityDefinitions: {
                        Bearer: {
                            description: 'There is no authentication implemented yet. To be updated when this is in place.',
                            type: 'apiKey',
                            name: 'authorization',
                            in: 'header'
                        } as ApiKeySecurity
                    }
                },
                options: {
                    supportedSubmitMethods: ['get', 'post', 'put', 'delete']
                }
            };
        }

        // Output Used variables to the screen
        console.log(this.toString());
    }

    setup(): void {

        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {

            this._swaggerEnabled = true;
            this._logRequest = true;
        }

        this._appPort = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3100;
        // this._APP_PORT = this.isDefined(process.env.APP_PORT, 'APP_PORT');
    }

    private isDefined(env: any, name: string) {
        if (!env) {
            console.error(`ERROR: The '${name}' environment variable was not set.`);
            process.exit(1);
        }

        return env;
    }

    get appPort(): number {
        return this._appPort;
    }

    get rootDir(): string {
        return this._rootDir;
    }

    get mount(): any {
        return this._mount;
    }

    get componentsScan(): string[] {
        return this._componentsScan;
    }

    get acceptMimes(): string[] {
        return this._acceptMimes;
    }

    get swagger(): any {
        return this._swagger;
    }

    get logRequest(): boolean {
        return this._logRequest;
    }

    toString(): string {
        return `
-----------------------------------------------------------------------------
            | Environment used (NODE_ENV):  ${process.env.NODE_ENV}
            |----------------------------------------------------------------
            | APP_PORT:                     ${this._appPort}
            |----------------------------------------------------------------
            | SWAGGER_ENABLED :             ${this._swaggerEnabled}
-----------------------------------------------------------------------------
            `;
    }
}

export const appConfig = new ApplicationConfig();
