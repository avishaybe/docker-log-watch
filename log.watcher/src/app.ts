import express from "express";
import { PipelineManager } from "./pipeline-manager";
import { bootstrap } from "./bootstrap";

const app: express.Application = express();
const category = "[Log-Watcher-Main]"


const context = bootstrap();
const service = new PipelineManager(context);

app.post('/pipelines', async (req, res) => {
    await service.handleStartNewPipeline(req);
    res.end();
});

app.use(function(req , res, next) {
  const err = {
    message: 'not found',
    status: 404,
    stack: 'nothing to see here'
  };
  next(err);
});

app.listen(8084, () => { 
    console.log(category,`: Got Litenning on port 8084`);
    // service.start();
});
