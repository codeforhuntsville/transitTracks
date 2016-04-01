'use strict';

var postmark = require('postmark')(process.env.POSTMARK_API_KEY);

function send(to, subject, message, response) {
    postmark.send({
        From: 'contact@hoparoundhuntsville.com',
        To: to,
        Cc: 'hsvtransitdev@gmail.com',
        Subject: subject,
        TextBody: message,
        Tag: 'message from user on Hop Around Huntsville'
    }, function (error) {
        var rtnmess;
        var rdata;

        if (error) {
            if (response) {
                rdata = JSON.stringify({ error: error });
                response.writeHead(401, { 'Content-Type': 'application/json' });
                response.write(rdata);
            }
            return;
        }

        rtnmess = { success: 'sent', to: 'glmason.lm@gmail.com', message: message };
        if (response) {
            rdata = JSON.stringify(rtnmess);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(rdata);
            response.end();
        }
    });
}

exports.send = send;
