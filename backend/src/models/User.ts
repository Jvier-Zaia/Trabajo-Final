import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/User.interface';

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);