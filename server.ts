import App from './app';
import { webHookRoutes } from './api/v1/webHooks/index';

const app = new App([
    new webHookRoutes(),
]);

app.start();
