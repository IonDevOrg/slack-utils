import axios from 'axios';

export class SlackFormatter {
    public text: string;
    public blocks: Array<object>;

    constructor(text = null){
        this.blocks = [];
        if(text != null){
            this.addBlock(text);
            this.setText(text);
        }
    }

    setText(text){
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

    addBlock(text){
        this.blocks.push({
            type: "section",
            text: {
                type: "mrkdwn",
                text: text               
            }
        });
        return this;
    }

    hasBlocks(){
        return this.blocks.length > 0;
    }

    toJson(){
        return {
            text: this.text,
            blocks: this.blocks
        }
    }
}

export class Slack {
    private key: string;
    private client: any;
    private items: any;

    constructor(slackUrl: string){
        this.key = slackUrl;
        this.client = axios.create({
            baseURL: this.key,
            timeout: 90000,
        });
    }

    setItems(items: any){
        this.items = items;
        return this;        
    }

    send(slackObject: any){
        return this.client.post('', slackObject.toJson())
    }
}