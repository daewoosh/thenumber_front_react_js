import { action, computed, observable } from 'mobx';
import BSMobxPagedCollectionStore from './BSMobxPagedCollectionStore';


const defParams = {
  pageSize: 10,
  pageNumber: 0,
};

class BSMobxPagedCollectionStoreAutoLoad extends BSMobxPagedCollectionStore {
  constructor(props) {
    super(props)
  } 
  
  
  @computed
  get isLoadMoreEnabled() {
    return this.collection.length !== this.total;
  }

  loadNextPage = (params = defParams) => {
    this.loadPage(params, this.pageNumber + 1);

  }

  setPageNumberToRequest = (params, pageNumber) =>{
    params.PageNumber = pageNumber
  }

  @action
  loadPage = (params = defParams, pageNumber = 0) => {
    if (!params) {
      return;
    }
    this.setPageNumberToRequest(params, pageNumber);
    //params.request.PageNumber =  pageNumber;
    this.reLoad(params);
    this.pageNumber = pageNumber;
  }

  setData = (data) => {
    const newData = { ...data };
    debugger
    if (data.PageNumber > 0) {
      newData.Collection = [...this.collection, ...data.Collection];
    }
    super.setData(newData);
  }
}
export default BSMobxPagedCollectionStoreAutoLoad;
