import express from 'express';
import { createList } from '../controller/createList.controller';
import { addUsertoList } from '../controller/addtoList.controller';

const route = express.Router();

route.route('/').post(createList);
route.route ('/:listTitle/users').post(addUsertoList);

export {route};