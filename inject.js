(function () {
  'use strict';

  /* moduleRaid v5
   * https://github.com/@pedroslopez/moduleRaid
   *
   * Copyright pixeldesu, pedroslopez and other contributors
   * Licensed under the MIT License
   * https://github.com/pedroslopez/moduleRaid/blob/master/LICENSE
   */
  const moduleRaid = function () {
    moduleRaid.mID = Math.random().toString(36).substring(7);
    moduleRaid.mObj = {};

    var fillModuleArray = function () {
      try {
        window.webpackChunkwhatsapp_web_client.push([[moduleRaid.mID], {}, function (e) {
          Object.keys(e.m).forEach(function (mod) {
            moduleRaid.mObj[mod] = e(mod);
          });
        }]);
      } catch (err) {}
    };

    fillModuleArray();

    var get = function get(id) {
      return moduleRaid.mObj[id];
    };

    var findModule = function findModule(query) {
      var results = [];
      var modules = Object.keys(moduleRaid.mObj);
      modules.forEach(function (mKey) {
        var mod = moduleRaid.mObj[mKey];

        if (typeof mod !== 'undefined') {
          if (typeof query === 'string') {
            if (typeof mod.default === 'object') {
              for (let key in mod.default) {
                if (key == query) results.push(mod);
              }
            }

            for (let key in mod) {
              if (key == query) results.push(mod);
            }
          } else if (typeof query === 'function') {
            if (query(mod)) {
              results.push(mod);
            }
          } else {
            throw new TypeError('findModule can only find via string and function, ' + typeof query + ' was passed');
          }
        }
      });
      return results;
    };

    return {
      modules: moduleRaid.mObj,
      constructors: moduleRaid.cArr,
      findModule: findModule,
      get: get
    };
  };

  class EventEmitter {
    constructor() {
      this.callbacks = {};
    }

    on(event, cb) {
      if (!this.callbacks[event]) this.callbacks[event] = [];
      this.callbacks[event].push(cb);
    }

    emit(event, data) {
      let cbs = this.callbacks[event];

      if (cbs) {
        cbs.forEach(cb => cb(data));
      }
    }

  }

  /**
   * Client status
   * @readonly
   * @enum {number}
   */
  /**
   * Events that can be emitted by the client
   * @readonly
   * @enum {string}
   */

  const Events = {
    AUTHENTICATED: 'authenticated',
    AUTHENTICATION_FAILURE: 'auth_failure',
    READY: 'ready',
    MESSAGE_RECEIVED: 'message',
    MESSAGE_CREATE: 'message_create',
    MESSAGE_REVOKED_EVERYONE: 'message_revoke_everyone',
    MESSAGE_REVOKED_ME: 'message_revoke_me',
    MESSAGE_ACK: 'message_ack',
    MEDIA_UPLOADED: 'media_uploaded',
    GROUP_JOIN: 'group_join',
    GROUP_LEAVE: 'group_leave',
    GROUP_UPDATE: 'group_update',
    QR_RECEIVED: 'qr',
    DISCONNECTED: 'disconnected',
    STATE_CHANGED: 'change_state',
    BATTERY_CHANGED: 'change_battery',
    INCOMING_CALL: 'incoming_call'
  };
  /**
   * Message types
   * @readonly
   * @enum {string}
   */

  const MessageTypes = {
    TEXT: 'chat',
    AUDIO: 'audio',
    VOICE: 'ptt',
    IMAGE: 'image',
    VIDEO: 'video',
    DOCUMENT: 'document',
    STICKER: 'sticker',
    LOCATION: 'location',
    CONTACT_CARD: 'vcard',
    CONTACT_CARD_MULTI: 'multi_vcard',
    ORDER: 'order',
    REVOKED: 'revoked',
    PRODUCT: 'product',
    UNKNOWN: 'unknown',
    GROUP_INVITE: 'groups_v4_invite',
    LIST: 'list',
    BUTTONS_RESPONSE: 'buttons_response',
    PAYMENT: 'payment'
  };

  const ExposeStore = moduleRaid => {
    window.mR = moduleRaid();
    window.Store = Object.assign({}, window.mR.findModule(m => m.default && m.default.Chat)[0].default);
    window.Store.AppState = window.mR.findModule("Socket")[0].Socket;
    window.Store.Conn = window.mR.findModule("Conn")[0].Conn;
    window.Store.BlockContact = window.mR.findModule("blockContact")[0];
    window.Store.Call = window.mR.findModule("CallCollection")[0].CallCollection;
    window.Store.Cmd = window.mR.findModule("Cmd")[0].Cmd;
    window.Store.CryptoLib = window.mR.findModule("decryptE2EMedia")[0];
    window.Store.DownloadManager = window.mR.findModule("downloadManager")[0].downloadManager;
    window.Store.Features = window.mR.findModule("FEATURE_CHANGE_EVENT")[0].GK;
    window.Store.genId = window.mR.findModule("newTag")[0].newTag;
    window.Store.GroupMetadata = window.mR.findModule(module => module.default && module.default.handlePendingInvite)[0].default;
    window.Store.Invite = window.mR.findModule("sendJoinGroupViaInvite")[0];
    window.Store.InviteInfo = window.mR.findModule("sendQueryGroupInvite")[0];
    window.Store.Label = window.mR.findModule("LabelCollection")[0].LabelCollection;
    window.Store.MediaPrep = window.mR.findModule("MediaPrep")[0];
    window.Store.MediaObject = window.mR.findModule("getOrCreateMediaObject")[0];
    window.Store.NumberInfo = window.mR.findModule("formattedPhoneNumber")[0];
    window.Store.MediaTypes = window.mR.findModule("msgToMediaType")[0];
    window.Store.MediaUpload = window.mR.findModule("uploadMedia")[0];
    window.Store.MsgKey = window.mR.findModule(module => module.default && module.default.fromString)[0].default;
    window.Store.MessageInfo = window.mR.findModule("sendQueryMsgInfo")[0];
    window.Store.OpaqueData = window.mR.findModule(module => module.default && module.default.createFromData)[0].default;
    window.Store.QueryExist = window.mR.findModule(module => typeof module.default === "function" && module.default.toString().includes("Should not reach queryExists MD"))[0].default;
    window.Store.QueryProduct = window.mR.findModule("queryProduct")[0];
    window.Store.QueryOrder = window.mR.findModule("queryOrder")[0];
    window.Store.SendClear = window.mR.findModule("sendClear")[0];
    window.Store.SendDelete = window.mR.findModule("sendDelete")[0];
    window.Store.SendMessage = window.mR.findModule("addAndSendMsgToChat")[0];
    window.Store.SendSeen = window.mR.findModule("sendSeen")[0];
    window.Store.Sticker = window.mR.findModule("Sticker")[0].Sticker;
    window.Store.User = window.mR.findModule("getMaybeMeUser")[0];
    window.Store.UploadUtils = window.mR.findModule(module => module.default && module.default.encryptAndUpload ? module.default : null)[0].default;
    window.Store.UserConstructor = window.mR.findModule(module => module.default && module.default.prototype && module.default.prototype.isServer && module.default.prototype.isUser ? module.default : null)[0].default;
    window.Store.Validators = window.mR.findModule("findLinks")[0];
    window.Store.VCard = window.mR.findModule("vcardFromContactModel")[0];
    window.Store.Wap = window.mR.findModule("queryLinkPreview")[0].default;
    window.Store.WidFactory = window.mR.findModule("createWid")[0];
    window.Store.getProfilePicFull = window.mR.findModule("getProfilePicFull")[0].getProfilePicFull;
    window.Store.PresenceUtils = window.mR.findModule("sendPresenceAvailable")[0];
    window.Store.ChatState = window.mR.findModule("sendChatStateComposing")[0];
    window.Store.GroupParticipants = window.mR.findModule("sendPromoteParticipants")[0];
    window.Store.JoinInviteV4 = window.mR.findModule("sendJoinGroupViaInviteV4")[0];
    window.Store.findCommonGroups = window.mR.findModule("findCommonGroups")[0].findCommonGroups;
    window.Store.StatusUtils = window.mR.findModule("setMyStatus")[0];
    window.Store.StickerTools = { ...window.mR.findModule("toWebpSticker")[0],
      ...window.mR.findModule("addWebpMetadata")[0]
    };
    window.Store.GroupUtils = { ...window.mR.findModule("sendCreateGroup")[0],
      ...window.mR.findModule("sendSetGroupSubject")[0],
      ...window.mR.findModule("markExited")[0]
    };

    if (!window.Store.Chat._find) {
      window.Store.Chat._find = e => {
        const target = window.Store.Chat.get(e);
        return target ? Promise.resolve(target) : Promise.resolve({
          id: e
        });
      };
    }
  };

  const LoadUtils = () => {
    window.WWebJS = {};

    window.WWebJS.sendSeen = async chatId => {
      let chat = window.Store.Chat.get(chatId);

      if (chat !== undefined) {
        await window.Store.SendSeen.sendSeen(chat, false);
        return true;
      }

      return false;
    };

    window.WWebJS.sendMessage = async (chat, content, options = {}) => {
      let attOptions = {};

      if (options.attachment) {
        attOptions = options.sendMediaAsSticker ? await window.WWebJS.processStickerData(options.attachment) : await window.WWebJS.processMediaData(options.attachment, {
          forceVoice: options.sendAudioAsVoice,
          forceDocument: options.sendMediaAsDocument,
          forceGif: options.sendVideoAsGif
        });
        content = options.sendMediaAsSticker ? undefined : attOptions.preview;
        delete options.attachment;
        delete options.sendMediaAsSticker;
      }

      let quotedMsgOptions = {};

      if (options.quotedMessageId) {
        let quotedMessage = window.Store.Msg.get(options.quotedMessageId);

        if (quotedMessage.canReply()) {
          quotedMsgOptions = quotedMessage.msgContextInfo(chat);
        }

        delete options.quotedMessageId;
      }

      if (options.mentionedJidList) {
        options.mentionedJidList = options.mentionedJidList.map(cId => window.Store.Contact.get(cId).id);
      }

      let locationOptions = {};

      if (options.location) {
        locationOptions = {
          type: "location",
          loc: options.location.description,
          lat: options.location.latitude,
          lng: options.location.longitude
        };
        delete options.location;
      }

      let vcardOptions = {};

      if (options.contactCard) {
        let contact = window.Store.Contact.get(options.contactCard);
        vcardOptions = {
          body: window.Store.VCard.vcardFromContactModel(contact).vcard,
          type: "vcard",
          vcardFormattedName: contact.formattedName
        };
        delete options.contactCard;
      } else if (options.contactCardList) {
        let contacts = options.contactCardList.map(c => window.Store.Contact.get(c));
        let vcards = contacts.map(c => window.Store.VCard.vcardFromContactModel(c));
        vcardOptions = {
          type: "multi_vcard",
          vcardList: vcards,
          body: undefined
        };
        delete options.contactCardList;
      } else if (options.parseVCards && typeof content === "string" && content.startsWith("BEGIN:VCARD")) {
        delete options.parseVCards;

        try {
          const parsed = window.Store.VCard.parseVcard(content);

          if (parsed) {
            vcardOptions = {
              type: "vcard",
              vcardFormattedName: window.Store.VCard.vcardGetNameFromParsed(parsed)
            };
          }
        } catch (_) {// not a vcard
        }
      }

      if (options.linkPreview) {
        delete options.linkPreview; // const link = window.Store.Validators.findLink(content);
        // if (link) {
        //   const preview = await window.Store.Wap.queryLinkPreview(link.url);
        //   preview.preview = true;
        //   preview.subtype = 'url';
        //   options = { ...options, ...preview };
        // }
      }

      let extraOptions = {};

      if (options.buttons) {
        let caption;

        if (options.buttons.type === "chat") {
          content = options.buttons.body;
          caption = content;
        } else {
          caption = options.caption ? options.caption : " "; //Caption can't be empty
        }

        extraOptions = {
          productHeaderImageRejected: false,
          isFromTemplate: false,
          isDynamicReplyButtonsMsg: true,
          title: options.buttons.title ? options.buttons.title : undefined,
          footer: options.buttons.footer ? options.buttons.footer : undefined,
          dynamicReplyButtons: options.buttons.buttons,
          replyButtons: options.buttons.buttons,
          caption: caption
        };
        delete options.buttons;
      }

      if (options.list) {
        if (window.Store.Conn.platform === "smba" || window.Store.Conn.platform === "smbi") {
          throw "[LT01] Whatsapp business can't send this yet";
        }

        extraOptions = { ...extraOptions,
          type: "list",
          footer: options.list.footer,
          list: { ...options.list,
            listType: 1
          },
          body: options.list.description
        };
        delete options.list;
        delete extraOptions.list.footer;
      }

      const newMsgId = new window.Store.MsgKey({
        fromMe: true,
        remote: chat.id,
        id: window.Store.genId()
      });
      const message = { ...options,
        id: newMsgId,
        ack: 0,
        body: content,
        from: window.Store.User.getMeUser(),
        to: chat.id,
        local: true,
        self: "out",
        t: parseInt(new Date().getTime() / 1000),
        isNewMsg: true,
        type: "chat",
        ...locationOptions,
        ...attOptions,
        ...quotedMsgOptions,
        ...vcardOptions,
        ...extraOptions
      };
      await window.Store.SendMessage.addAndSendMsgToChat(chat, message);
      return window.Store.Msg.get(newMsgId._serialized);
    };

    window.WWebJS.processMediaData = async (mediaInfo, {
      forceVoice,
      forceDocument,
      forceGif
    }) => {
      const file = window.WWebJS.mediaInfoToFile(mediaInfo);
      const mData = await window.Store.OpaqueData.createFromData(file, file.type);
      const mediaPrep = window.Store.MediaPrep.prepRawMedia(mData, {
        asDocument: forceDocument
      });
      const mediaData = await mediaPrep.waitForPrep();
      const mediaObject = window.Store.MediaObject.getOrCreateMediaObject(mediaData.filehash);
      const mediaType = window.Store.MediaTypes.msgToMediaType({
        type: mediaData.type,
        isGif: mediaData.isGif
      });

      if (forceVoice && mediaData.type === "audio") {
        mediaData.type = "ptt";
      }

      if (forceGif && mediaData.type === "video") {
        mediaData.isGif = true;
      }

      if (forceDocument) {
        mediaData.type = "document";
      }

      if (!(mediaData.mediaBlob instanceof window.Store.OpaqueData)) {
        mediaData.mediaBlob = await window.Store.OpaqueData.createFromData(mediaData.mediaBlob, mediaData.mediaBlob.type);
      }

      mediaData.renderableUrl = mediaData.mediaBlob.url();
      mediaObject.consolidate(mediaData.toJSON());
      mediaData.mediaBlob.autorelease();
      const uploadedMedia = await window.Store.MediaUpload.uploadMedia({
        mimetype: mediaData.mimetype,
        mediaObject,
        mediaType
      });
      const mediaEntry = uploadedMedia.mediaEntry;

      if (!mediaEntry) {
        throw new Error("upload failed: media entry was not created");
      }

      mediaData.set({
        clientUrl: mediaEntry.mmsUrl,
        deprecatedMms3Url: mediaEntry.deprecatedMms3Url,
        directPath: mediaEntry.directPath,
        mediaKey: mediaEntry.mediaKey,
        mediaKeyTimestamp: mediaEntry.mediaKeyTimestamp,
        filehash: mediaObject.filehash,
        encFilehash: mediaEntry.encFilehash,
        uploadhash: mediaEntry.uploadHash,
        size: mediaObject.size,
        streamingSidecar: mediaEntry.sidecar,
        firstFrameSidecar: mediaEntry.firstFrameSidecar
      });
      return mediaData;
    };

    window.WWebJS.getMessageModel = message => {
      const msg = message.serialize();
      msg.isStatusV3 = message.isStatusV3;
      msg.links = message.getLinks().map(link => ({
        link: link.href,
        isSuspicious: Boolean(link.suspiciousCharacters && link.suspiciousCharacters.size)
      }));

      if (msg.buttons) {
        msg.buttons = msg.buttons.serialize();
      }

      if (msg.dynamicReplyButtons) {
        msg.dynamicReplyButtons = JSON.parse(JSON.stringify(msg.dynamicReplyButtons));
      }

      if (msg.replyButtons) {
        msg.replyButtons = JSON.parse(JSON.stringify(msg.replyButtons));
      }

      delete msg.pendingAckUpdate;
      return msg;
    };

    window.WWebJS.getChatModel = async chat => {
      let res = chat.serialize();
      res.isGroup = chat.isGroup;
      res.formattedTitle = chat.formattedTitle;
      res.isMuted = chat.mute && chat.mute.isMuted;

      if (chat.groupMetadata) {
        const chatWid = window.Store.WidFactory.createWid(chat.id._serialized);
        await window.Store.GroupMetadata.update(chatWid);
        res.groupMetadata = chat.groupMetadata.serialize();
      }

      delete res.msgs;
      delete res.msgUnsyncedButtonReplyMsgs;
      delete res.unsyncedButtonReplies;
      return res;
    };

    window.WWebJS.getChat = async chatId => {
      const chatWid = window.Store.WidFactory.createWid(chatId);
      const chat = await window.Store.Chat.find(chatWid);
      return await window.WWebJS.getChatModel(chat);
    };

    window.WWebJS.getContactModel = contact => {
      let res = contact.serialize();
      res.isBusiness = contact.isBusiness;

      if (contact.businessProfile) {
        res.businessProfile = contact.businessProfile.serialize();
      }

      res.isMe = contact.isMe;
      res.isUser = contact.isUser;
      res.isGroup = contact.isGroup;
      res.isWAContact = contact.isWAContact;
      res.isMyContact = contact.isMyContact;
      res.isBlocked = contact.isContactBlocked;
      res.userid = contact.userid;
      return res;
    };

    window.WWebJS.getContact = async contactId => {
      const wid = window.Store.WidFactory.createWid(contactId);
      const contact = await window.Store.Contact.find(wid);
      return window.WWebJS.getContactModel(contact);
    };

    window.WWebJS.getContacts = () => {
      const contacts = window.Store.Contact.models;
      return contacts.map(contact => window.WWebJS.getContactModel(contact));
    };

    window.WWebJS.mediaInfoToFile = ({
      data,
      mimetype,
      filename
    }) => {
      const binaryData = atob(data);
      const buffer = new ArrayBuffer(binaryData.length);
      const view = new Uint8Array(buffer);

      for (let i = 0; i < binaryData.length; i++) {
        view[i] = binaryData.charCodeAt(i);
      }

      const blob = new Blob([buffer], {
        type: mimetype
      });
      return new File([blob], filename, {
        type: mimetype,
        lastModified: Date.now()
      });
    };

    window.WWebJS.arrayBufferToBase64 = arrayBuffer => {
      let binary = "";
      const bytes = new Uint8Array(arrayBuffer);
      const len = bytes.byteLength;

      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }

      return window.btoa(binary);
    };

    window.WWebJS.getFileHash = async data => {
      let buffer = await data.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
      return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
    };

    window.WWebJS.generateHash = async length => {
      var result = "";
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;

      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    };

    window.WWebJS.sendClearChat = async chatId => {
      let chat = window.Store.Chat.get(chatId);

      if (chat !== undefined) {
        await window.Store.SendClear.sendClear(chat, false);
        return true;
      }

      return false;
    };

    window.WWebJS.sendDeleteChat = async chatId => {
      let chat = window.Store.Chat.get(chatId);

      if (chat !== undefined) {
        await window.Store.SendDelete.sendDelete(chat);
        return true;
      }

      return false;
    };

    window.WWebJS.sendChatstate = async (state, chatId) => {
      switch (state) {
        case "typing":
          await window.Store.Wap.sendChatstateComposing(chatId);
          break;

        case "recording":
          await window.Store.Wap.sendChatstateRecording(chatId);
          break;

        case "stop":
          await window.Store.Wap.sendChatstatePaused(chatId);
          break;

        default:
          throw "Invalid chatstate";
      }

      return true;
    };

    window.WWebJS.getLabelModel = label => {
      let res = label.serialize();
      res.hexColor = label.hexColor;
      return res;
    };

    window.WWebJS.getLabels = () => {
      const labels = window.Store.Label.models;
      return labels.map(label => window.WWebJS.getLabelModel(label));
    };

    window.WWebJS.getLabel = labelId => {
      const label = window.Store.Label.get(labelId);
      return window.WWebJS.getLabelModel(label);
    };

    window.WWebJS.getChatLabels = async chatId => {
      const chat = await window.WWebJS.getChat(chatId);
      return (chat.labels || []).map(id => window.WWebJS.getLabel(id));
    };

    window.WWebJS.getOrderDetail = async (orderId, token) => {
      return window.Store.QueryOrder.queryOrder(orderId, 80, 80, token);
    };

    window.WWebJS.getProductMetadata = async productId => {
      let sellerId = window.Store.Conn.wid;
      let product = await window.Store.QueryProduct.queryProduct(sellerId, productId);

      if (product && product.data) {
        return product.data;
      }

      return undefined;
    };
  };

  class Base {
    constructor(client) {
      /**
       * The client that instantiated this
       * @readonly
       */
      Object.defineProperty(this, 'client', {
        value: client
      });
    }

    _clone() {
      return Object.assign(Object.create(this), this);
    }

    _patch(data) {
      return data;
    }

  }

  /**
   * ID that represents a contact
   * @typedef {Object} ContactId
   * @property {string} server
   * @property {string} user
   * @property {string} _serialized
   */

  /**
   * Represents a Contact on WhatsApp
   * @extends {Base}
   */

  class Contact extends Base {
    constructor(client, data) {
      super(client);
      if (data) this._patch(data);
    }

    _patch(data) {
      /**
       * ID that represents the contact
       * @type {ContactId}
       */
      this.id = data.id;
      /**
       * Contact's phone number
       * @type {string}
       */

      this.number = data.userid;
      /**
       * Indicates if the contact is a business contact
       * @type {boolean}
       */

      this.isBusiness = data.isBusiness;
      /**
       * Indicates if the contact is an enterprise contact
       * @type {boolean}
       */

      this.isEnterprise = data.isEnterprise;
      this.labels = data.labels;
      /**
       * The contact's name, as saved by the current user
       * @type {?string}
       */

      this.name = data.name;
      /**
       * The name that the contact has configured to be shown publically
       * @type {string}
       */

      this.pushname = data.pushname;
      this.sectionHeader = data.sectionHeader;
      /**
       * A shortened version of name
       * @type {?string}
       */

      this.shortName = data.shortName;
      this.statusMute = data.statusMute;
      this.type = data.type;
      this.verifiedLevel = data.verifiedLevel;
      this.verifiedName = data.verifiedName;
      /**
       * Indicates if the contact is the current user's contact
       * @type {boolean}
       */

      this.isMe = data.isMe;
      /**
       * Indicates if the contact is a user contact
       * @type {boolean}
       */

      this.isUser = data.isUser;
      /**
       * Indicates if the contact is a group contact
       * @type {boolean}
       */

      this.isGroup = data.isGroup;
      /**
       * Indicates if the number is registered on WhatsApp
       * @type {boolean}
       */

      this.isWAContact = data.isWAContact;
      /**
       * Indicates if the number is saved in the current phone's contacts
       * @type {boolean}
       */

      this.isMyContact = data.isMyContact;
      /**
       * Indicates if you have blocked this contact
       * @type {boolean}
       */

      this.isBlocked = data.isBlocked;
      return super._patch(data);
    }
    /**
     * Returns the contact's profile picture URL, if privacy settings allow it
     * @returns {Promise<string>}
     */


    async getProfilePicUrl() {
      return await this.client.getProfilePicUrl(this.id._serialized);
    }
    /**
     * Gets the Contact's current "about" info. Returns null if you don't have permission to read their status.
     * @returns {Promise<?string>}
     */


    async getAbout() {
      const about = await window.Store.Wap.statusFind(this.id._serialized);
      if (typeof about.status !== 'string') return null;
      return about.status;
    }

  }

  /**
   * Represents a Private Contact on WhatsApp
   * @extends {Contact}
   */

  class PrivateContact extends Contact {}

  /**
   * Represents a Business Contact on WhatsApp
   * @extends {Contact}
   */

  class BusinessContact extends Contact {
    _patch(data) {
      /**
       * The contact's business profile
       */
      this.businessProfile = data.businessProfile;
      return super._patch(data);
    }

  }

  class ContactFactory {
    static create(client, data) {
      if (data.isBusiness) {
        return new BusinessContact(client, data);
      }

      return new PrivateContact(client, data);
    }

  }

  /**
   * Current connection information
   * @extends {Base}
   */

  class ClientInfo extends Base {
    constructor(client, data) {
      super(client);
      if (data) this._patch(data);
    }

    _patch(data) {
      /**
       * Name configured to be shown in push notifications
       * @type {string}
       */
      this.pushname = data.pushname;
      /**
       * Current user ID
       * @type {object}
       */

      this.wid = data.wid;
      /**
       * @type {object}
       * @deprecated Use .wid instead
       */

      this.me = data.wid;
      /**
       * Platform the phone is running on
       * @type {string}
       */

      this.platform = data.platform;
      return super._patch(data);
    }

  }

  /**
   * Location information
   */
  class Location {
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {?string} description
     */
    constructor(latitude, longitude, description) {
      /**
       * Location latitude
       * @type {number}
       */
      this.latitude = latitude;
      /**
       * Location longitude
       * @type {number}
       */

      this.longitude = longitude;
      /**
       * Name for the location
       * @type {?string}
       */

      this.description = description;
    }

  }

  /**
   * Media attached to a message
   * @param {string} mimetype MIME type of the attachment
   * @param {string} data Base64-encoded data of the file
   * @param {?string} filename Document file name
   */
  class MessageMedia {
    constructor(mimetype, data, filename) {
      /**
       * MIME type of the attachment
       * @type {string}
       */
      this.mimetype = mimetype;
      /**
       * Base64 encoded data that represents the file
       * @type {string}
       */

      this.data = data;
      /**
       * Name of the file (for documents)
       * @type {?string}
       */

      this.filename = filename;
    }

  }

  /**
   * Represents a Message on WhatsApp
   * @extends {Base}
   */

  class Message extends Base {
    constructor(client, data) {
      super(client);
      if (data) this._patch(data);
    }

    _patch(data) {
      /**
       * MediaKey that represents the sticker 'ID'
       * @type {string}
       */
      this.mediaKey = data.mediaKey;
      /**
       * ID that represents the message
       * @type {object}
       */

      this.id = data.id;
      /**
       * ACK status for the message
       * @type {MessageAck}
       */

      this.ack = data.ack;
      /**
       * Indicates if the message has media available for download
       * @type {boolean}
       */

      this.hasMedia = data.clientUrl || data.deprecatedMms3Url ? true : false;
      /**
       * Message content
       * @type {string}
       */

      this.body = this.hasMedia ? data.caption || '' : data.body || '';
      /**
       * Message type
       * @type {MessageTypes}
       */

      this.type = data.type;
      /**
       * Unix timestamp for when the message was created
       * @type {number}
       */

      this.timestamp = data.t;
      /**
       * ID for the Chat that this message was sent to, except if the message was sent by the current user.
       * @type {string}
       */

      this.from = typeof data.from === 'object' && data.from !== null ? data.from._serialized : data.from;
      /**
       * ID for who this message is for.
       *
       * If the message is sent by the current user, it will be the Chat to which the message is being sent.
       * If the message is sent by another user, it will be the ID for the current user.
       * @type {string}
       */

      this.to = typeof data.to === 'object' && data.to !== null ? data.to._serialized : data.to;
      /**
       * If the message was sent to a group, this field will contain the user that sent the message.
       * @type {string}
       */

      this.author = typeof data.author === 'object' && data.author !== null ? data.author._serialized : data.author;
      /**
       * Indicates if the message was forwarded
       * @type {boolean}
       */

      this.isForwarded = data.isForwarded;
      /**
       * Indicates if the message is a status update
       * @type {boolean}
       */

      this.isStatus = data.isStatusV3;
      /**
       * Indicates if the message was starred
       * @type {boolean}
       */

      this.isStarred = data.star;
      /**
       * Indicates if the message was a broadcast
       * @type {boolean}
       */

      this.broadcast = data.broadcast;
      /**
       * Indicates if the message was sent by the current user
       * @type {boolean}
       */

      this.fromMe = data.id.fromMe;
      /**
       * Indicates if the message was sent as a reply to another message.
       * @type {boolean}
       */

      this.hasQuotedMsg = data.quotedMsg ? true : false;
      /**
       * Location information contained in the message, if the message is type "location"
       * @type {Location}
       */

      this.location = data.type === MessageTypes.LOCATION ? new Location(data.lat, data.lng, data.loc) : undefined;
      /**
       * List of vCards contained in the message.
       * @type {Array<string>}
       */

      this.vCards = data.type === MessageTypes.CONTACT_CARD_MULTI ? data.vcardList.map(c => c.vcard) : data.type === MessageTypes.CONTACT_CARD ? [data.body] : [];
      /**
       * Indicates the mentions in the message body.
       * @type {Array<string>}
       */

      this.mentionedIds = [];

      if (data.mentionedJidList) {
        this.mentionedIds = data.mentionedJidList;
      }
      /**
       * Links included in the message.
       * @type {Array<string>}
       */


      this.links = data.links;
      return super._patch(data);
    }

    _getChatId() {
      return this.fromMe ? this.to : this.from;
    }
    /**
     * Returns the Contact this message was sent from
     * @returns {Promise<Contact>}
     */


    getContact() {
      return this.client.getContactById(this.author || this.from);
    }
    /**
     * Returns the Contacts mentioned in this message
     * @returns {Promise<Array<Contact>>}
     */


    async getMentions() {
      return await Promise.all(this.mentionedIds.map(async m => await this.client.getContactById(m)));
    }
    /**
     * Returns the quoted message, if any
     * @returns {Promise<Message>}
     */


    async getQuotedMessage() {
      if (!this.hasQuotedMsg) return undefined;
      let msg = window.Store.Msg.get(this.id._serialized);
      const quotedMsg = msg.quotedMsgObj().serialize(); // const quotedMsg = await this.client.pupPage.evaluate((msgId) => {
      //   let msg = window.Store.Msg.get(msgId);
      //   return msg.quotedMsgObj().serialize();
      // }, this.id._serialized);

      return new Message(this.client, quotedMsg);
    }
    /**
     * Sends a message as a reply to this message. If chatId is specified, it will be sent
     * through the specified Chat. If not, it will send the message
     * in the same Chat as the original message was sent.
     *
     * @param {string|MessageMedia|Location} content
     * @param {string} [chatId]
     * @param {MessageSendOptions} [options]
     * @returns {Promise<Message>}
     */


    async reply(content, chatId, options = {}) {
      if (!chatId) {
        chatId = this._getChatId();
      }

      options = { ...options,
        quotedMessageId: this.id._serialized
      };
      return this.client.sendMessage(chatId, content, options);
    }

  }

  class Client extends EventEmitter {
    constructor() {
      super();
    }

    async initialize() {
      await ExposeStore(moduleRaid);
      LoadUtils();
      this.info = new ClientInfo(this, { ...window.Store.Conn.serialize(),
        wid: window.Store.User.getMeUser()
      });

      window.onAddMessageEvent = msg => {
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

      window.Store.Msg.on('add', msg => {
        if (msg.isNewMsg) window.onAddMessageEvent(window.WWebJS.getMessageModel(msg));
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
        mentionedJidList: Array.isArray(options.mentions) ? options.mentions.map(contact => contact.id._serialized) : []
      };
      const sendSeen = typeof options.sendSeen === 'undefined' ? true : options.sendSeen;

      if (content instanceof MessageMedia) {
        internalOptions.attachment = content;
        content = '';
      } else if (options.media instanceof MessageMedia) {
        internalOptions.attachment = options.media;
        internalOptions.caption = content;
        content = '';
      } else if (content instanceof Location) {
        internalOptions.location = content;
        content = '';
      }

      const chatWid = window.Store.WidFactory.createWid(chatId);
      const chat = await window.Store.Chat.find(chatWid);

      if (sendSeen) {
        window.WWebJS.sendSeen(chatId);
      }

      const msg = await window.WWebJS.sendMessage(chat, content, internalOptions, sendSeen);
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
      const profilePic = await window.Store.getProfilePicFull(chatWid);
      return profilePic ? profilePic.eurl : undefined;
    }

  }

  async function sendText(event) {
    try {
      const options = {};

      if (!!event.detail.quotedMessageId) {
        options.quotedMessageId = event.detail.quotedMessageId;
      }

      const message = await window.waClient.sendMessage(`${event.detail.number}@c.us`, event.detail.text, options);
      window.emit("send-text@response", {
        success: true,
        id: message.id._serialized
      });
    } catch (err) {
      window.emit("send-text@response", {
        success: false,
        error: err.toString(),
        message: "Erro ao enviar mensagem na extensão"
      });
    }
  }
  async function sendLocation(event) {
    try {
      const location = new Location(parseFloat(event.detail.location.lat), parseFloat(event.detail.location.lng), event.detail.location.description);
      const message = await window.waClient.sendMessage(`${event.detail.number}@c.us`, location);
      window.emit("send-location@response", {
        success: true,
        id: message.id._serialized
      });
    } catch (err) {
      window.emit("send-location@response", {
        success: false,
        error: err.toString(),
        message: "Erro ao enviar mensagem na extensão"
      });
    }
  }
  async function sendVideo(event) {
    try {
      const video = new MessageMedia(event.detail.video.mimetype, event.detail.video.data, event.detail.video.filename);
      const message = await window.waClient.sendMessage(`${event.detail.number}@c.us`, video);
      window.emit("send-video@response", {
        success: true,
        id: message.id._serialized
      });
    } catch (err) {
      window.emit("send-video@response", {
        success: false,
        error: err.toString(),
        message: "Erro ao enviar mensagem na extensão"
      });
    }
  }
  async function sendImage(event) {
    try {
      const image = new MessageMedia(event.detail.image.mimetype, event.detail.image.data, event.detail.image.filename);
      const message = await window.waClient.sendMessage(`${event.detail.number}@c.us`, image);
      window.emit("send-image@response", {
        success: true,
        id: message.id._serialized
      });
    } catch (err) {
      window.emit("send-image@response", {
        success: false,
        error: err.toString(),
        message: "Erro ao enviar mensagem na extensão"
      });
    }
  }
  async function getProfileInfo(event) {
    try {
      const contact = await window.waClient.getContactById(`${event.detail.number}@c.us`);
      const pic = await contact.getProfilePicUrl();
      window.emit("contact-info@response", {
        success: true,
        pushname: contact.pushname || "",
        name: contact.name || "",
        shortName: contact.shortName || "",
        pictureUrl: pic || ""
      });
    } catch (error) {
      window.emit("contact-info@response", {
        success: false,
        error: error.toString(),
        message: "Erro ao buscar dados do contato"
      });
    }
  }

  const VERSION = "2.1.0";

  window.emit = (name, data) => {
    window.dispatchEvent(new CustomEvent(name, {
      detail: data
    }));
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

})();
