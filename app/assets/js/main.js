/**
 * Renderer process.
 */

const SimpleMDE = require('simplemde')

// Use to access remote electron process.
const {remote, shell, ipcRenderer} = require('electron')

// Get the dialog component.
const dialog = remote.dialog

// We must use fs from node for file management.
const fs = require('fs')

let textarea = document.getElementById('markdown-editor')
let preview = document.getElementById('preview')
let simplemde = new SimpleMDE({ element: textarea, hideIcons: ['preview', 'side-by-side', 'fullscreen'] })

// Save mechanism.
let save = document.getElementById('save-markdown')

// Load mechanism.
let load = document.getElementById('load-markdown')

// close button.
let closeBtn = document.getElementById('btn-close')

// GitHub button.
let githubBtn = document.getElementById('btn-github')

// Preview markdown
simplemde.codemirror.on('change', (e) => {
  let html = simplemde.options.previewRender(simplemde.value())
  preview.innerHTML = html.length > 0 ? html : '<em>Preview will be displayed here</em>'
})

// GitHub link.
githubBtn.onclick = () => {
  shell.openExternal('https://github.com/AlEltono/electron-rouenjs')
}

// Save action.
save.onclick = () => {
  let content = simplemde.value()
  let saveOptions = {
    filters: [
      {name: 'Markdown', extensions: ['md']}
    ]
  }

  dialog.showSaveDialog(saveOptions, function (fileName) {
    if (fileName === 'undefined') {
      console.log('You didn\'t save the file')
      return
    }
    // fileName is a string that contains the path and filename created in the save file dialog.
    fs.writeFile(fileName, content, function (err) {
      if (err) {
        dialog.showMessageBox({
          type: 'error',
          message: `An error ocurred creating the file : ${err.message}`
        })
      }
      // alert('The file has been succesfully saved')
    })
  })
}

// Load action
load.onclick = () => {
  let openOptions = {
    properties: ['openFile'],
    filters: [
      {name: 'Markdown', extensions: ['md']}
    ]
  }

  dialog.showOpenDialog(openOptions, function (filePath) {
    if (filePath === 'undefined') {
      console.log('No file selected')
      return
    }

    // fileName is a string that contains the path and filename created in the save file dialog.
    fs.readFile(filePath[0], 'utf-8', function (err, data) {
      if (err) {
        dialog.showMessageBox({
          type: 'error',
          message: `An error ocurred reading the file : ${err.message}`
        })
        return
      }

      // Change how to handle the file content
      simplemde.value(data)
    })
  })
}

// Close window
closeBtn.onclick = () => {
  ipcRenderer.send('close-window')
}
