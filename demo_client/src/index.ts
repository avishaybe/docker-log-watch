import nconf from "nconf";
import rp from "request-promise";

nconf.env();
nconf.argv();
nconf.defaults({
    port: 8084,
    image: "pipeline_mock:latest",
    forwardType: "fs",
    path: "./pipe-log.txt",
    service_host: "localhost"
});


const category = "[LogWatcher Client]";

console.log(category, ": Started with the following options:\n", nconf.get());

const connection = rp.defaults({ pool: { minSockets: 1, maxSockets: 10 } });
const params = { method: "POST", json: true, headers: { Accept: 'application/json'}};
const requestBody = {
    "imageName": nconf.get("image"),
    "logForward": {
        "type": nconf.get("forwardType"),
        "path": nconf.get("path")
    }
}
const uri = `http://${nconf.get("service_host")}:${nconf.get("port")}/pipelines`;

console.log(category,"Going to post to ", uri, "the following body:\n",requestBody);
try{
    connection(Object.assign({ uri, body: requestBody }, params))
    .then((res) => {
        console.log(category,": Finished successfully");
    })
    .catch((e) => {
        console.error(category," Got the following exception:", e);
    });
}
catch(e){
    console.error(category," Got the following exception:", e);
}