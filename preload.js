const { contextBridge } = require("electron");
const WebChimera = require("webchimera.js");

let wc;
contextBridge.exposeInMainWorld("Preload", {
  webchimera: (args) => {
    wc = WebChimera.createPlayer(args);
  },
  onFrameReady: (fn) => {
    wc.onFrameReady = (frame) =>
      fn(frame, frame.width, frame.height, frame.uOffset, frame.vOffset);
  },
  onLogMessage: (fn) => {
    wc.onLogMessage = (level, msg) => fn(level, msg);
  },
  play: (url) => {
    wc.play(url);
  },
});
