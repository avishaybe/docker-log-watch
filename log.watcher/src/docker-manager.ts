import { Docker } from "node-docker-api"
import { ServiceContext } from "./context";
import { Stream } from "stream";

export class DockerManagerFactory {
    public create(context: ServiceContext){
        return new DockerManager(context);
    }
}

export type DockerRunOptions  = {
    image: string;
    name: string;
}

export class DockerManager {
    private static _category = "DockerManager";
    private _context: ServiceContext;
    private _docker: any;
    private _container: any;
    
    constructor(context: ServiceContext){
        this._context = context;
        this._docker = new Docker({
            socketPath: context.settings.socksPath, 
        });
        this._container = null;
    }

    public async run(options: DockerRunOptions): Promise<Stream>{
        const funcName = "run";
        console.log(DockerManager._category,funcName,": Started with the following options:", options);
        this._container = await this._docker.container.create({
            Image: options.image,
            name: options.name
        });
        await this._container.start();
        return this._container.logs({
            stdout: true,
            stderr: true,
            follow: true
        });
    }

    public async stop(): Promise<void>{
        const funcName = "stop";
        try{
            await this._container.stop();
            await this._container.delete({force: true});
        }
        catch(e){
            console.error(DockerManager._category,funcName,": Got Exception ", e);
        }
    }
}