import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { apolloServer } from "./apollo";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
const app = express();
const http = require("http").createServer(app);

app.use(cookieParser());
app.use(bodyParser.json());

apolloServer.applyMiddleware({ app });

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, "build")));
// app.get("/*", (req, res) => {
//   console.log("request has been made!");
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.get("/ping", function (req, res) {
  console.log(" just got pingged!");
  return res.send("pong");
});

app.post("/ping2", function (req, res) {
  console.log(" just got pingged 2!");
  return res.send("pong2");
});

const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log("Server is running on port: " + port);
});
