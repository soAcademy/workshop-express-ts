import express from "express";
import bodyParser from "body-parser";
import { dbconnectorPool } from "./config";
import { menusRouter } from "./features/menus";

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default
  }

  private dbConnect() {
    dbconnectorPool.connect(function (err, client, done) {
      if (err) throw err; //throw new Error(err);
      console.log("Connected pg");
    });
  }

  private routerConfig() {
    this.app.use(menusRouter);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: Object) => reject(err));
    });
  };
}

export { Server };
