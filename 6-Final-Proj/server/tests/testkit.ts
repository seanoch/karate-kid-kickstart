import { TestTodoService, AppDriver } from "./drivers/index";
import { getApp } from "../app";
import express from "express";
import { Server } from "http";

export class Testkit {
  app?: express.Application;
  dbDriver?: TestTodoService;
  appDriver?: AppDriver;
  server?: Server;

  beforeEach = async () => {
    const port = Math.ceil(Math.random() * 10000 + 1000);
    this.dbDriver = new TestTodoService();
    this.app = getApp(this.dbDriver);
    this.appDriver = new AppDriver(String(port));
    this.server = await this.app.listen(port);
    await this.dbDriver.setup();
  };

  afterEach = async () => {
    await this.server?.close();
    await this.dbDriver?.teardown();
  };

  beforeAndAfterEach = () => {
    beforeEach(this.beforeEach);
    afterEach(this.afterEach);
  };
}
