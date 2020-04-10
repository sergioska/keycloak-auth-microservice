import * as dotenv from "dotenv";

export class Config {
  constructor() {
    let path;
    switch (process.env.NODE_ENV) {
      case "dev":
        path = `${__dirname}/../../.env.development`;
        break;
      case "test":
        path = `${__dirname}/../../.env.test`;
        break;
      case "production":
        path = `${__dirname}/../../.env.production`;
        break;
      default:
        path = `${__dirname}/../../.env.local`;
    }
    dotenv.config({ path });
  }
}