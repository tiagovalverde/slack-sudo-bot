//dependencies
var RtmClient = require('@slack/client').RtmClient; //bot object
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS; //events to listen
var RTM_EVENTS = require('@slack/client').RTM_EVENTS; //

let channel;
let bot;

//initialize bot
var rtm = new RtmClient('xoxb-************************');
rtm.start();

//event listener - once bot is autheticated
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    for (const c of rtmStartData.channels) {
        //HERE INPUT YOUR BOT NAME
        if (c.is_member && c.name === 'sudobot') {
            channel = c.id //extract channel id
        }
    }
    bot = '<@' + rtmStartData.self.id + '>'; //extract bot name
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

// event listener - on successful connection
rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
    rtm.sendMessage("Hello! I am Sudo Bot! What we do over here??", channel);
});

// event listener - track any message in the channel
rtm.on(RTM_EVENTS.MESSAGE, function (message) {
    if (message.channel === channel) {
        if (message.text !== null) {
            var pieces = message.text.split(' ');

            if (pieces.length > 1) {
                //if a user tagged the bot on the message
                if (pieces[0] === bot) {
                    var response = '<@' + message.user + '>';
                    //list of commands the bot can perform
                    switch (pieces[1].toLowerCase()) {
                        case "jump":
                            response += '"Kris Kross will make you jump jump"';
                            break;
                        case "help":
                            response += ', currently I support the following commands: jump, joke, hodl';
                            break;
                        case "joke":
                            response += ', becoming a vegetarian is a huge missed steak.';
                            break;
                        case "hodl":
                            response += ', Yes please!!!! Crypto is mooning!';
                            break;
                        default:
                            response += ', sorry I do not understand the command "' + pieces[1] + '". For a list of supported commands, type: ' + bot + ' help';
                            break;
                    }
                    //bot is thinking...
                    setTimeout(() => {
                        rtm.sendMessage(response, message.channel);
                    }, 2000);
                }
            }
        }
    }
});