import { Slack, SlackFormatter } from ".";
const SLACK_URL: string = process.env.SLACK_URL;

async function main(){
    let slack = new Slack(SLACK_URL);
    //
    let slackFormatter = new SlackFormatter(`New tests`);
    slackFormatter.addBlock(`No files`); //.addBlock(`No files 2`);
    //
    slack.setFormatter(slackFormatter);
    await slack.send();
}

(main())