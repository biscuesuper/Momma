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


// Create bot part
var bot = new builder.UniversalBot(connector, function (session) {
    if (session.message.text) {
        switch (session.message.text.toLowerCase()) {
            case 'hello':
                session.send("Hello, dear! How can Momma help you?");
                break;
            case 'how are you':
                session.send("Oh my, let's not talk about me. I'm sure you need something. Tell me how can I help you?");
                break;
            default:
                session.send("What do you mean \" %s \" ?", session.message.text);
                break;

        }
    }
});
