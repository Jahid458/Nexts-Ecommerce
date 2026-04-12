import nodemailer from "nodemailer";

export const sendMail = async (subject , reciver, body) => {
    const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: Number(process.env.NODEMAILER_PORT),
        secure: false,
        auth:{
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS
        }
    })


    const options = {
        from: `Developer jahid <${process.env.NODEMAILER_EMAIL}>`,
        to: reciver,
        subject: subject,
        html: body
    }

    try{
        await transporter.sendMail(options)
        return {success: true}
    }
    catch(error){
        return {success: false, message: error.message}
    }


}