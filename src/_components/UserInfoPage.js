import React from 'react';
import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';
import { getComp } from '../bs_react_lib/utils/bsDI';

import { saveClientInfo } from '../_services/WebApi';

import BSMobxField from '../bs_react_lib/components/fields/BSMobxField2';

import { SuccessToast } from '../_components/Notification';

@observer
export class UserInfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            submitted: false
        };
        this.userStore = getComp('ClientInfoStore');
        this.handleSubmit = this.handleSubmit.bind(this);

        this.updateProperty = this.updateProperty.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.userStore.load();
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { data } = this.userStore;
        // const { MiddleName,LastName,FirstName,PhoneNumber } = data;
        saveClientInfo(data).then(() => {
            SuccessToast('Данные сохранены');
        });
    }

    updateProperty(key, value) {
        this.userStore.data[key] = value
    }

    onChange(event) {
        this.updateProperty(event.target.name, event.target.value)
    }


    render() {
        const { data } = this.userStore;
        return (
            <form name="userInfo" onSubmit={this.handleSubmit}>
                <div className={'form-group'}>
                    <label htmlFor="lastName">Фамилия</label>
                    <input type="text" className="form-control" name="LastName" value={data.LastName} onChange={this.onChange} />
                </div>
                <div className={'form-group'}>
                    <label htmlFor="firstName">Имя</label>
                    <input type="text" className="form-control" name="FirstName" value={data.FirstName} onChange={this.onChange} />
                </div>
                <div className={'form-group'}>
                    <label htmlFor="middleName">Отчество</label>
                    <input type="text" className="form-control" name="MiddleName" value={data.MiddleName} onChange={this.onChange} />

                </div>
                <div className={'form-group'}>
                    <label htmlFor="phoneNumber">Телефон</label>
                    <input type="text" className="form-control" name="PhoneNumber" value={data.PhoneNumber} onChange={this.onChange} />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Сохранить</button>
                </div>
            </form>
        );
    }
}

