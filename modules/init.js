import { Client } from "./whatsapp-web";
import {
  sendText,
  sendLocation,
  sendVideo,
  sendImage,
  getProfileInfo,
} from "./process";

const VERSION = "2.1.1";

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

client.initialize();
