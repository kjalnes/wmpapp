const app = require('express').Router();
const conn = require('../db/conn');
const cron = require('node-cron');
const { Exchange, Teacher, Class } = require('../db/index.js').models;
const { generateEmail } = require('../utils/email/exchange');
const { sendEmail } = require('../utils/email/smtp');


// job runs every day at midnight
// will cancel all pending exchanges that has not been confirmed by both teacher before the
// verifyExchangeExpires date stamp has expired (7 days)

// 0 0 0 * * *

const date = new Date();

cron.schedule('00 10 * * * *', function() {

    Exchange.findAll({
        where: {
            status: 'pending',
            // verifyExchangeExpires: { $lte: new Date() }
            verifyExchangeExpires: { $lte: date.setDate(date.getDate() + 8) }
        },
        include: [
            {
                model: Class,
                as: 'sender',
                include: [ Teacher ]
            },
            {
                model: Class,
                as: 'receiver',
                include: [ Teacher ]
        }]
    })
    .then(exchanges => {
        // set exchange status to cancelled
        // set senderId and receiverId to null
        // set senderVerified and receiverVerified to null
        // send email to both teachers
        // send email to WMP to notify about cancelled exchange

        Promise.all(exchanges.map(exchange => {
            return conn.transaction((t) => {
                exchange.status = 'cancelled';
                exchange.senderId = null;
                exchange.receiverId = null;
                exchange.receiverVerified = false;
                exchange.senderVerified = false;
                exchange.verifyExchangeExpires = null;
                return exchange.save({ transaction: t })
                .then((exchange) => {
                    const senderClass = exchange.dataValues.sender.dataValues;
                    const senderEmail = senderClass.teacher.dataValues.email;
                    const receiverClass = exchange.dataValues.receiver.dataValues;
                    const receiverEmail = receiverClass.teacher.dataValues.email;
                    const template = 'exchangeNotVerified';
                    const mailOptionsToWMP = {
                        to : process.env.MAIL_ID,
                        from: process.env.MAIL_ID,
                        subject : "An exchange has been cancelled",
                        html : `Exchange cancelled for exchange with ID ${exchange.dataValues.id}`
                    };

                    return Promise.all([
                        generateEmail(null, senderEmail, template, classData=senderClass, { transaction: t }),
                        generateEmail(null, receiverEmail, template, classData=receiverClass, { transaction: t }),
                        sendEmail(null, mailOptionsToWMP)
                    ])
                    .then(() => {
                        return exchange
                    })
                }, { transaction: t })
                .catch((error) => {
                    throw new Error(error)
                })
            });
        }));
    });
});

module.exports = app;
