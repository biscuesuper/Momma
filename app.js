/* Project: Catbot 
*  Level: Simple
*  Name: Momma
*  Description: "Momma" is a simple chatbot which helps young people (who just moved out of their parents house) 
*               learn how to do some basic chores. "Momma" helps users by telling them how to cook stuff, 
*               clean the house, wash clothes and even give some maternal advice from time to time.
*/

var restify = require('restify');
var builder = require('botbuilder');

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

// Some string samples
var answer_hello = "Hello, dear! How can Momma help you?";
var answer_howareyou = "Oh my, let's not talk about me. I'm sure you need something. Tell me how can I help you?";
var answer_food = "Sweet child, are you hungry? Momma can help you with that! What would you like to eat?";
var answer_default = "What do you mean \" %s \" ?";

// Create bot part
var bot = new builder.UniversalBot(connector, function (session) {
    if (session.message.text) {
        switch (session.message.text.toLowerCase()) {
            // hello messages
            case 'hello':
                session.send(answer_hello);
                break;
            case 'hi':
                session.send(answer_hello);
                break;
            case 'good morning':
                session.send(answer_hello);
                break;

            //how are you messages
            case 'how are you':
                session.send(answer_howareyou);
                break;
            case 'what are you doing':
                session.send(answer_howareyou);
                break;
            case 'what\'s upp':
                session.send(answer_howareyou);
                break;
            case 'how was your day':
                session.send(answer_howareyou);
                break;

            //food
            case 'i want food':
                session.send(answer_food);
                break;
            case 'i am hungry':
                session.send(answer_food);
                break;
            case 'feed me':
                session.send(answer_food);
                break;
            case 'food':
                session.send(answer_food);
                break;
            //default
            default:
                session.send(answer_default);
                break;

        }
    }
});
