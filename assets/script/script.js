// const { ipcMain } = require("electron");

const decreaseTextBtn = document.getElementById("decrease-text-btn"),
  increaseTextBtn = document.getElementById("increase-text-btn"),
  textArea = document.getElementById("main-text-area"),
  saveBtn = document.getElementById("save-btn");

let defaultFontSize = 16;

const saveText = () => {
  console.log(textArea.value);
};

// EVENT LISTENERS

saveBtn.addEventListener("click", saveText);

// Decrease font size within textarea
decreaseTextBtn.addEventListener("click", e => {
  textArea.style.fontSize = `${defaultFontSize--}px`;
});

// Increase font size within textarea
increaseTextBtn.addEventListener("click", e => {
  textArea.style.fontSize = `${defaultFontSize++}px`;
});
