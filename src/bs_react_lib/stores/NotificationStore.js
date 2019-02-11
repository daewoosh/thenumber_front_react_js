import { observable, action } from 'mobx';

const msgType = new Map();
msgType.set('success');
msgType.set('fail');

class NotificationStore {
  @observable
  message = '';
  @observable
  type = '';
  @observable
  count = 0;

  setMessage = (msg) => {
    if (!msg || !msgType.has(msg.type) || !msg.message) {
      console.log('NotificationStore.setMessage: Некорректные входные данные');
      return;
    }
    switch (msg.type) {
      case 'success':
        this.success(msg.message);
        break;
      case 'fail':
        this.fail(msg.message);
        break;
      default:
        break;
    }
  }

  @action
  success = (message) => {
    if (!message) return;
    this.message = message;
    this.type = 'success';
    this.count += 1;
  }

  @action
  fail = (message) => {
    if (!message) return;
    this.message = message;
    this.type = 'fail';
    this.count += 1;
  }
}

export default NotificationStore;
