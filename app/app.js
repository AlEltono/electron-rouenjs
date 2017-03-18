let {app, BrowserWindow, Menu, dialog} = require('electron')
let path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false
  })

  let menu = Menu.buildFromTemplate([
    {
      label: 'Informations',
      submenu: [
        {
          label: 'Surprise',
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              buttons: [],
              title: '♥',
              message: 'ROCK IT BABY!'
            })
          }
        }
      ]
    }
  ])

  Menu.setApplicationMenu(menu)

  // and load the index.html of the app.
  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

  // Open the DevTools.
  if (process.env.ELECTRON_ENV && process.env.ELECTRON_ENV.trim() === 'dev') {
    mainWindow.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Get the markdown script logic.
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })
})
