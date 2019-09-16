import { Writable } from "stream";
import { LogForwardOptions } from "./data-types";
import { createWriteStream } from "fs";

export interface LogForward {
    createStream(opts: LogForwardOptions): Writable;
}

export class LogForwardFactory{
    public create(type: string): LogForward {
        switch(type){
            case "fs":
                return new FSLogForward();
            default:
                throw `Got unknown type ${type}`;

        }
    }
}

export interface FSLogForwardOptions extends LogForward{
    path: string;
}

export function isFSLogForwardOptiopns(obj: any): obj is FSLogForwardOptions{
    return obj != null && obj.type === "fs" && typeof (obj.path) === "string";
}

class FSLogForward implements LogForward{
    private static _category = "FSLogForward";

    createStream(opts: LogForwardOptions): Writable {
        const funcName = "createStream";
        console.log(FSLogForward._category,funcName,": Started with the following options:",opts);
        if(!isFSLogForwardOptiopns(opts)){
            console.error(FSLogForward._category,funcName,"Options object is not FileSystem options");
            throw new Error("Options object is not FileSystem options");
        }
        return createWriteStream(opts.path);
    }
}