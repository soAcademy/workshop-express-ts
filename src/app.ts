import { Server } from "./server";

const port = parseInt(process.env.PORT || "5000");

const starter = new Server()
  .start(port)
  .then((port) => console.log(`Running on port ${port}`))
  .catch((error) => {
    console.log(error);
  });

export { starter };
