import axios from 'axios';

export class SlackFormatter {
    public text: string;
    public blocks: Array<object>;

    constructor(text: string = ''){
        this.blocks = [];
        if(text){
            this.addBlock(text);
            this.setText(text);
        }
    }

    setText(text: string) : SlackFormatter{
        this.text = text;
        
        if(this.blocks.length == 0){
            this.addBlock(text);
        }else{
            this.blocks[0] = {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: text               
                }
            }
        }

        return this;
    }

    addBlock(text: string) : SlackFormatter{
        this.blocks.push({
            type: "section",
            text: {
                type: "mrkdwn",
                text: text               
            }
        });
        return this;
    }

    hasBlocks() : boolean {
        return this.blocks.length > 0;
    }

    toJson() : any {
        return {
            text: this.text,
            blocks: this.blocks
        }
    }
}

export class Slack {
    private key: string;
    private slackObject: SlackFormatter;
    
    constructor(slackUrl: string){
        this.key = slackUrl;
    }

    setFormatter(slackObject: SlackFormatter) : Slack{
        this.slackObject = slackObject;
        return this;        
    }

    send() : any {
        return axios.post(this.key, this.slackObject.toJson())
    }
}