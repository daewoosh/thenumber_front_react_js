import bsAjax from './bsAjax';
import { API_PATH } from '../constants';
import { getComp } from './bsDI';


// eslint-disable-next-line
const bsAjaxMethod = ({ serverMethodName, sendMethod, actionId, successMessage, params = {}, isNeedToken = true, isTest = false }) => {
  if (isTest) {
    //return webAPITestData(method, params);
  }
  const res = bsAjax({
    url: `${API_PATH}/srv/${serverMethodName}`,
    sendMethod,
    params,
    isNeedToken,
  });
  const notificationStore = getComp('NotificationStore');
  
  res.then(
    () => {
      if (successMessage) {
        notificationStore.success(successMessage);
      }
    },
    (error) => {
      
      notificationStore.fail(error.message);
    },
  );

  return res;
};

export default bsAjaxMethod;
