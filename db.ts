import * as Mongoose from 'mongoose';

class DB {
    public db;

    constructor(Promise, Mongoose, env, config) {
        Mongoose.Promise = Promise;
        this.db = config[env.instance].db;
    }

    public connectDB() {
        Mongoose.connect(this.db.url, this.db.options, err => {
            if (err) {
                console.log('DB Connection: DB Error', err);
                process.exit(1);
            } else {
                console.log('DB Connection: MongoDB Connected Successfully');
            }
        });
    }
}

export default DB;
