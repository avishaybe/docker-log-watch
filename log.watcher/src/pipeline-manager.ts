import { ServiceContext } from "./context";
import { IPipelineRequest } from "./data-types";
import { DockerManager } from "./docker-manager";
import uuid from "node-uuid";

export class PipelineManager { 
    private static _category = "PipelineManager";
    private _context: ServiceContext;
    private _knownContainers: DockerManager[];
    private _containerPrefix;

    constructor(context: ServiceContext) {
        this._context = context;
        this._knownContainers = [];
        this._containerPrefix = `Pipeline-${uuid.v4()}`;
    }

    public async start(): Promise<void>{
        const funcName = "start"
        console.info(PipelineManager._category, funcName, ": Seriice has started");
    }

    public async stopContainers(): Promise<void>{
        const funcName = "stopContainers";
        console.info(PipelineManager._category,funcName,": Started, Going to stop all containers");
        return await Promise.all(this._knownContainers.map(c => c.stop())).then(() => undefined);
    }

    public async handleStartNewPipeline(req: any): Promise<void>{
        const funcName = "handleStartNewPipeline";
        console.log(PipelineManager._category,funcName, ": Started with the following request", req.body);
        let requesInfo : IPipelineRequest = req.body;

        // Going to initiate the given docker.
        let dm = this._context.dockerManagerFactory.create(this._context);
        let stream = await dm.run({
            image: requesInfo.imageName,
            name: `${this._containerPrefix}-${uuid.v4()}`
        });

        this._knownContainers.push(dm);
        let logForward = this._context.logForwardFactory.create(requesInfo.logForward.type)
        let forwardStream = logForward.createStream(requesInfo.logForward);
        stream.pipe(forwardStream);
    }
}