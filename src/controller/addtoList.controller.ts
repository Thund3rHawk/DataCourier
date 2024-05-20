import { ListModel } from "../schema/listSchema.model";
import fs from 'fs';
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { csvParser } from "../utils/csvParser";

const addUsertoList = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { listTitle } = req.params;
        const list = await ListModel.findOne({ title: listTitle });

        if (!list) {
            return res.status(404).send({ message: 'List not found' });
        }
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }

        csvParser(req.file.path, list, async (rowCount, successCount, errors) => {
            await list.save();
            if (!req.file) {
                return res.status(400).send({ message: 'No file uploaded' });
            }
            fs.unlinkSync(`${req.file.path}`);  // Clean up the uploaded CSV file
            res.status(200).send({
                message: 'Users processed',
                successCount,
                errorCount: errors.length,
                totalUsersInList: list.users.length,
                errors
            })
        })
    }
    catch (e) {
        console.log("File is not added to list",e);
    }
})
export { addUsertoList };