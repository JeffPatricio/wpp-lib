import {
  getProfileInfo,
  sendImage,
  sendLocation,
  sendText,
  sendVideo,
} from "./process";
import { Client } from "./whatsapp-web";

const VERSION = "2.1.0";

window.emit = (name, data) => {
  window.dispatchEvent(new CustomEvent(name, { detail: data }));
};

const client = new Client();

function buildDataExtension() {
  window.emit("wa-info@response", client.info.wid);
}

const registerEvents = () => {
  window.addEventListener("wa-info", buildDataExtension, false);
  window.addEventListener("send-text", sendText, false);
  window.addEventListener("send-location", sendLocation, false);
  window.addEventListener("send-image", sendImage, false);
  window.addEventListener("send-video", sendVideo, false);
  window.addEventListener("contact-info", getProfileInfo, false);
};

client.on("ready", () => {
  window.waClient = client;
  registerEvents();
  console.log(`INITIALIZE WA LIBRARY ${VERSION} ✅`);
  window.emit("wa-build", VERSION);
});

client.on("message", (msg) => {
  console.log(`MESSAGE RECEIVED ✅`);
  window.emit("wa-message", msg);
});

client.initialize();
