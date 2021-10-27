// Electron のモジュールを取得
const {app, BrowserWindow} = require('electron')

// メインウィンドウはグローバル参照で保持
// 空になれば自動的にガベージコレクションが働き、開放される
let mainWindow

// Electron のウィンドウを生成する関数
function createWindow () {
  // ウィンドウ生成（横幅 800、高さ 600、フレームを含まないサイズ指定）
  mainWindow = new BrowserWindow({width: 800, height: 600, useContentSize: true})

  // 表示対象の HTML ファイルを読み込む
  mainWindow.loadFile('index.html')

  // ウィンドウを閉じた時に発生する処理
  mainWindow.on('closed', () => {
    // メインウィンドウの値を null にして、ガベージコレクタに開放させる
    mainWindow = null
  })
}

// Electronの初期化完了後に、ウィンドウ生成関数を実行
app.on('ready', createWindow)

// ↓↓ アプリが macOS で実行された際の対応（クロスプラットフォーム対応）

// 全てのウィンドウが閉じたときに発生
app.on('window-all-closed', () => {
  // macOS の場合、アプリを完全に終了するのではなく
  // メニューバーに残す（ユーザーが Ctrl + Q を押すまで終了しない）ことが
  // 一般的であるため、これを表現する
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// アプリが実行された時に発生
app.on('activate', function () {
  // macOS の場合、アプリ起動処理（Dock アイコンクリック）時に
  // 実行ウィンドウが空であれば、
  // アプリ内にウィンドウを再作成することが一般的
  if (mainWindow === null) {
    createWindow()
  }
})