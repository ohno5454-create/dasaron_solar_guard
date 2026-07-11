// Dasaron Solar Guard v2.1 — Windows 데스크톱 앱 (Electron 래퍼)
const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1500,
    height: 950,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(__dirname, 'app', 'icon-512.png'),
    title: 'Dasaron Solar Guard v2.1',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  Menu.setApplicationMenu(null);   // 기본 메뉴 제거 (F11 전체화면, Ctrl+R 새로고침은 유지됨)
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  // 외부 링크는 기본 브라우저로
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
