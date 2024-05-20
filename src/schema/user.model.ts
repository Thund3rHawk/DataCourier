import mongoose, { Document, Schema } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  properties: Record<string, string>;
}

export const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: String,
  properties: { type: Map, of: String, required: true },
});

export const userDetails = mongoose.model<User>('User', UserSchema);
