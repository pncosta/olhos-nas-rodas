const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

const SENDGRID_API_KEY = functions.config().sendgrid.key
const MY_EMAIL = "geral@olhosnasrodas.pt"

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers('{{', '}}');

exports.httpEmail = functions.https.onRequest((req, res) => {

    cors( req, res, () => { 
        const toEmail = req.body.toEmail;
        const toUsername  = req.body.toUsername;
        const fromUsername  = req.body.fromUsername;
        const fromEmail  = req.body.fromEmail;
        const message = req.body.message;
        const dateSent = req.body.dateSent;
        sgMail.setSubstitutionWrappers('{{', '}}');
        const msg = {
            to: toEmail,
            from: { email: MY_EMAIL, name: 'Olhos nas Rodas'},
            reply_to: { email: fromEmail, name: fromUsername},
            message: message,
            templateId: 'd-a1801417fe22451299ee067c92920928',
            substitutionWrappers: ['{{', '}}'],
            dynamic_template_data: 
            {
               "toUsername": toUsername,
               "fromUsername": fromUsername,
               "fromEmail": fromEmail,
               "message": message,
               "dateSent": dateSent
            }
        };  
        return sgMail.send(msg)     
            .then(r => res.status(200).send(r) )
            .catch(err => res.status(400).send(err) )
        });
});


exports.httpContactusEmail = functions.https.onRequest((req, res) => {
    
        cors( req, res, () => { 
            const fromName  = req.body.fromName;
            const fromEmail  = req.body.fromEmail;
            const subject = req.body.subject;
            const message = req.body.message;
            const dateSent = req.body.dateSent;
            sgMail.setSubstitutionWrappers('{{', '}}');
            const msg = {
                to: MY_EMAIL,
                from: { email: MY_EMAIL, name: 'Olhos nas Rodas'},
                reply_to: { email: fromEmail},
                message: message,
                templateId: 'd-0e95e3a0d2344cc5b8877bf5a9301c80',
                substitutionWrappers: ['{{', '}}'],
                dynamic_template_data: 
                {
                   "fromName": fromName,
                   "fromEmail": fromEmail,
                   "subject": subject,
                   "message": message,
                   "dateSent": dateSent
                }
            };  
            return sgMail.send(msg)     
                .then(r => res.status(200).send(r) )
                .catch(err => res.status(400).send(err) )
            });
    });