import { Server } from "./server";
import { validateEnv } from "./config";
import { appConfig } from "./config";

validateEnv();

const port = appConfig.port;
const starter = new Server()
  .start(port)
  .then((port) => console.log(`Running on port ${port}`))
  .catch((error) => {
    console.log(error);
  });

export { starter };
