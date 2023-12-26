const path = require('path');

const ENV_FILE = path.join(__dirname, './.env');

require('dotenv').config({ path: ENV_FILE });

const express = require('express');

const {
    CloudAdapter,
    ConfigurationBotFrameworkAuthentication
} = require('botbuilder');

const { AttachmentsBot } = require('./bots/attachmentsBot');

const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
    process.env
);

const adapter = new CloudAdapter(botFrameworkAuthentication);

adapter.onTurnError = async (context, error) => {
    console.error('\n [onTurnError] unhandled error:' + error);
    await context.sendTraceActivity(
        'OnTurnError Trace https://www.botframework.com/schemas/error' + error + 'TurnError'
    );
    await context.sendActivity('The bot encountered an error or bug.');

    await context.sendActivity(
        'To continue to run this bot, please fix the bot source code.'
    );
};

const bot = new AttachmentsBot();

const port = process.env.PORT || 3979;
const app = express();

app.use(express.json());

app.listen(port || process.env.PORT || 3979, function() {
    console.log(
        '\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator'
    );

    console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
});
app.get('/api',async(req,res)=>{
     res.send('the app is running');
});
app.post('/api/messages', async (req, res) => {
    const activity = req.body;
    res.send('working');
    console.log(typeof activity.type);
    await adapter.process(req, res, (context) => bot.run(context));
});
