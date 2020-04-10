import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import {useExpressServer, useContainer} from "routing-controllers";
import { Request, Response } from 'express';
import { Container } from "typedi";

export class ExpressConfig {
    app: express.Express;
    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(this.clientErrorHandler);
        this.setupControllers();
    }

    setupControllers()
    {
        const controllersPath = path.resolve('lib', 'controller');
        useContainer(Container);
        useExpressServer(this.app, {
            controllers: [controllersPath+"/*.js"],
            cors: true,
            validation: true,
            classTransformer: true
        });
    }

    // tslint:disable-next-line: ban-types
    clientErrorHandler(err: any,req: Request,res: Response,next: Function): void {
        if({}.hasOwnProperty.call(err, 'thrown')){
          res.status(err.status).send({error:err.message});
        }
    }
}