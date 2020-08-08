const electron = require("electron");
const { ipcRenderer } = electron;

// Application Variables
const decreaseTextBtn = document.getElementById("decrease-text-btn"),
  increaseTextBtn = document.getElementById("increase-text-btn"),
  textArea = document.getElementById("main-text-area"),
  saveBtn = document.getElementById("save-btn"),
  exitBtn = document.getElementById("exit-btn"),
  closeBtn = document.getElementById("close-btn");

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
