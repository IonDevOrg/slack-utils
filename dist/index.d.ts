export declare class SlackObject {
    text: string;
    blocks: Array<object>;
    private key;
    constructor(key: string);
    init(text?: string): SlackObject;
    setText(text: string): SlackObject;
    addBlock(text: string): SlackObject;
    hasBlocks(): boolean;
    toJson(): object;
    send(): Promise<boolean>;
}
