// NODE MODULES
const electron = require("electron"),
  { app, BrowserWindow, ipcMain, dialog } = electron,
  fs = require("fs");

const createAboutWindow(){
  let aboutWindow = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  aboutWindow.loadFile('assets/about.html')
}

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
  dialog.showSaveDialog()
  
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
