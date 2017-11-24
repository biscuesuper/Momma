/* Project: Catbot 
*  Level: Simple
*  Name: Momma
*  Description: "Momma" is a simple chatbot which helps young people (who just moved out of their parents house) 
*               learn how to do some basic chores. "Momma" helps users by telling them how to cook stuff, 
*               clean the house, wash clothes and even give some maternal advice from time to time.
*/

var restify = require('restify');
var builder = require('botbuilder');
var messages = require('./messages.json');
var foodcard = require('./foodcard.json'); 

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var MicrosoftAppId = '221e4e95-3e5a-48f3-8390-2928b0854040'
var MicrosoftAppPassword = 'xzosbaT72605(bGDJMXV;[]'

var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    stateEndpoint: process.env.BotStateEndpoint,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Create bot part
var bot = new builder.UniversalBot(connector, function (session) {
    if (session.message.text) {
        switch (session.message.text.toLowerCase()) {
            // hello messages
            case 'hello':
            case 'hi':
            case 'good morning':
                session.send(messages.hello);
                break;

            //how are you messages
            case 'how are you':
            case 'what are you doing':
            case 'what\'s upp':
            case 'how was your day':
                session.send(messages.howareyou);
                break;

            //food
            case 'i want food':
            case 'i am hungry':  
            case 'feed me':  
            case 'food': {
                session.send(messages.food);
         //       var msg = new builder.Message(session).addAttachment(foodcard);
                var attachment = session.message.attachments[0];
                session.send(foodcard);
                break;
                }
            case 'cake':
            case 'pie':
            case 'candy':
                session.send(messages.cake);
                break;

            //default
            default:
                session.send(messages.default);
                break;

        }
    }
});
