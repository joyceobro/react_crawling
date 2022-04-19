const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("myApi", {
    send: (channel, data) => {
        // whitelist channels
        let validChannels = ["crawled-data", "read-data", "read-all"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ["return-data", "return-all"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    removeListeners: (channel) => {
        let validChannels = ["return-data", "return-all"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.removeAllListeners(channel);
        }
    },
});