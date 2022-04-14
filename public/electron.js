const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const db = require('../model/db');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            devTools: isDev,
            preload: path.resolve(__dirname, "preload.js"),
            //path.join(app.getAppPath(), "/public/preload.js"),
        },
    });

    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000/input"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: "detach" });
    }

    mainWindow.setResizable(true);
    mainWindow.on("closed", () => (mainWindow = null));
    mainWindow.focus();
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on("crawled-data", (event, arg) => {
    console.log("query from renderer : ", arg);
    // getData2(arg)
    //     .then((res) => event.sender.send("sql-return-latest", res))
    //     .catch((error) => console.log(error));
    let k = arg.length
    for (var i = 0; i < k; i++) {
        let title = arg[i][0].replace(/\'/g, '"') //특수문자 이스케이프 전구역
        db.run(`INSERT INTO select_news(select_title, select_link) VALUES( '[${title}]', '[${arg[i][1]}]')`,
            (err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('insert item');
            })
    }
    // let sql = `SELECT * FROM select_news`;
    // db.all(sql, [], (err, rows) => {
    //     if (err) {
    //         throw err;
    //     }
    //     rows.forEach((row) => {
    //         console.log(row);
    //     });
    // });
    // db.close();
});