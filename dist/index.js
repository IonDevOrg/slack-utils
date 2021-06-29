"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlackObject = void 0;
var axios_1 = __importDefault(require("axios"));
var SlackObject = /** @class */ (function () {
    function SlackObject(key) {
        this.text = '';
        this.key = key;
        this.blocks = [];
    }
    SlackObject.prototype.init = function (text) {
        if (text === void 0) { text = ''; }
        if (text) {
            this.addBlock(text);
            this.setText(text);
        }
        return this;
    };
    SlackObject.prototype.setText = function (text) {
        this.text = text;
        if (this.blocks.length == 0) {
            this.addBlock(text);
        }
        else {
            this.blocks[0] = {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: text
                }
            };
        }
        return this;
    };
    SlackObject.prototype.addBlock = function (text) {
        this.blocks.push({
            type: "section",
            text: {
                type: "mrkdwn",
                text: text
            }
        });
        return this;
    };
    SlackObject.prototype.hasBlocks = function () {
        return this.blocks.length > 0;
    };
    SlackObject.prototype.toJson = function () {
        return {
            text: this.text,
            blocks: this.blocks
        };
    };
    SlackObject.prototype.send = function () {
        var vm = this;
        return new Promise(function (resolve, reject) {
            if (!vm.hasBlocks()) {
                reject(new Error("No blocks to send"));
            }
            if (!vm.text) {
                reject(new Error("No text set"));
            }
            if (!vm.key) {
                reject(new Error("No API key set"));
            }
            axios_1.default.post(vm.key, vm.toJson()).then(function () {
                resolve(true);
            })
                .catch(function (err) {
                reject(err);
            });
        });
    };
    return SlackObject;
}());
exports.SlackObject = SlackObject;
