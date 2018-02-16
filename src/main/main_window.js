const electron = require('electron')
const { BrowserWindow } = electron

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      height: 500,
      width: 300,
      // frame: false,
      // resizable: false,
      show: false,
      webPreferences: { backgroundThrottling: false },
    })

    if (process.env.NODE_ENV === 'production') {
      const sourceMapSupport = require('source-map-support')
      sourceMapSupport.install()
    }

    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      require('electron-debug')()
      const path = require('path')
      const p = path.join(__dirname, '..', 'node_modules')
      require('module').globalPaths.push(p)
      require('devtron').install()
      this.webContents.openDevTools()
      // super({
      //   height: 500,
      //   width: 1000,
      //   frame: true,
      //   resizable: true,
      //   show: true,
      //   webPreferences: { backgroundThrottling: false },
      // })
    }

    // const installExtensions = async () => {
    //   const installer = require('electron-devtools-installer')
    //   const forceDownload = !!process.env.UPGRADE_EXTENSIONS
    //   const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

    //   return Promise.all(
    //     extensions.map(name =>
    //       installer.default(installer[name], forceDownload)
    //     )
    //   ).catch(console.log)
    // }

    this.loadURL(url)
    this.on('blur', this.onBlur.bind(this))
  }

  onBlur() {
    this.hide()
  }
}

module.exports = MainWindow
