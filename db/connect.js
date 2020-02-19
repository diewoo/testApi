import mongoose from 'mongoose';
import keys from '../config/keys';

mongoose.Promise = global.Promise;

const connectToDb = async() => {
    try {
        await mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
        console.log(err)
    }
}

export default connectToDb;