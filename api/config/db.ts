// require("dotenv").config();
import mongoose, { ConnectOptions, MongooseError } from 'mongoose';

const connectDb = () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Database really connected');
    return;
  }
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
  const db = mongoose.connection;
  db.on('error', (error: MongooseError) => {
    console.log('Database error', error);
  });
  db.once('connected', () => {
    console.log('Database connected');
  });
};

export default connectDb;
