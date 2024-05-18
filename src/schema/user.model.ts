import mongoose from 'mongoose';
import { List } from './listSchema.model';

const user = new mongoose.Schema({
    userName: String,
    email : {type: String, unique: true},
    properties: Map,
    listId : List,
});

export const userDetails = mongoose.model ('user', user);