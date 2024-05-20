import mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: {type: String, require: true},
    email : {type: String, unique: true},
    city: {type:String},
    properties: {type: Map, of: String},
});

export const userDetails = mongoose.model ('user', user);