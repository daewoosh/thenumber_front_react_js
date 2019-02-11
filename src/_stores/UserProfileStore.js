import BSMobxStore from 'bs_react_lib/stores/BSMobxStore2';
import Promise from 'es6-promise';
import { observable, action, toJS, computed, reaction } from 'mobx';
import { ajaxReq } from '_services/WebApi';
import { SuccessToast, ErrorToast } from '../_components/Notification';
import { add, get, remove, clear } from '../_services/DataService';


export const getUserProfile = (params) => {
    const res = ajaxReq('GetUserProfile', 'POST', params, true)
    return res;
};

const saveUserProfile = (params) => {
    const res = ajaxReq('SaveUserProfile', 'POST', params, true);
    return res;
}

export const saveUserAvatar = (params) => {
    const res = ajaxReq('SaveUserAvatar', 'POST', params, true)
    return res;
};

export default class UserProfileStore extends BSMobxStore {
    constructor() {
        super({
            action: getUserProfile,
        });
        //reaction(() => this.userFullInfo.ChildrenCount, this.updateChildrenCount.bind(this));
    }

    @observable
    userFullInfo = {}

    @observable
    spouse = {}

    @observable
    children = []



    @computed
    get isMarried() {
        return this.userFullInfo.MaritalStatus == 2;
    }

    // @action
    // updateChildrenCount = () => {
    //     var childrenCopy = toJS(this.children);
    //     const { ChildrenCount } = this.userFullInfo;
    //     this.children.clear();
    //     for (var i = 1; i <= ChildrenCount; i++) {
    //         var kid = childrenCopy[i - 1];
    //         if (kid)
    //             this.children.push(kid);
    //         else
    //             this.children.push({ Gender: null, });
    //     }
    // }

    @action
    updateChild(index, propName, value) {
        var copy = toJS(this.children);
        var newKids = [];
        for (var i = 0; i < copy.length; i++) {
            var child = copy[i];
            if (i === index)
                child[propName] = value;
            newKids.push(child);
        }
        this.children = newKids;
        debugger;
    }

    @action
    saveAvatar = (file) => {
        var param = {
            avatar: file,
        }
        var res = saveUserAvatar(param);
        res.then((data) => {
            SuccessToast('Данные сохранены');
        }).catch((err) => {
            ErrorToast(err);
        });
        return res;
    }

    @action
    setData(data) {
        this.userFullInfo = data.UserFullInfo;
        this.userFirstName = data.UserFullInfo.FirstName;
        this.spouse = data.Spouse;
        this.children = data.Children;
        if (this.children === null)
            this.children = [];
        const copy = toJS(this.children);
        debugger;
        if (this.spouse == null) {
            this.spouse = {
                DateOfBirth: null,
                CountryId: null,
                RegionId: null,
                JobName: null,
                PositionName: null,
            }
        }
    }

    @action
    addChild() {
        this.children.push({ Gender: null, });
    }

    @action
    removeChild(position) {
        var copy = toJS(this.children);
        var newKids = [];
        for (var i = 0; i < copy.length; i++) {
            var child = copy[i];
            if (i !== position)
                newKids.push(child);
        }
        this.children = newKids;

    }

    @action
    saveChanges() {
        let filledSpouse = null;
        if (this.isMarried)
            filledSpouse = this.spouse;

        let kids = [];
        if (this.children.length > 0) {
            var copy = toJS(this.children);
            for (var i = 0; i < copy.length; i++) {
                if (copy[i].Gender === null || copy[i].DateOfBirth === null)
                    continue;
                kids.push(copy[i]);
            }
        }
        debugger;
        const param = {
            UserFullInfo: this.userFullInfo,
            Spouse: filledSpouse,
            Children: kids,
        }
        var res = saveUserProfile(param);
        var afterSaveRes = res.then((data) => {
            var userData = get('userData');
            userData.FirstName = this.userFullInfo.FirstName;
            userData.LastName = this.userFullInfo.LastName;
            userData.IsProfileFilled = this.userFullInfo.LastName;
            remove('userData');
            add('userData', userData);
            SuccessToast('Данные сохранены');

        })
            .catch((err) => {
                ErrorToast(err);
                return Promise.reject();
            });
        return afterSaveRes;
    }

}