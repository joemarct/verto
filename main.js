/*
**  Nuxt
*/
const http = require("http");
const { Nuxt, Builder } = require("nuxt");
let config = require("./nuxt.config.js");
config.rootDir = __dirname; // for electron-builder
// Auto updater
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");
log.transports.file.level = "debug";
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

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
    log.info("Updater initialize.");
    console.log("Updater initialize.");
    autoUpdater.checkForUpdatesAndNotify();
    return win.loadURL(_NUXT_URL_);
  }
};
app.on("ready", newWin);
app.on("window-all-closed", () => app.quit());
app.on("activate", () => win === null && newWin());
