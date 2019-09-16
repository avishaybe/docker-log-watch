import { DockerManagerFactory } from "./docker-manager";
import { LogForwardFactory } from "./log-forward";

export type ServiceContext = {
    settings: any;
    dockerManagerFactory: DockerManagerFactory
    logForwardFactory: LogForwardFactory;
}