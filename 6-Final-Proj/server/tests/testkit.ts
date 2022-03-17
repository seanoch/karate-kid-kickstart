import { InMemoryMongoTodo, AppDriver } from "./drivers/index";
import { getApp } from "../app";
import express from "express";
import { Server } from "http";
import { AddressInfo } from "net";

export class Testkit {
  app?: express.Application;
  dbDriver?: InMemoryMongoTodo;
  appDriver?: AppDriver;
  server?: Server;

  beforeEach = async () => {
    this.dbDriver = new InMemoryMongoTodo();
    this.app = getApp(this.dbDriver);
    this.server = await this.app.listen(0);

    if (this.server) {
      const { port } = this.server.address() as AddressInfo;
      console.log(`listening on ${port}`);

    this.appDriver = new AppDriver(String(port));
    await this.dbDriver.setup();
    }
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
