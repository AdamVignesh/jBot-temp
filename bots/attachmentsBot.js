const { ActivityHandler, ActivityTypes } = require('botbuilder');

class AttachmentsBot extends ActivityHandler {
    constructor() {
        super();

        // this.onMembersAdded(async (context, next) => {
        //     const membersAdded = context.activity.membersAdded;

        //     for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        //         if (membersAdded[cnt].id !== context.activity.recipient.id) {
        //             console.log('id ' + context.activity.recipient.id);
        //             await context.sendActivity('Hey Adam, This is Janet');

        //             await context.sendActivity(
        //                 'Alternatively, I can send you an attachment.'
        //             );
        //             await next();
        //         }
        //     }
        // });

        this.onMessage(async (context, next) => {
            await this.handleIncomingChat(context);
            await next();
        });
    }

    async handleIncomingChat(turnContext) {
        const reply = { type: ActivityTypes.Message };
        reply.Message = 'hello';
        // const inputMessage = turnContext.activity.text;
        reply.attachments = [this.getInternetAttachment()];
        await turnContext.sendActivity(reply);
    }

    getInternetAttachment() {
        return {
            name: 'architecture-resize.png',

            contentType: 'image/png',

            contentUrl:
                'https://dzncpytds8xwj.cloudfront.net/janet-assets/birthday/birthday-1700368200000.png'
        };
    }
}

module.exports.AttachmentsBot = AttachmentsBot;
