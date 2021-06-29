import { SlackObject } from "."
require('dotenv').config()

const SLACK_URL: any = process.env.SLACK_URL;

async function main(){
    let slack = new SlackObject(SLACK_URL);
    slack
    .init(`New tests`)
    .addBlock(`No files`) 
    .addBlock(`No files 2`);
    await slack.send();
}

(main())