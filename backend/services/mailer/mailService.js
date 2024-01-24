const nodemailer = require('nodemailer')

const {userTemplates} = require('./templates/userMailTemplates')

class MailingService{
    constructor(){
        this.trasnsport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            } 
        })
    }
}

const sendEmail = async (email, subject, user) => {
    const mailerService = new MailingService()
    const mail = userTemplates["create"](email, subject, user)
    mailerService.trasnsport.sendMail(mail, (error, result) => {
        if(error){
            console.log(error)
            console.log("There was an error sending email")
        }else{
            console.log("Message sent it correctly")
        }
    })
}

module.exports = sendEmail
