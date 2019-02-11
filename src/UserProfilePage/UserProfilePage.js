import React, { Fragment } from 'react';
import { getComp } from '../bs_react_lib/utils/bsDI';
import { observer, toJS } from 'mobx-react';
import { UserProfileComponent } from '../_components/UserProfileComponent';

@observer
export class UserProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.userStore = getComp('UserProfileStore');
        this.onSaveClick = this.onSaveClick.bind(this);
    }
    componentDidMount() {
        this.userStore.load();
    }

    onSaveClick() {
        var saveRes = this.userStore.saveChanges();
        saveRes.Then(() => { document.location.hash = '/home'; })
    }

    render() {
        return (
            <div className='user-profile-page'>
                <UserProfileComponent showAvatar={true} />
                <div className="form-group">
                    <button className="button-wide" onClick={this.onSaveClick}>Сохранить</button>
                </div>
            </div>
        );
    }
}