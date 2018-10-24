/*
**  Nuxt
*/
const http = require("http");
const { Nuxt, Builder } = require("nuxt");
let config = require("./nuxt.config.js");
config.rootDir = __dirname; // for electron-builder

// Init Nuxt.js
const nuxt = new Nuxt(config);
const builder = new Builder(nuxt);
const server = http.createServer(nuxt.render);
// Build only in dev mode
if (config.dev) {
  builder.build().catch(err => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  });
} else {
  builder.build().catch(err => {
    console.error(err);
    //process.exit(1);
  });
} // Added for showing errors on production
// Listen the server
server.listen();
const _NUXT_URL_ = `http://localhost:${server.address().port}`;
console.log(`Nuxt working on ${_NUXT_URL_}`);

/*
** Electron
*/
let win = null; // Current window
const electron = require("electron");
var Menu = electron.Menu;
const path = require("path");
const app = electron.app;
const width = 380;
const height = 700;

const newWin = () => {
  win = new electron.BrowserWindow({
    width: width,
    height: height,
    icon: path.join(__dirname, "static/icon.png")
  });
  // Create the Application's main menu
  var template = [
    {
      label: "Application",
      submenu: [
        {
          label: "About Application",
          selector: "orderFrontStandardAboutPanel:"
        },
        {
          type: "separator"
        },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: function() {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          role: "reload"
        },
        {
          label: "DevTools",
          role: "toggledevtools"
        },
        {
          type: "separator"
        },
        {
          label: "developer tools",
          click: function(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          }
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  // win.maximize();
  win.on("closed", () => (win = null));
  if (config.dev) {
    // Install vue dev tool and open chrome dev tools
    const {
      default: installExtension,
      VUEJS_DEVTOOLS
    } = require("electron-devtools-installer");
    installExtension(VUEJS_DEVTOOLS.id)
      .then(name => {
        console.log(`Added Extension:  ${name}`);
        win.webContents.openDevTools();
      })
      .catch(err => console.log("An error occurred: ", err));
    // Wait for nuxt to build
    const pollServer = () => {
      http
        .get(_NUXT_URL_, res => {
          if (res.statusCode === 200) {
            win.loadURL(_NUXT_URL_);
          } else {
            setTimeout(pollServer, 300);
          }
        })
        .on("error", pollServer);
    };
    pollServer();
  } else {
    return win.loadURL(_NUXT_URL_);
  }
};

// const { autoUpdater } = require("electron-updater");
// if (process.env.NODE_ENV === "production") {
//   window.alert("test updates");
//   autoUpdater.checkForUpdates();
//   autoUpdater.on("update-downloaded", () => {
//     autoUpdater.quitAndInstall();
//   });
// }

//app.on("ready", newWin);
// app.on("window-all-closed", () => app.quit());
// app.on("activate", () => win === null && newWin());
// //autoUpdater
// const { autoUpdater } = require("electron-updater");
// autoUpdater.on("update-downloaded", () => {
//   autoUpdater.quitAndInstall();
// });
// app.on("ready", () => {
//   if (process.env.NODE_ENV === "production") {
//     autoUpdater.checkForUpdates();
//   }
// });

//const { ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
//let win; // this will store the window object

// creates the default window
// function createDefaultWindow() {
//     win = new BrowserWindow({width: 900, height: 680});
//     win.loadURL(`file://${__dirname}/index.html`);
//     win.on('closed', () => app.quit());
//   return win;
// }
app.on("ready", newWin);
// when the app is loaded create a BrowserWindow and check for updates
app.on("ready", function() {
  autoUpdater.checkForUpdates();
});

// when the update has been downloaded and is ready to be installed, notify the BrowserWindow
autoUpdater.on("update-downloaded", () => {
  win.webContents.send("updateReady");
  autoUpdater.quitAndInstall();
  //process.exit(1);
});

// ipcMain.on("quitAndInstall", () => {
//   autoUpdater.quitAndInstall();
// });
