// アプリケーション作成用のモジュールを読み込み
const {app, BrowserWindow, screen} = require('electron');

// メインウィンドウ
let mainWindow;

function createWindow() {
  // メインウィンドウを作成します
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
    width: 800, height: 600,
    fullscreeen:false,
    alwaysOnTop:false,
    frame:false,
    transparent:false
  });
  /* default 
  //フルスクリーン
  // Create the browser window.
  mainWindow = new BrowserWindow({
    x:0,
    y:0,
    width: 1366,
    height: 768,
    backgroundColor:'#FFFFFF',
    webPreferences: {
      nodeIntegration: true  //※1
    },
    alwaysOnTop:true,
    kiosk:true,
    fullscreeen:true,
    frame:false,
    transparent:false
  });
  */
  
  // メインウィンドウに表示するURLを指定します
  // （今回はmain.jsと同じディレクトリのindex.html）
  mainWindow.loadFile('setting.html');

  // デベロッパーツールの起動
  //mainWindow.webContents.openDevTools();

  // メインウィンドウが閉じられたときの処理
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

//  初期化が完了した時の処理
app.on('ready', createWindow);

// 全てのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
  // macOSのとき以外はアプリケーションを終了させます
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされた時）
app.on('activate', () => {
  // メインウィンドウが消えている場合は再度メインウィンドウを作成する
  if (mainWindow === null) {
    createWindow();
  }
});
const electron = require('electron');
let {ipcMain} = electron;
ipcMain.on('resize', function (e) {
    mainWindow.setFullScreen(true);
});
