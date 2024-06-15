const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Pode adicionar funções para comunicação segura entre Electron e seu app React
});
