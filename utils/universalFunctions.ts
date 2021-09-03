import { Request, Response, NextFunction } from 'express';
import * as env from "../env.json";
import * as config from "../config/app.json";

const multiparty = require('multiparty');
const crypto = require('crypto');

const webhookSecretKey = config[env.instance].webhookSecretKey;

export class universalFunctions {

    public verifyWebHook(req: Request, res: Response, next: NextFunction) {

        let form = new multiparty.Form();

        form.parse(req, function (err, fields, files) {
            if (err) {
                throw err;
            } else {
                let timestamp = fields.timestamp;
                let uuid = fields.uuid;
                let signature = fields.signature;

                const hmac = crypto.createHmac('sha256', webhookSecretKey);
                const data = hmac.update(timestamp + uuid);
                const key = data.digest('hex');

                console.log("---------- received-data---------------------------------------------------")
                console.log("Signature: " + signature)
                console.log("UUID:      " + uuid)
                console.log("Timestamp: " + timestamp)

                console.log("---------- computed-data---------------------------------------------------")
                console.log("Signature: " + key)
                console.log("---------------------------------------------------------------------------")
                console.log("Message: " + fields.text)
                console.log("---------------------------------------------------------------------------")

                if (signature == key) {
                    res.locals.text = fields.text;
                    res.locals.app = fields.app;
                    res.locals.user_agent = fields.user_agent;
                    res.locals.user_id = fields.user_id;
                    res.locals.can_contact = fields.can_contact;
                    res.locals.device_id = fields.device_id;
                    res.locals.version = fields.version;
                    res.locals.branch_name = fields.branch_name;
                    res.locals.matrix_sdk_version = fields.matrix_sdk_version;
                    res.locals.olm_version = fields.olm_version;
                    res.locals.device = fields.device;
                    res.locals.verbose_log = fields.verbose_log;
                    res.locals.multi_window = fields.multi_window;
                    res.locals.os = fields.os;
                    res.locals.app_language = fields.app_language;
                    res.locals.default_app_language = fields.default_app_language;
                    res.locals.theme = fields.theme;
                    res.locals.server_version = fields.server_version;
                    res.locals.uuid = fields.uuid;
                    res.locals.timestamp = fields.timestamp;
                    res.locals.signature = fields.signature;
                    res.locals.label = fields.label;
                    res.locals['compressed-log'] = files['compressed-log'];
                    res.locals.file = files.file;
                    next()
                } else {
                    res.status(406).json({ status: 'error', message: 'invalid signature' })
                    console.log("Invalid Signature. Verification not passed.")
                }
            }
        });
        form.on('close', function () {
            console.log("---------------------------------------------------------------------------")
            console.log('Verification completed!');
        });
    }

}
