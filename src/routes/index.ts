import express from 'express';
import { createList } from '../controller/createList.controller';
import { addUsertoList } from '../controller/addtoList.controller';

const route = express.Router();
export const maxDuration = 20;


route.route('/post').post(createList);
route.route ('/:listTitle/users').post(addUsertoList);

export {route};