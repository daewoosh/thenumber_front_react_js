import BSMobxStore from 'bs_react_lib/stores/BSMobxStore';
import { observable, action, toJS } from 'mobx';
import { ajaxReq } from '_services/WebApi';
import uuid from 'uuid/v1';

export const getCurrentForm = (params) => {
    const res = ajaxReq('GetCurrentForm', 'POST', params, true)
    return res;
};

export default class QuestionFormStore extends BSMobxStore {
    constructor() {
        super({
            action: getCurrentForm,
        });
        this.loadParams = this.currentIndex;
        this.setCurrentIndex = this.setCurrentIndex.bind(this);
        this.updateForm = this.updateForm.bind(this);
        this.setLoadingStatus = this.setLoadingStatus.bind(this);
    }

    @observable
    currentIndex = 1;

    @observable
    total = 1;

    @observable
    form = {
        DisplayName: "L1Name",
    }

    @observable
    lvl2s = [];


    @action
    setData(data) {
        debugger;
        this.total = data.Total;
        this.form = data.Form;
        this.lvl2s = data.Form.Level2s;
        super.setData();
    }
    setLoadingStatus() {
        super.setLoadingStatus();
    }

    @action
    updateForm() {
        super.setIsLoaded(false);
        debugger;
        const isL = this.isLoaded;
        const params = { currentIndex: this.currentIndex };
        var res = getCurrentForm(params);
        res.then((data) => {
            this.setData(data);
            super.setIsLoaded(true);
        })
            .catch((errMsg) => {
                ErrorToast(errMsg);
            });
    }

    @action
    setCurrentIndex(index) {
        this.currentIndex = index;
        this.updateForm();
    }

    @action
    addAnswerToQuestion(levelId,groupId,qUniqueCode,value)
    {
       // var copy = toJS(this.lvl2s);
       // const filteredArray = copy.filter(item => item.Id === levelId);
        debugger;
       // const question1 = filteredArray[0].Level2Groups.filter(item => item.GroupId === groupId);
      //  var q2 = question1[0].QuestionsWithAnswers.filter(item=> item.UniqueCode ===qUniqueCode)[0];

        this.lvl2s.filter(item => item.Id === levelId)[0].Level2Groups.filter(item => item.GroupId === groupId)[0].QuestionsWithAnswers.filter(item=> item.UniqueCode ===qUniqueCode)[0].Answer = value;
    }


    @action
    removeCategoryFromLevel = (levelId, catId) => {
        let arrWithoutCategory = toJS(this.lvl2s);
        let neededCategory = toJS(this.lvl2s).filter(el=>el.Id === levelId);
        const newSetOfQuestions = neededCategory[0].Level2Groups.filter(el => el.GroupId !== catId);
        neededCategory[0].Level2Groups = newSetOfQuestions;
        arrWithoutCategory.forEach((el, index)=> {
            if (el.Id === levelId) {
                arrWithoutCategory[index] = neededCategory[0];
            }
        })
        this.lvl2s = arrWithoutCategory;
    }

    @action
    addCategoryToLevel(levelId) {
        debugger;
        var copy = toJS(this.lvl2s);
        const filteredArray = copy.filter(item => item.Id === levelId);
        const QAs = filteredArray[0].Level2Groups[0].QuestionsWithAnswers;

        const copyQAs = [];
        const grId = uuid();
        for (let i = 0; i < QAs.length; i++) {
            copyQAs.push(
                {
                    DisplayName: QAs[i].DisplayName,
                    UniqueCode: QAs[i].UniqueCode,
                    InputType: QAs[i].InputType,
                    Id: QAs[i].Id,
                    Answer: null,
                    AnswerId: 0,
                    MaxOccurs: QAs[i].MaxOccurs,

                })
        }
        debugger;

        var newQQ = filteredArray[0].Level2Groups.concat({ GroupId: grId, QuestionsWithAnswers: copyQAs });
        filteredArray[0].Level2Groups = newQQ;

        var newAll = [];
        this.lvl2s.map(item => {
            if (item.Id !== levelId)
                newAll.push(toJS(item));
            else
                newAll.push(filteredArray[0]);
        });
        debugger;
        this.lvl2s = newAll;      

    }
}

