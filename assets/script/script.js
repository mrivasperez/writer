const electron = require("electron");
const { ipcRenderer } = electron;

// Application Variables
const decreaseTextBtn = document.getElementById("decrease-text-btn"),
  increaseTextBtn = document.getElementById("increase-text-btn"),
  textArea = document.getElementById("main-text-area"),
  saveBtn = document.getElementById("save-btn"),
  exitBtn = document.getElementById("exit-btn"),
  closeBtn = document.getElementById("close-btn"),
  title = document.getElementById("title");

let fontSize = 16;

// APPLICATION FUNCTIONS
const saveText = () => {
  let text = textArea.value;
  console.log(text);
  // send text to main process
  ipcRenderer.send("save", text);
};

const exitApp = () => {
  ipcRenderer.send("exit");
};

ipcRenderer.on("saved", (event, results, savedFilePath) => {
  if (results === "success") {
    confirmSave(savedFilePath);
  } else {
    console.log("error occurred");
  }
});

const confirmSave = savedFilePath => {
  textArea.style.backgroundColor = "#e3f8df";
  title.innerText = "File Saved";
  title.style.left = "12%";
  setTimeout(() => {
    title.innerText = `writer. \v ${savedFilePath}`;
    textArea.style.backgroundColor = "white";
  }, 1000);
};

// APPLICATION EVENT LISTENERS

saveBtn.addEventListener("click", saveText);
exitBtn.addEventListener("click", exitApp);

// Decrease font size within textarea
decreaseTextBtn.addEventListener("click", e => {
  textArea.style.fontSize = `${fontSize--}px`;
});

// Increase font size within textarea
increaseTextBtn.addEventListener("click", e => {
  textArea.style.fontSize = `${fontSize++}px`;
});
