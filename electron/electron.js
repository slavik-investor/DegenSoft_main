const path = require("path");
const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require("electron-is-dev");
const fs = require("fs");

function createWindow() {
    const win = new BrowserWindow({
        width: 1370,
        height: 800,
        resizable: true,
        frame: true,
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, "preload.js")
        },
    });

    console.log(__dirname);

    win.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../ui/build/index.html")}`
    );

    if(isDev) {
        win.webContents.openDevTools({ mode: "detach" });
    }
}

app.whenReady().then(() => {
    ipcMain.handle("dialog:openFile", handleFileOpen);

    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
