import { Request, Response } from 'express';
import { webHookModel } from './webHook.model';

import * as Agenda from 'agenda';

import * as env from "../../../env.json";
import * as config from "../../../config/app.json";
const API_KEY = config[env.instance].mailGunApiKey;

const mailgun = require("mailgun-js");
const DOMAIN = "mg.vnete.net";

const mg = mailgun({
    apiKey: API_KEY,
    domain: DOMAIN,
    host: "api.eu.mailgun.net"  // -> Host for EU region domain
});

const agenda = new Agenda({ db: { address: 'mongodb://mongo:27017/agendaDb' } });

export class webHookController {

    public dumpRequest(req: Request, res: Response) {

        if (req.method !== 'POST') {
            return res.status(405).end(); // Return a "method not allowed" error
        }

        webHookModel({
            text: res.locals.text,
            app: res.locals.app,
            user_agent: res.locals.user_agent,
            user_id: res.locals.user_id,
            can_contact: res.locals.can_contact,
            device_id: res.locals.device_id,
            version: res.locals.version,
            branch_name: res.locals.branch_name,
            matrix_sdk_version: res.locals.matrix_sdk_version,
            olm_version: res.locals.olm_version,
            device: res.locals.device,
            verbose_log: res.locals.verbose_log,
            multi_window: res.locals.multi_window,
            os: res.locals.os,
            locale: res.locals.locale,
            app_language: res.locals.app_language,
            default_app_language: res.locals.default_app_language,
            theme: res.locals.theme,
            server_version: res.locals.server_version,
            uuid: res.locals.uuid,
            timestamp: res.locals.timestamp,
            signature: res.locals.signature,
            label: res.locals.label,
            'compressed-log': res.locals['compressed-log'],
            file: res.locals.file,
        }).save((err, result) => {
            if (!err) {
                res.status(200).json({ status: 'success', message: 'Успешно!' });

                // // Convert timestamp to 00:00:00 format
                // let stamp = req.body.signature.timestamp;
                // let date = new Date(stamp * 1000);
                // let hours = date.getHours();
                // let minutes = "0" + date.getMinutes();
                // let seconds = "0" + date.getSeconds();

                // // Mailgun Variables
                // let time = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                // let sender = req.body['event-data'].envelope.sender
                // let targets = req.body['event-data'].envelope.targets
                // let id = req.body['event-data'].id
                // let description = ""
                // req.body['event-data']['delivery-status'].description != "" ?
                //     description = req.body['event-data']['delivery-status'].description :
                //     description = req.body['event-data']['delivery-status'].message
                // let code = req.body["event-data"]["delivery-status"].code

                // // Prepare Data and Send Report
                // const data = {
                //     from: 'Cryptelic Mailservice <app@cryptelic.com>',
                //     // to: `${sender}`, // uncomment to send emails to senders
                //     to: 'ecryptee@gmail.com', // forward to my email for testing purpose
                //     subject: 'Fehler bei der Zustellung',
                //     text: `Fehler bei der Zustellung folgender E-Mail. Bitte korrigieren Sie den Empfaenger und versuchen Sie es erneut. Sollte es weiterhin zu einem Problem kommen, leiten Sie diese Fehlermail bitte an forensic@lele-mail.de weiter und benachrichtigen Sie Ihren Kundenberater. \n\nUhrzeit: ${time} \n\nZugestellt: ${req.body['event-data'].event} \n\nToken: ${req.body.signature.token} \n\nEmpfänger: ${req.body['event-data'].recipient} \n\nFehlercode: ${JSON.stringify(req.body['event-data']['delivery-status'])} \n\nData: ${JSON.stringify(req.body['event-data'])}`,
                //     template: `${code}`,
                //     'h:X-Mailgun-Variables': JSON.stringify({
                //         targets: `${targets}`,
                //         time: `${time}`,
                //         id: `${id}`,
                //         description: `${description}`,
                //         code: `${code}`
                //     })
                // };

                // mg.messages().send(data, function (error, body) {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         console.log(body);
                //     }
                // });

                // // Define domain that is used for the webhook
                // let url = req.body["event-data"].storage.url,
                //     delimiter = '/',
                //     start = 5,
                //     tokens = url.split(delimiter).slice(start),
                //     result = tokens.join(delimiter),
                //     x = result.substr(0, result.lastIndexOf('/')),
                //     domain = x.substr(0, x.lastIndexOf('/'));

                // // Define job for 605 error code - remove bounced email address after 12 hours
                // agenda.define(`deleteAfter12Hours (605)`, { priority: 'high' }, async job => {
                //     console.log(`Deleting the bounced address ${targets} (605) ...`);
                //     mg.delete(`/${domain}/bounces/${targets}`, function (error, body) {
                //         if (error) {
                //             console.log(error);
                //             (async function () {
                //                 job.fail(new Error(error));
                //                 await job.save();
                //             })();
                //         } else {
                //             console.log(body);
                //         }
                //     });
                // });

                // // Define job for 602 error code - remove bounced email address immediately
                // agenda.define(`deleteImmediately (602)`, { priority: 'high' }, async job => {
                //     console.log(`Immediately purging the bounced address ${targets} (602) ...`);
                //     mg.delete(`/${domain}/bounces/${targets}`, function (error, body) {
                //         if (error) {
                //             console.log(error);
                //             (async function () {
                //                 job.fail(new Error(error));
                //                 await job.save();
                //             })();
                //         } else {
                //             console.log(body);
                //         }
                //     });
                // });

                // // Prepare regData to send report about registration
                // const regData = {
                //     from: 'Cryptelic IM <app@cryptelic.com>',
                //     to: 'cryptelic@gmail.com', // forward to my email for testing purpose
                //     subject: '+1 Registration',
                //     text: `Time: ${time} \n\nUser Email: ${targets}`
                // };

                // // Define job for 250 code - someone registered at cryptelic messenger
                // agenda.define(`registered! (250)`, { priority: 'high' }, async job => {
                //     console.log(`Report about registration of ${targets} (250) ...`);
                //     mg.messages().send(regData, function (error, body) {
                //         if (error) {
                //             console.log(error);
                //             (async function () {
                //                 job.fail(new Error(error));
                //                 await job.save();
                //             })();
                //         } else {
                //             console.log(body);
                //         }
                //     });
                // });

                // // IIFE for starting Agenda to distingish various error codes
                // (async function () {
                //     await agenda.start();
                //     switch (code) {
                //         case 605:
                //             await agenda.schedule('in 12 hours', [`deleteAfter12Hours (605)`], { domain: `${domain}`, email: `${targets}` });
                //             break;
                //         case 602:
                //             await agenda.now(`deleteImmediately (602)`, { domain: `${domain}`, email: `${targets}` });
                //             break;
                //         case 250:
                //             req.body['event-data'].message.headers.subject == "Your Cryptelic Validation Token" ?
                //                 await agenda.now(`registered! (250)`, { domain: `${domain}`, email: `${targets}` }) :
                //                 console.log(`250 - email subject: ${req.body['event-data'].message.headers.subject}`)
                //             break;
                //         default:
                //             console.log('skipping agenda')
                //     }
                // })();

            } else {
                console.log('error', err);
                res.status(400).json({ status: 'error', message: 'error adding record to database' });
            }
        });
    }

    public getWebHooksData(req: Request, res: Response) {

        webHookModel.find({}, (err, result) => {
            if (!err) {
                res.status(200).json({ status: 'success', message: 'Records fetched successfully', data: result });
            } else {
                console.log('error', err);
                res.status(400).json({ status: 'error', message: 'error getting records from database' });
            }
        });

    }

}

