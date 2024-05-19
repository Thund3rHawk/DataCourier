import mongoose from 'mongoose';
import { userDetails } from './user.model';

const list = new mongoose.Schema({
    title : {type: String, required: true, unique: true},
    customProperty: [{
        title: String,
        fallbackValue : String,
    }],
    users: [userDetails],
});

export const ListSchema = mongoose.model ("list", list);