import { PipelineManager } from "./pipeline-manager";
import { bootstrap } from "./bootstrap";

import express from "express";
import bodyParser from "body-parser"

const app: express.Application = express();
const category = "[Log-Watcher-Main]"


const context = bootstrap();
const service = new PipelineManager(context);

app.post('/pipelines', bodyParser.json() ,async (req, res) => {
    await service.handleStartNewPipeline(req);
    res.end();
});

app.use((req , res, next) => {
  const err = {
    message: 'not found',
    status: 404,
    stack: 'nothing to see here'
  };
  next(err);
});

app.listen(context.settings.service_http_port, async () => { 
    console.log(category,`: Got Litenning on port 8084`);
    await service.start();
});

process.on("beforeExit", async () => {
  await service.stopContainers();
});