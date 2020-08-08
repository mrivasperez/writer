// NODE MODULES
const electron = require("electron"),
  { app, BrowserWindow, ipcMain } = electron,
  fs = require("fs");

app.on("ready", () => {
  let window = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.loadFile("assets/index.html");
});

ipcMain.on("save", (event, text) => {
  // save the text to a file
  console.log(text);
  fs.writeFile("sampleWriter.txt", text, err => {
    if (err) {
      console.log("ERRER", err);
    }
    console.log("File was saved");
  });
});

ipcMain.on("exit", () => {
  // Quit application
  app.exit(0);
});
