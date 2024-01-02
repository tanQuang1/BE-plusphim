import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user_id?: string | mongoose.Types.ObjectId;
    }
  }
}
