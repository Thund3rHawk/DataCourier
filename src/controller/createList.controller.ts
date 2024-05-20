import { RequestHandlerParams } from 'express-serve-static-core';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
import { ListModel } from '../schema/listSchema.model';


const createList: RequestHandlerParams = asyncHandler(async (req:Request,res:Response)=>{
    try {
        const {title, customProperty} = req.body;
        const list = new ListModel({title: title, customProperties:customProperty, users: []});
        await list.save();
        res.status(201).send ("List Created Successfully");
    } 
    catch (error) {
        console.log ("Error Creating List:", error);    
    }
})

export {createList};