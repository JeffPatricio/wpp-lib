/**
 * Client status
 * @readonly
 * @enum {number}
 */
const Status = {
  INITIALIZING: 0,
  AUTHENTICATING: 1,
  READY: 3,
};

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
  INCOMING_CALL: 'incoming_call',
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
  PAYMENT: 'payment',
};

export { Status, Events, MessageTypes };
