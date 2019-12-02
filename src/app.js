"use strict";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import serverless from "serverless-http";

import { routes } from "./api/routes";

dotenv.config();

const app = express();

const requestHeaders = (_, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  next();
};

const appUse = (a, b) => (b ? app.use(a, b) : app.use(a));

const prefix =
  process.env.NODE_ENV === "dev" ? "" : "/.netlify/functions/index";
const toUse = [
  express.json(),
  morgan("combined"),
  requestHeaders,
  express.urlencoded({ extended: false })
];

app.use(prefix, routes);

toUse.forEach(object => appUse(object));

exports.handler = serverless(app);
export default app;
