# slack-sudo-bot
A baby slack bot in node.js

### Setup

In the terminal type `npm install @slack/client --save` to install the Slack SDK

Add your Bot token in the index.js file 

`var rtm = new RtmClient('xoxb-************************');`

Still in the index.js file, inside the AUTHENTICATED event listener, input your bot name.

`if (c.is_member && c.name === 'your-bot-name')` 

### Run

In the terminal run:

`node index.js`

### Credit

Based on this [article](https://code.tutsplus.com/articles/building-a-slack-bot-using-nodejs--cms-29444) from Jamie Munro.
