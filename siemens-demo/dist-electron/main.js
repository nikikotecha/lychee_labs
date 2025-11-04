"use strict";
const electron = require("electron");
const path = require("path");
let mainWindow = null;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1366,
    minHeight: 768,
    frame: true,
    backgroundColor: "#1A1A1A",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js")
    },
    icon: path.join(__dirname, "../build/icon.png")
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle("select-file", async () => {
  return {
    success: true,
    filePath: "/mock/path/assembly.prt",
    fileName: "robot_assembly.prt"
  };
});
electron.ipcMain.handle("export-urdf", async (_, data) => {
  return {
    success: true,
    outputPath: "/exports/myrobot.urdf",
    fileName: "myrobot.urdf"
  };
});
electron.ipcMain.handle("export-pdf", async () => {
  return {
    success: true,
    filePath: "/exports/export_summary.pdf"
  };
});
