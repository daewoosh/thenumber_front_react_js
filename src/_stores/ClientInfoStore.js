import BSMobxStore from 'bs_react_lib/stores/BSMobxStore';
import { getClientInfo } from '../_services/WebApi';

const initState = {
    Email: '',
    FirstName: '',
    Id: '',
    MiddleName: '',
    LastName:'',
    PhoneNumber: ''
  };
  
  export default class ClientInfoStore extends BSMobxStore {
    constructor() {
      super({
        action: getClientInfo,
        initState,
      });
    }
  }