import { ServiceContext } from "./context";
import nconf from "nconf"
import { DockerManagerFactory } from "./docker-manager";
import { LogForwardFactory } from "./log-forward";

export function bootstrap() : ServiceContext{
    nconf.env()
    nconf.argv()
    nconf.defaults({
        socksPath: '/var/run/docker.sock',
        service_http_port: 8084
    })

    return {
        settings: nconf.get(),
        dockerManagerFactory: new DockerManagerFactory(),
        logForwardFactory: new LogForwardFactory()
    };
}