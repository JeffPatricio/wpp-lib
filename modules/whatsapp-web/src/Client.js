import moduleRaid from "./util/moduleraid";
import EventEmitter from "./util/EventEmitter";
import { Events } from "./util/Constants";
import { ExposeStore, LoadUtils } from "./util/Injected";
import ContactFactory from "./factories/ContactFactory";
import {
  ClientInfo,
  Message,
  MessageMedia,
  Contact,
  Location,
} from "./structures";

class Client extends EventEmitter {
  constructor() {
    super();
  }

  async initialize() {
    await ExposeStore(moduleRaid);

    LoadUtils();

    this.info = new ClientInfo(this, {
      ...window.Store.Conn.serialize(),
      wid: window.Store.User.getMeUser(),
    });

    window.onAddMessageEvent = (msg) => {
      if (!msg.isNewMsg) return;

      const message = new Message(this, msg);

      if (msg.id.fromMe) return;

      /**
       * Emitted when a new message is received.
       * @event Client#message
       * @param {Message} message The message that was received
       */
      this.emit(Events.MESSAGE_RECEIVED, message);
    };

    window.Store.Msg.on("add", (msg) => {
      if (msg.isNewMsg)
        window.onAddMessageEvent(window.WWebJS.getMessageModel(msg));
    });

    /**
     * Emitted when the client has initialized and is ready to receive messages.
     * @event Client#ready
     */
    setTimeout(() => {
      this.emit(Events.READY);
    }, 2000);
  }

  /**
   * Mark as seen for the Chat
   *  @param {string} chatId
   *  @returns {Promise<boolean>} result
   *
   */
  async sendSeen(chatId) {
    const result = await window.WWebJS.sendSeen(chatId);
    return result;
  }

  /**
   * Message options.
   * @typedef {Object} MessageSendOptions
   * @property {boolean} [linkPreview=true] - Show links preview
   * @property {boolean} [sendAudioAsVoice=false] - Send audio as voice message
   * @property {boolean} [sendMediaAsSticker=false] - Send media as a sticker
   * @property {boolean} [sendMediaAsDocument=false] - Send media as a document
   * @property {boolean} [parseVCards=true] - Automatically parse vCards and send them as contacts
   * @property {string} [caption] - Image or video caption
   * @property {string} [quotedMessageId] - Id of the message that is being quoted (or replied to)
   * @property {Contact[]} [mentions] - Contacts that are being mentioned in the message
   * @property {boolean} [sendSeen=true] - Mark the conversation as seen after sending the message
   * @property {MessageMedia} [media] - Media to be sent
   */

  /**
   * Send a message to a specific chatId
   * @param {string} chatId
   * @param {string|MessageMedia|Location|Contact|Array<Contact>} content
   * @param {MessageSendOptions} [options] - Options used when sending the message
   *
   * @returns {Promise<Message>} Message that was just sent
   */
  async sendMessage(chatId, content, options = {}) {
    let internalOptions = {
      linkPreview: true,
      sendAudioAsVoice: options.sendAudioAsVoice,
      sendMediaAsSticker: options.sendMediaAsSticker,
      sendMediaAsDocument: options.sendMediaAsDocument,
      caption: options.caption,
      quotedMessageId: options.quotedMessageId,
      parseVCards: options.parseVCards === false ? false : true,
      mentionedJidList: Array.isArray(options.mentions)
        ? options.mentions.map((contact) => contact.id._serialized)
        : [],
    };

    const sendSeen =
      typeof options.sendSeen === "undefined" ? true : options.sendSeen;

    if (content instanceof MessageMedia) {
      internalOptions.attachment = content;
      content = "";
    } else if (options.media instanceof MessageMedia) {
      internalOptions.attachment = options.media;
      internalOptions.caption = content;
      content = "";
    } else if (content instanceof Location) {
      internalOptions.location = content;
      content = "";
    }

    const chatWid = window.Store.WidFactory.createWid(chatId);
    const chat = await window.Store.Chat.find(chatWid);

    if (sendSeen) {
      window.WWebJS.sendSeen(chatId);
    }

    const msg = await window.WWebJS.sendMessage(
      chat,
      content,
      internalOptions,
      sendSeen
    );

    const newMessage = msg.serialize();

    return new Message(this, newMessage);
  }

  /**
   * Get contact instance by ID
   * @param {string} contactId
   * @returns {Promise<Contact>}
   */
  async getContactById(contactId) {
    let contact = await window.WWebJS.getContact(contactId);
    return ContactFactory.create(this, contact);
  }

  /**
   * Returns the contact ID's profile picture URL, if privacy settings allow it
   * @param {string} contactId the whatsapp user's ID
   * @returns {Promise<string>}
   */
  async getProfilePicUrl(contactId) {
    const chatWid = await window.Store.WidFactory.createWid(contactId);
    const profilePic = await window.Store.ProfilePic.profilePicFind(chatWid);
    return profilePic ? profilePic.eurl : undefined;
  }
}

export default Client;
