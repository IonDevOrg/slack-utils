import axios from 'axios';

export class SlackObject {
    public text: string = '';
    public blocks: Array<object>;
    private key: string;
    private channel: string;

    constructor(key: string, channel: string = ''){
        this.key = key;
        this.blocks = [];
        this.channel = channel;
    }

    init(text: string = '') : SlackObject {
        if(text){
            this.addBlock(text);
            this.setText(text);
        }
        return this;
    }

    setText(text: string) : SlackObject {
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

    addBlock(text: string) : SlackObject {
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

    toJson() : object {
        let payload : any = {
            text: this.text,
            blocks: this.blocks
        }

        if(this.channel.trim()){
            payload['channel'] = '#' + this.channel
        }

        return payload;
    }

    send() : Promise<boolean> {
        let vm: SlackObject = this
        return new Promise((resolve, reject) => {
            if(!vm.hasBlocks()){
                reject(new Error("No blocks to send"))
            }

            if(!vm.text){
                reject(new Error("No text set"))
            }
            
            if(!vm.key){
                reject(new Error("No API key set"))
            }

            axios.post(vm.key, vm.toJson()).then(() => {
                resolve(true)
            })
            .catch((err:any) => {
                reject(err)
            })
        })
    }
}