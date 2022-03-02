import { Location, MessageMedia } from "./whatsapp-web";

export async function sendText(event) {
  try {
    const options = {};

    if (!!event.detail.quotedMessageId) {
      options.quotedMessageId = event.detail.quotedMessageId;
    }

    const message = await window.waClient.sendMessage(
      `${event.detail.number}@c.us`,
      event.detail.text,
      options
    );
    window.emit("send-text@response", {
      success: true,
      id: message.id._serialized,
    });
  } catch (err) {
    window.emit("send-text@response", {
      success: false,
      error: err.toString(),
      message: "Erro ao enviar mensagem na extensão",
    });
  }
}

export async function sendLocation(event) {
  try {
    const location = new Location(
      parseFloat(event.detail.location.lat),
      parseFloat(event.detail.location.lng),
      event.detail.location.description
    );
    const message = await window.waClient.sendMessage(
      `${event.detail.number}@c.us`,
      location
    );
    window.emit("send-location@response", {
      success: true,
      id: message.id._serialized,
    });
  } catch (err) {
    window.emit("send-location@response", {
      success: false,
      error: err.toString(),
      message: "Erro ao enviar mensagem na extensão",
    });
  }
}

export async function sendVideo(event) {
  try {
    const video = new MessageMedia(
      event.detail.video.mimetype,
      event.detail.video.data,
      event.detail.video.filename
    );
    const message = await window.waClient.sendMessage(
      `${event.detail.number}@c.us`,
      video
    );
    window.emit("send-video@response", {
      success: true,
      id: message.id._serialized,
    });
  } catch (err) {
    window.emit("send-video@response", {
      success: false,
      error: err.toString(),
      message: "Erro ao enviar mensagem na extensão",
    });
  }
}

export async function sendImage(event) {
  try {
    const image = new MessageMedia(
      event.detail.image.mimetype,
      event.detail.image.data,
      event.detail.image.filename
    );

    const message = await window.waClient.sendMessage(
      `${event.detail.number}@c.us`,
      image
    );
    window.emit("send-image@response", {
      success: true,
      id: message.id._serialized,
    });
  } catch (err) {
    window.emit("send-image@response", {
      success: false,
      error: err.toString(),
      message: "Erro ao enviar mensagem na extensão",
    });
  }
}

export async function getProfileInfo(event) {
  try {
    const contact = await window.waClient.getContactById(
      `${event.detail.number}@c.us`
    );

    const pic = await contact.getProfilePicUrl();

    window.emit("contact-info@response", {
      success: true,
      pushname: contact.pushname || "",
      name: contact.name || "",
      shortName: contact.shortName || "",
      pictureUrl: pic || "",
    });
  } catch (error) {
    window.emit("contact-info@response", {
      success: false,
      error: error.toString(),
      message: "Erro ao buscar dados do contato",
    });
  }
}
