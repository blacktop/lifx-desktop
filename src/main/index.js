const path = require("path");
const electron = require("electron");
const LifxTray = require("./lifx_tray");
const MainWindow = require("./main_window");

const { app, ipcMain } = electron;

let mainWindow;
let tray;

app.on("ready", () => {
  app.dock.hide();
  mainWindow = new MainWindow(`file://${__dirname}/../renderer/index.html`);

  const iconName =
    process.platform === "win32" ? "icon-white.ico" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `../assets/${iconName}`);
  tray = new LifxTray(iconPath, mainWindow);
});

ipcMain.on("update-lifx", (event, timeLeft) => {
  tray.setTitle(timeLeft);
});
