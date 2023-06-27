const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '922189841837-oi0gda092lo86dmbs2o2s3nt0keucaah.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04w_jWK1yknKJCgYIARAAGAQSNwF-L9IrSIjUI75Dgmvj-OlFkZfQQ95BzNTo57WCJeqlOF96apDXQx4aAkOxeWqCekIVa8QPQNw';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refesh_token: REFRESH_TOKEN })

async function sendMail(){
    try {
        const accessToken = await oAuth2Client.getAccessToken()
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAuth2',
                user: 'ksarathe9@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'ksarathe9@gmail.com',
            to: 'jainsaab0002@gmail.com',
            subject: 'Jain saab ko raammmmm',
            text: 'API ki taraf se Rammmm bhiyaaa kai haal chaal',
            html: '<h1>API ki taraf se Rammmm bhiyaaa kai haal chaal</h1>'
        };
        const result = await transport.sendMail(mailOptions)
        return result;
    } catch (error) {
        return error
    }
}
sendMail().then((result) => console.log('Email Sent...', result))
.catch((error) => console.log(err.message))