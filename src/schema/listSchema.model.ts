import mongoose from 'mongoose';

const list = new mongoose.Schema({
    title : String,
    customProperty: [{
        title: String,
        fallbackValue : String,
    }],
});

export const List = mongoose.model ("list", list);