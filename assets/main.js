// NODE MODULES
const electron = require("electron"),
  { app, BrowserWindow, ipcMain, dialog } = electron,
  fs = require("fs");

let window,
  savedFilePath = undefined;

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
        // Save .txt file to user choice
        fs.writeFile(savedFilePath, text, err => {
          if (err) console.log("There was an error", err);
        });
      })

      .catch(error => {
        alert("There was an error!", error);
      });
  } else {
    fs.writeFile(savedFilePath, text, err => {
      if (err) console.log("There was an error", err);
    });
  }
});

ipcMain.on("exit", () => {
  // Quit application
  app.exit(0);
});
