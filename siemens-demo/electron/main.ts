import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1366,
    minHeight: 768,
    frame: true,
    backgroundColor: '#1A1A1A',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../build/icon.png'),
  })

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC handlers for file operations
ipcMain.handle('select-file', async () => {
  // Mock file selection
  return {
    success: true,
    filePath: '/mock/path/assembly.prt',
    fileName: 'robot_assembly.prt',
  }
})

ipcMain.handle('export-urdf', async (_, data) => {
  // Mock URDF export
  return {
    success: true,
    outputPath: '/exports/myrobot.urdf',
    fileName: 'myrobot.urdf',
  }
})

ipcMain.handle('export-pdf', async () => {
  // Mock PDF export
  return {
    success: true,
    filePath: '/exports/export_summary.pdf',
  }
})
