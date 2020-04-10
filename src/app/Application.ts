import { ExpressConfig } from '../middleware/Express';
import { logger } from '../utils/logger';
import { Config } from '../utils/config';

export class Application {
    server: any;
    express: ExpressConfig;
    constructor() {
        // tslint:disable-next-line: no-unused-expression
        new Config();
        const host: string = process.env.host;
        const port: number = process.env.port as unknown as number;
        this.express = new ExpressConfig();
        this.server = this.express.app.listen(port, host, () => {
            logger.info(`
                -------------------------------------------------
                Server Started! Express: http://${host}:${port}
                Health: http://${host}:${port}/ping
                -------------------------------------------------
            `)
        })
    }
}