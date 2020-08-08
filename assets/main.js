const electron = require("electron");

const { app, BrowserWindow } = electron;

app.on("ready", () => {
  let window = new BrowserWindow({
    frame: false,
  });
  window.loadFile("assets/index.html");
});
