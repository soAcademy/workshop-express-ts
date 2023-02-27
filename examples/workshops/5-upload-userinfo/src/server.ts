import express from "express";
import bodyParser from "body-parser";
import { filesRouter, userinfosRouter } from "./features";
import { AppDataSource } from "./db";

class Server {
  private app;

  constructor() {
    this.initAppDataSource()
      .then(() => {
        console.log("prepair AppDataSource done.");
      })
      .catch((error) => {
        throw error;
      });
    this.app = express();
    this.config();
    this.routerConfig();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default
  }

  private async initAppDataSource() {
    await AppDataSource.initialize();
  }

  private routerConfig() {
    this.app.use(userinfosRouter);
    this.app.use(filesRouter);
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
