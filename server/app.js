var express = require("express");
var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require("parse-dashboard");
var app = express();

var api = new ParseServer({
  databaseURI: "mongodb://127.0.0.1:27017/raftlabsblogs",
  cloud: __dirname + "/cloud/main.js",
  appId: "myAppId",
  appName: "RaftLabsBlog",
  masterKey: "myMasterKey",
  fileKey: "optionalFileKey",
  publicServerURL: "http://localhost:3030/parse",
  serverURL: "http://localhost:3030/parse",
});

var dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: "http://localhost:3030/parse",
      appId: "myAppId",
      masterKey: "myMasterKey",
      appName: "RaftLabsBlog",
    },
  ],
  users: [
    {
      user: "admin",
      pass: "123",
    },
  ],
  useEncryptedPasswords: false,
});

// make the Parse Server available at /parse
app.use("/parse", api);

// make the Parse Dashboard available at /dashboard
app.use("/dashboard", dashboard);

var httpServer = require("http").createServer(app);
httpServer.listen(3030);
