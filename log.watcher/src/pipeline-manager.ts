import { ServiceContext } from "./context";

export class PipelineManager { 
    private static _category = "PipelineManager";
    private _context: ServiceContext

    constructor(context: ServiceContext) {
        this._context = context;
    }

    public async handleStartNewPipeline(req: any): Promise<void>{
        const funcName = "handleStartNewPipeline";
        console.log(PipelineManager._category,funcName, ": Started");
    }
}