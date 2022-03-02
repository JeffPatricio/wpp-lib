import Base from './Base';
import MessageMedia from './MessageMedia';
import Location from './Location';
import { MessageTypes } from '../util/Constants';

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
    this.from =
      typeof data.from === 'object' && data.from !== null
        ? data.from._serialized
        : data.from;

    /**
     * ID for who this message is for.
     *
     * If the message is sent by the current user, it will be the Chat to which the message is being sent.
     * If the message is sent by another user, it will be the ID for the current user.
     * @type {string}
     */
    this.to =
      typeof data.to === 'object' && data.to !== null
        ? data.to._serialized
        : data.to;

    /**
     * If the message was sent to a group, this field will contain the user that sent the message.
     * @type {string}
     */
    this.author =
      typeof data.author === 'object' && data.author !== null
        ? data.author._serialized
        : data.author;

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
    this.location =
      data.type === MessageTypes.LOCATION
        ? new Location(data.lat, data.lng, data.loc)
        : undefined;

    /**
     * List of vCards contained in the message.
     * @type {Array<string>}
     */
    this.vCards =
      data.type === MessageTypes.CONTACT_CARD_MULTI
        ? data.vcardList.map((c) => c.vcard)
        : data.type === MessageTypes.CONTACT_CARD
        ? [data.body]
        : [];

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
    return await Promise.all(
      this.mentionedIds.map(async (m) => await this.client.getContactById(m))
    );
  }

  /**
   * Returns the quoted message, if any
   * @returns {Promise<Message>}
   */
  async getQuotedMessage() {
    if (!this.hasQuotedMsg) return undefined;

    let msg = window.Store.Msg.get(this.id._serialized);
    const quotedMsg = msg.quotedMsgObj().serialize();

    // const quotedMsg = await this.client.pupPage.evaluate((msgId) => {
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

    options = {
      ...options,
      quotedMessageId: this.id._serialized,
    };

    return this.client.sendMessage(chatId, content, options);
  }
}

export default Message;
