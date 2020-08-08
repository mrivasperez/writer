// NODE MODULES
const electron = require("electron"),
  { app, BrowserWindow, Menu, ipcMain, dialog } = electron,
  fs = require("fs");

let window;
let savedFilePath = undefined;

app.on("ready", () => {
  window = new BrowserWindow({
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
    autoHideMenuBar: true,
  });

  window.loadFile("assets/index.html");

  // const mainMenu = Menu.buildFromTemplate(menu);
  // Menu.setApplicationMenu(mainMenu);
});

ipcMain.on("save", (event, text) => {
  // show save dialog if file has not been saved before, else just save to file
  if (savedFilePath === undefined) {
    dialog
      .showSaveDialog(window, { defaultPath: "untitled.txt" })
      .then(result => {
        // assign filepath to savedFilePath so it is no longer undefined
        savedFilePath = result.filePath;
        saveToFile(text);
      })
      .catch(error => {
        console.log("There was an error!", error);
      });
  } else {
    saveToFile(text);
  }
});

ipcMain.on("exit", () => {
  // Quit application
  app.exit(0);
});

// save text to file
function saveToFile(text) {
  fs.writeFile(savedFilePath, text, err => {
    if (err) console.log("There was an error", err);
    window.webContents.send("saved", "success", savedFilePath);
  });
}

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Save",
        click() {
          console.log("saved from menu!");
        },
      },
      {
        label: "Save As...",
        click() {
          console.log("saved as from menu");
        },
      },
    ],
  },
  { role: "editMenu" },
];
