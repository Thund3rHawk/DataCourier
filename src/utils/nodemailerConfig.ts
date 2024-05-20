import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport ({
    host: 'smtp.gmail.com',
    port: 587, 
    secure: false,
    auth:{
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_EMAIL_PASS,
    }
})

transporter.verify ((err, success)=>{
    if (err){
        console.log ("Verify Error:", err);
    }
    else{
        console.log ("Ready for message")
        console.log (success);
    }
})

export function sendEmail(email:string, name:string, city?:String) {
    const mailOptions = {
        from: process.env.AUTH_EMAIL, 
        to: email,
        subject: 'MathonGo Greetings! ',
        text: `Hey ${name}!

            Thank you for signing up with your email ${email}. We have received your city as ${city}.
        
            Team MathonGo.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}