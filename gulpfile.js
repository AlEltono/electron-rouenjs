let gulp = require('gulp')
let electron = require('electron-connect').server.create({stopOnClose: true})

let callback = electronProcState => {
  if (electronProcState === 'stopped') {
    process.exit()
  }
}

gulp.task('default', function () {
// Start browser process
  electron.start('app/app.js', callback)
// Restart browser process
  gulp.watch('app/app.js', electron.restart)
// Reload renderer process
  gulp.watch(['app/index.html', 'app/assets/**'], electron.reload)
})
