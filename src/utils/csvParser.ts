import csv from 'csv-parser';
import fs from 'fs';
import { sendEmail } from './nodemailerConfig';
import { List } from '../schema/listSchema.model';
import { User, userDetails } from '../schema/user.model';



// This finction converts csv to json
export function csvParser (filePath: String, list: List, callback: (rowCount: number, successCount: number, errors: { row: number, error: string }[]) => void){
    const result: User[] = [];
    const errors: {row: number, error: string}[] = [];
    let rowCount = 0;
    let successCount = 0;

    fs.createReadStream (`${filePath}`)
        .pipe(csv())
        .on('data', (data)=> {
            result.push (data)
            const user: User = new userDetails({ 
                name: data.name, 
                email: data.email, 
                city: data.city, 
                properties: {}
            }) ;
            list.customProperties.forEach(prop => {
                console.log (prop.title);
                const value = data[prop.title] || prop.fallbackValue;
                user.properties[prop.title] = String(value); 
              });
              try {   
                  list.users.push(user);
                  successCount++;                
              } catch (err) {
                console.log (`csvParser function Row: ${rowCount}, Error: ${err}`);
              }
        })
        .on('error', (error) => {
            errors.push({ row: rowCount, error: error.message });
          })
        .on ('end', ()=>{
            callback(rowCount, successCount, errors);
        });
    return result;
}
