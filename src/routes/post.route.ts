import express from 'express';
import { createList } from '../controller/createList.controller';

const route = express.Router();

route.route('/').post(createList);

export {route};