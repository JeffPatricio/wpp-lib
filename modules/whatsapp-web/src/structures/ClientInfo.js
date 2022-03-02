import Base from './Base';

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

export default ClientInfo;
