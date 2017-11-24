/* Project: Catbot 
*  Level: Simple
*  Name: Momma
*  Description: "Momma" is a simple chatbot which helps young people (who just moved out of their parents house) 
*               learn how to do some basic chores. "Momma" helps users by telling them how to cook stuff, 
*               clean the house, wash clothes and even give some maternal advice from time to time.
*/

var restify = require('restify');
var builder = require('botbuilder');

// My JSON files : info + simple messages + cards
var appInfo = require('./appinfo.json');
var messages = require('./messages.json');
var foodcard = require('./foodcard.json'); 
var laundrycard = require('./laundrycard.json');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var MicrosoftAppId = appInfo.appId;
var MicrosoftAppPassword = appInfo.appPass;

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
        msg = session.message.text.toLowerCase();

        // Case 'Hello'
        if (msg.match('hello')
            || msg.match('hi')
            || msg.match('good morning')
            || msg.match('hey')) {
            session.send(messages.hello);
        }

        // Case 'About the bot'
        else if (msg.match('you')
            || (msg.match('what') && msg.match('up'))) {
            session.send(messages.you);
        }

        // Case 'Something sweet' 
        else if (msg.match('cake')
            || msg.match('sweet')
            || msg.match('candy')
            || msg.match('chocolate')
            || msg.match('pancakes')) {
            session.send(messages.sweet);
        }

        // Case 'Food' + Adaptive card
        else if (msg.match('food')
            || msg.match('hungry')
            || msg.match('recipe')
            || msg.match('cook')
            || msg.match('eat')) {
            session.send(messages.food);
            session.send(foodcard);
        }

        // Case 'Laundry' + Adaptive card
        else if (msg.match('laundry')
            || msg.match('wash')
            || msg.match('clean')
            || msg.match('clothes')) {
            session.send(messages.laundry);
            session.send(laundrycard);
        }

        // Case 'Unknown'
        else {
            session.send(messages.default);
        }
    }
});
