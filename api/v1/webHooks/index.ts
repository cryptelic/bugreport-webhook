import * as express from 'express';
import { webHookController } from './webHook.controller';
import { universalFunctions } from '../../../utils/universalFunctions';

export class webHookRoutes {

    public router = express.Router();
    public webHookController: webHookController = new webHookController();
    public universalFunction: universalFunctions = new universalFunctions();

    constructor() {

        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post('/webhook/', this.universalFunction.verifyWebHook , this.webHookController.dumpRequest);
        this.router.get('/webhook/', this.webHookController.getWebHooksData);
    }

}

