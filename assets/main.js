const electron = require("electron");

const { app, BrowserWindow } = electron;

app.on("ready", () => {
  let window = new BrowserWindow({});
  window.loadFile("assets/index.html");
});
