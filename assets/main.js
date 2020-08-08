// NODE MODULES
const electron = require("electron"),
  { app, BrowserWindow, ipcMain, dialog } = electron,
  fs = require("fs");

let window;
let savedFilePath = undefined;

const saveToFile = text => {
  fs.writeFile(savedFilePath, text, err => {
    if (err) console.log("There was an error", err);
  });
};

const createAboutWindow = () => {
  let aboutWindow = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  aboutWindow.loadFile("assets/about.html");
};

app.on("ready", () => {
  window = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.loadFile("assets/index.html");
});

ipcMain.on("save", (event, text) => {
  // show save dialog
  if (savedFilePath === undefined) {
    dialog
      .showSaveDialog(window, { defaultPath: "untitled.txt" })
      .then(result => {
        savedFilePath = result.filePath;
        saveToFile(text);
      })

      .catch(error => {
        alert("There was an error!", error);
      });
  } else {
    saveToFile(text);
  }
});

ipcMain.on("exit", () => {
  // Quit application
  app.exit(0);
});
