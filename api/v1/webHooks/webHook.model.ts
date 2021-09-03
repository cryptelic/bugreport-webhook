import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const webHookSchema = new Schema({
    text: { type: Object, default: [] },
    app: { type: Object, default: [] },
    user_agent: { type: Object, default: [] },
    user_id: { type: Object, default: [] },
    can_contact: { type: Object, default: [] },
    device_id: { type: Object, default: [] },
    version: { type: Object, default: [] },
    branch_name: { type: Object, default: [] },
    matrix_sdk_version: { type: Object, default: [] },
    olm_version: { type: Object, default: [] },
    device: { type: Object, default: [] },
    verbose_log: { type: Object, default: [] },
    multi_window: { type: Object, default: [] },
    os: { type: Object, default: [] },
    locale: { type: Object, default: [] },
    app_language: { type: Object, default: [] },
    default_app_language: { type: Object, default: [] },
    theme: { type: Object, default: [] },
    server_version: { type: Object, default: [] },
    uuid: { type: Object, default: [] },
    timestamp: { type: Object, default: [] },
    signature: { type: Object, default: [] },
    label: { type: Object, default: [] },
    'compressed-log': { type: Object, default: [] },
    'file': { type: Object, default: [] }
});

export const webHookModel = mongoose.model('webhooks', webHookSchema);
