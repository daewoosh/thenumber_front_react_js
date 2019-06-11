import React, { Fragment } from 'react';
import { TargetSliders } from '../_components/Sliders';
import RadioElems from '../_components/RadioElems';
import { getComp } from '../bs_react_lib/utils/bsDI';
import { SuccessToast, ErrorToast } from '../_components/Notification';
import { observer } from 'mobx-react';
import NumberFormat from 'react-number-format';

@observer
export class UserAimsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.reportStore = getComp('CalcStore');



    }

    componentDidMount(){
        this.reportStore.getReport(false);
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

    handleSelectInflation = () => {
        //const {isInflationSelected}=this.state
        this.reportStore.toggleUseInflation();
    }

    handleRadioClick = (el) => {
        debugger;
        this.reportStore.spendCapital = !this.reportStore.spendCapital;
    }

    render() {
        const { isInflationSelected, spendCapital, selectedYear, selectedCapital, selectedSpendAmount,selectedIncome } = this.reportStore;
        debugger;
        const radioData = [
            {
                title: 'Тратить капитал на пенсии',
                text: 'Накопления будут постепенно уменьшаться в течении заданного периода',
                amount: selectedSpendAmount,
                isElemSelected: spendCapital,
            },
            {
                title: 'Жить только на проценты от капитала',
                text: 'Пассивный доход и вы сможете передать капитал по наследству',
                amount: selectedIncome,
                isElemSelected: !spendCapital,
            }
        ];

        const year = '2047';
        const capital = '27 000 000';
        return (
            <div className="base-panel">
                <div className="base-panel-content">
                    <div className="panel-header">
                        <span>Цели</span>
                    </div>
                    <div className="panel-information">
                        То, к чему будем стремиться при создании капитала
                    </div>
                    <TargetSliders />

                    <div className="aim-note">Ваш капитал к {selectedYear} году - <span>
                        <NumberFormat
                            value={Math.round(selectedCapital)}
                            thousandSeparator=' '
                            displayType={'text'}
                            suffix=' &#8381;'
                        />
                    </span></div>

                    <div className="aim-income-block">
                        <div className="aim-income-title">
                            <h4>Ваш доход на пенсии</h4>
                            <div className="toggle-block" onClick={this.handleSelectInflation}>
                                <span
                                    className={isInflationSelected ? 'widget-title _active' : 'widget-title'}
                                >
                                    Учесть инфляцию
                                </span>
                                {
                                    isInflationSelected
                                        ? <img src="./assets/img/toggle-on.svg" />
                                        : <img src="./assets/img/toggle-off.svg" />
                                }
                            </div>
                        </div>
                        {
                            isInflationSelected ?
                                <div className="aim-note">
                                    В течение времени покупательная способность денег снижается, деньги обесцениваются —
                                    частично утрачивают стоимость. При включенной опции отображается покупательная
                                    способность дохода, как если бы вы получали его уже сегодня.
                            </div>
                                : null
                        }
                        <div className="aim-radio-container">
                            <RadioElems
                                //isElemSelected={this.state.selectedRadioElem}
                                onElemClick={this.handleRadioClick}
                                collection={radioData}
                            />
                        </div>
                    </div>

                    <div className="input-form-controls">
                        <button className="input-form-save-btn full-width" onClick={this.onSaveAimClick}>Сохранить цель</button>
                    </div>
                </div>
            </div>
        );
    }
}