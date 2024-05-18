import nodemailer from 'nodemailer'
import 'dotenv/config'


export const transporter = nodemailer.createTransport ({
    host: 'smtp.gmail.com',
    auth:{
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_EMAIL_PASS,
    }
})

transporter.verify ((err, success)=>{
    if (err){
        console.log ("Nodemailer error: ",err);
    }
    else{
        console.log ("Ready for message")
        console.log (success);
    }
})

export function sendOTP(email:string, driveLink:string) {
    const mailOptions = {
        from: process.env.AUTH_EMAIL, 
        to: email,
        subject: 'Certificate Link',
        text: `Your Certificate Drivelink is: ${driveLink}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}