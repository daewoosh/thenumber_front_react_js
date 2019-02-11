import React, { Fragment } from 'react';
import { TargetSliders } from '../_components/Sliders'
import { getComp } from '../bs_react_lib/utils/bsDI';
import { SuccessToast, ErrorToast } from '../_components/Notification';

export class UserAimsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.reportStore = getComp('CalcStore');
    }

    onSaveAimClick = () => {
        debugger;
        var saveRes = this.reportStore.saveAim();
        saveRes.then((data) => {
            document.location.hash = '/home';
            SuccessToast('Цели обновлены');
        })
            .catch((err) => {
                ErrorToast(err);
            });

    }

    render() {
        return (
            <div className="base-panel">
                <div className="base-panel-content">
                    <div className="panel-header">
                        <span>Цели</span>
                    </div>
                    <div className="panel-information">
                        То, что реально получить при текущей ситуации
                    </div>
                    <TargetSliders />
                    <div className="input-form-controls">
                        <button className="input-form-save-btn full-width" onClick={this.onSaveAimClick}>Сохранить </button>
                    </div>
                </div>
            </div>
        );
    }
}