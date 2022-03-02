import PrivateContact from '../structures/PrivateContact';
import BusinessContact from '../structures/BusinessContact';

class ContactFactory {
  static create(client, data) {
    if (data.isBusiness) {
      return new BusinessContact(client, data);
    }

    return new PrivateContact(client, data);
  }
}

export default ContactFactory;
