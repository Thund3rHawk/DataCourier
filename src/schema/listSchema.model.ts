import mongoose, { Document, Schema } from 'mongoose';
import { UserSchema, User } from './user.model';

interface CustomProperty {
  title: string;
  fallbackValue: string;
}

interface List extends Document {
  title: string;
  customProperties: CustomProperty[];
  users: User[];
}

const CustomPropertySchema: Schema = new Schema({
  title: { type: String, required: true },
  fallbackValue: { type: String, required: true },
});

const ListSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  customProperties: [CustomPropertySchema],
  users: [{ type: UserSchema }],
});

export const ListModel = mongoose.model<List>('List', ListSchema);
