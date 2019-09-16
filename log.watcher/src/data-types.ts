

export interface LogForwardOptions {
    type: "fs",
}

export interface IPipelineRequest {
    imageName: string,
    logForward: LogForwardOptions
}
