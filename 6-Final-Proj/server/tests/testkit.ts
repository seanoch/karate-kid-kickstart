import { TestTodoService } from "./drivers/db_driver";
import { AppDriver } from "./drivers/app_driver";
import { getApp } from "../app";
import express from "express";


// 
export class Testkit {
  app?: express.Application;
  dbDriver?: TestTodoService;
  appDriver?: AppDriver;
  server: any;

  constructor() { }

  beforeEach = async () => {
    const port = Math.ceil((Math.random()*10000) + 1000);
    this.dbDriver = new TestTodoService();
    this.app = getApp(this.dbDriver);
    this.appDriver = new AppDriver(`${port}`);

    try {
      this.server = await this.app.listen(port);
      await this.dbDriver.setup();
      console.log(`Server listening on port ${port}`);
    } catch (e) {
      console.log(e);
    }
  };

  afterEach = async () => {
    await this.server?.close();
    await this.dbDriver?.teardown();
  };

  beforeAndAfterEach = () => {
    beforeEach(this.beforeEach);
    afterEach(this.afterEach);
  }
}
