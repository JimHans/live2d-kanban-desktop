/* Preload Script of Kanban Desktop */
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
const { ipcRenderer } = nodeRequire('electron');

contextBridge.exposeInMainWorld(
  'electron',
  {
    doThing: () => ipcRenderer.send('ignoreMouse','On')
  }
)