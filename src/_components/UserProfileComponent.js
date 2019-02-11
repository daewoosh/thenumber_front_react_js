import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { observer, toJS } from 'mobx-react';
import { getComp } from '../bs_react_lib/utils/bsDI';
import FormInput from './FormInput/FormInput';
import { API_PATH, CONFIRM_EMAIL, TOKEN_NAME } from '../_constants';
import HideComponent from 'bs_react_lib/components/HideComponent';

@observer
export class UserProfileComponent extends React.Component {
    constructor(props) {
        super(props);
        this.userStore = getComp('UserProfileStore');
        this.commonStore = getComp('CommonStore');
        this.onSaveClick = this.onSaveClick.bind(this);
        this.userOnChangeText = this.userOnChangeText.bind(this);
       // this.userStore.load();

    }

   
    onChangeFile(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        var saveRes = this.userStore.saveAvatar(file);
        saveRes.then(() => {
            this.commonStore.toggleRefreshAvatar();
        })
    }

    onSaveClick() {
        this.userStore.saveChanges();
    }

    removeChild(position) {
        this.userStore.removeChild(position);
    }

    userOnChangeText(e, propName) {
        const { name, value } = e.target;
        this.userStore.userFullInfo[propName] = value;
    }

    spouseOnChangeText(e, propName) {
        const { value } = e.target;
        this.userStore.spouse[propName] = value;
    }

    onUserSelectionChange(e, propName) {
        debugger;
        this.userStore.userFullInfo[propName] = e.value;
    }

    onSpouseSelectionChange(e, propName) {
        this.userStore.spouse[propName] = e.value;
    }

    onChildSelectionChange(e, propName, index) {
        debugger;
        this.userStore.updateChild(index, propName, e.value);
    }

    onUserDateChange(e, propName) {
        const value = moment(e).toISOString();
        this.userStore.userFullInfo[propName] = value;
    }

    onSpouseDateChange(e, propName) {
        const value = moment(e).toISOString();
        this.userStore.spouse[propName] = value;
    }

    onChildDateChange(e, propName, index) {
        const value = moment(e).toISOString();
        this.userStore.updateChild(index, propName, value);
    }

    onAddChild=()=>{
        this.userStore.addChild();
    }

    mapIntToNumberString = (number) => {
        if (number === 1) return "Первый";
        if (number === 2) return "Второй";
        if (number === 3) return "Третий";
        if (number === 4) return "Четвертый";
        if (number === 5) return "Пятый";
        if (number === 6) return "Шестой";
        if (number === 7) return "Седьмой";
        if (number === 8) return "Восьмой";
        if (number === 9) return "Девятый";
        if (number === 10) return "Десятый";
        return "Очередной";
    }

    render() {
        const { userFullInfo, spouse, children, userFirstNamem, isMarried } = this.userStore;
        const { changeAvatar } = this.commonStore;
        const avatarUrl = changeAvatar !== false ?
            `${API_PATH}/getuseravatar?userId=${userFullInfo.Id}&refresh=${new Date().getTime()}` :
            `${API_PATH}/getUserAvatar?userId=${userFullInfo.Id}&refresh=${new Date().getTime()}`
        return (
            <div className="profile-flex-container">
                <div className="profile-content">
                    <div className="profile-header big">
                        <span>Профиль</span>
                        {this.props.showAvatar===true && <div className="profile-avatar-container">
                            <img className="profile-avatar" src={avatarUrl} />
                            <div className="avatar-edit" onClick={() => { this.upload.click() }}>
                                <img className="pencil-img" src="assets/img/pencil.svg" />
                                <input id="myInput"
                                    type="file"
                                    ref={(ref) => this.upload = ref}
                                    style={{ display: 'none' }}
                                    onChange={this.onChangeFile.bind(this)}
                                    accept="image/*"
                                />
                            </div>
                        </div>
                        }
                    </div>
                    <div className="flex-group-wrap">
                        {/* <div className="flex-control-group"> */}
                        <FormInput label="Имя" value={userFullInfo.FirstName} name="userFirstName" type="simpleText" onChange={(event) => this.userOnChangeText(event, 'FirstName')}  />
                        {/* <FormInput label="Фамилия" value={userFullInfo.LastName} name="LastName" type="simpleText" onChange={(event) => this.userOnChangeText(event, 'LastName')} /> */}
                        <FormInput label="Пол" value={userFullInfo.Gender} name="Gender" type="gender" onChange={(e) => this.onUserSelectionChange(e, 'Gender')}  />
                        <FormInput label="Дата рождения" value={userFullInfo.DateOfBirth} name="DateOfBirth" type="date" onChange={(e) => this.onUserDateChange(e, 'DateOfBirth')} />
                        <FormInput label="Семейное положение" value={userFullInfo.MaritalStatus} name="MaritalStatus" type="marital"  onChange={(e) => this.onUserSelectionChange(e, 'MaritalStatus')} />
                        <FormInput label="Страна" value={userFullInfo.CountryId} name="CountryId" type="country" onChange={(e) => this.onUserSelectionChange(e, 'CountryId')}  />
                        <FormInput label="Регион" value={userFullInfo.RegionId} name="RegionId" type="region" onChange={(e) => this.onUserSelectionChange(e, 'RegionId')} />
                        <FormInput label="Сфера деятельности" value={userFullInfo.JobName} name="JobName" type="simpleText" onChange={(event) => this.userOnChangeText(event, 'JobName')}  />
                        <FormInput label="Должность" value={userFullInfo.PositionName} name="PositionName" type="simpleText" onChange={(event) => this.userOnChangeText(event, 'PositionName')} />
                        {/* </div> */}
                    </div>
                    {isMarried && <HideComponent isHide={!isMarried} >
                        <div className="profile-header small">
                            <span>Супруга</span>
                        </div>
                        <div className="flex-group-wrap">
                            {/* <FormInput label="Пол" value={spouse.Gender} name="Gender" type="gender" onChange={(e) => this.onSpouseSelectionChange(e, 'Gender')}  /> */}
                            <FormInput label="Дата рождения" value={spouse.DateOfBirth} name="DateOfBirth" type="date"  onChange={(e) => this.onSpouseDateChange(e, 'DateOfBirth')} />
                            <br />
                            <FormInput label="Страна" value={spouse.CountryId} name="CountryId" type="country" onChange={(e) => this.onSpouseSelectionChange(e, 'CountryId')}  />
                            <FormInput label="Регион" value={spouse.RegionId} name="RegionId" type="region" onChange={(e) => this.onSpouseSelectionChange(e, 'RegionId')} />
                            <FormInput label="Сфера деятельности" value={spouse.JobName} name="JobName" type="simpleText" onChange={(event) => this.spouseOnChangeText(event, 'JobName')}  />
                            <FormInput label="Должность" value={spouse.PositionName} name="PositionName" type="simpleText" onChange={(event) => this.spouseOnChangeText(event, 'PositionName')} />
                        </div>
                    </HideComponent>
                    }
                    <div className="profile-header small">
                        <span>Дети</span>
                    </div>
                    <div className="flex-group-container">
                        {children.map((child, i) => {
                            const { Gender, DateOfBirth } = child;
                            return (
                                <div>
                                    {/* <div className="profile-header small">
                                        <span>{this.mapIntToNumberString(i + 1)} ребенок</span>
                                    </div> */}
                                    <div className="flex-group-wrap _deletable">
                                        <FormInput key={'g' + i} label={`Пол ${i + 1}-го ребенка`} value={child.Gender} name="Gender" type="gender" onChange={(e) => this.onChildSelectionChange(e, 'Gender', i)}  />
                                        <FormInput key={'d' + i} label={`Дата рождения ${i + 1}-го ребенка`} value={child.DateOfBirth} name="DateOfBirth" type="date" onChange={(e) => this.onChildDateChange(e, 'DateOfBirth', i)} />
                                        <a title={'Удалить'} onClick={()=>this.removeChild(i)}><img src="./assets/img/close.svg"/></a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="add-child-btn" onClick={this.onAddChild}>Добавить ребенка</button>

                    {/* <div className="form-group">
                        <button className="button-wide" onClick={this.onSaveClick}>Сохранить</button>
                    </div> */}
                </div>
            </div>
        );
    }
}