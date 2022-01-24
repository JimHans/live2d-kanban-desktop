/* Main Progress of Kanban Desktop */

const { app, BrowserWindow , Menu , Tray, shell, ipcMain} = require('electron')
const dialog = require('electron').dialog;
const path = require('path');
let tray = null;
let calcrater = 0; var PoinThrough = '点击穿透';

function createWindow () {
  //获取屏幕分辨率
  var screenElectron = require('electron').screen;
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width:  330,
    height: 490,
    x: screenElectron.getPrimaryDisplay().workAreaSize.width-360,
    y: screenElectron.getPrimaryDisplay().workAreaSize.height-500,
    skipTaskbar: true,//不显示在任务栏
    alwaysOnTop: true,//置顶显示
    transparent: true,//底部透明
    frame: false,
    resizable: false,//不可调节大小
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      zoomFactor: 1,
    }
  })

  // 并且为你的应用加载index.html
  win.loadFile('index.html')

  win.webContents.openDevTools()

  //系统托盘右键菜单
  var trayMenuTemplate = [
    {
      label: 'Kanban-Desktop',
    },
    {
      label: '检查更新',
      click: function () {shell.openExternal("http://studio.zerolite.cn")} //打开相应页面
    },
    {
      label: '关于',
      click: function () {
        dialog.showMessageBox({
          title  : '关于', 
          type  : 'info', 
          message : 'Kanban-Desktop Powered By Electron™.'
        })
      } //打开相应页面
    },
    {
        label: PoinThrough,
        submenu: [
          {
            label: '关闭点击穿透',
            click: function () {win.setIgnoreMouseEvents(false);}, //设置点击穿透
            type: 'radio'
          },
          {
            label: '启用点击穿透',
            click: function () {win.setIgnoreMouseEvents(true);}, //设置点击穿透
            type: 'radio'
          },
        ],
    },
    {
      label: '总在最上',
      submenu: [
        {
          label: '开启总在最上',
          click: function () {win.setAlwaysOnTop(true);}, //设置总在最上
          type: 'radio'
        },
        {
          label: '关闭总在最上',
          click: function () {win.setAlwaysOnTop(false);}, //设置总在最上
          type: 'radio'
        },
      ],
  },
    {
        label: '退出',
        click: function () {
              app.quit();
        }
    }
];

//图标的上下文菜单
trayIcon = path.join(__dirname, 'assets');//选取目录
tray = new Tray(path.join(trayIcon, 'app.ico'));
let contextMenu = Menu.buildFromTemplate(trayMenuTemplate);

//设置此托盘图标的悬停提示内容
tray.setToolTip('Kanban-Desktop');

app.setAppUserModelId('Kanban-Desktop');
//设置此图标的上下文菜单
tray.setContextMenu(contextMenu);

//主界面隐藏进程监听
ipcMain.on("Mainpage",(event,data) => {
  console.log(data);
  if(data == 'Hide') {event.preventDefault(); win.hide();}
  else if(data == 'Show') {win.show();}
});

ipcMain.on('open-url', (event, url) => {
  shell.openExternal(url);
});

}

// Electron会在初始化完成并且准备好创建浏览器窗口时调用这个方法
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.on("PTBox",(event,data) => {
  console.log(data);
  if(data == 'Open') {
      //获取屏幕分辨率
  var screenElectron = require('electron').screen;
  //新建悬浮球窗口
  const ptbox = new BrowserWindow({
    width: 70,
    height: 70,
    x: screenElectron.getPrimaryDisplay().workAreaSize.width-100,
    y: screenElectron.getPrimaryDisplay().workAreaSize.height-80,
    skipTaskbar: true,//不显示在任务栏
    alwaysOnTop: true,//置顶显示
    transparent: true,//底部透明
    frame: false,
    resizable: false,//不可调节大小
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      zoomFactor: 0.9,
    }
  });
  // 并且为你的应用加载index.html
  ptbox.loadFile('PTBox.html');
  ptbox.webContents.openDevTools();
  ipcMain.on("PTBox",(event,data) => {
    console.log(data);
    if(data == 'Close') {event.preventDefault(); ptbox.hide();}
    });
  }
});

// 您可以把应用程序其他的流程写在在此文件中
// 代码也可以拆分成几个文件，然后用 require 导入。
