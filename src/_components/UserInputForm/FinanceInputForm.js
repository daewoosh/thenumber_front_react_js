import React from 'react';
import './UserFormInput.less';
import FormInput from '../FormInput/FormInput';
import { observer } from 'mobx-react';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { RoundIcon } from '../SvgIcon';
import { getComp } from '../../bs_react_lib/utils/bsDI';


class InputTypeListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let iconPath = '';
        const id = this.props.Id;
        const isSelected = id === this.props.selectedItem.financeTypeId;
        return (
            <div
                className={'input-form-type-item' + (isSelected ? ' _selected' : '')}
                onClick={(el) => this.props.onFinanceTypeClick(id)}
            >
                <div className="list-item-left">
                    <div className="list-item-icon">
                        {/* <img src={iconPath} /> */}
                        <RoundIcon type={this.props.IconType} filled={isSelected} />
                    </div>
                    <div className="list-item-title">
                        {this.props.Name}
                    </div>
                </div >
            </div>
        );
    }
}


class InputTypesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { typesList } = this.props;
        return (
            <div className='input-form-type-items'>
                {typesList.map((el, i) => {
                    return <InputTypeListItem {...el} {...this.props} />
                })}
            </div>
        );
    }
}


@observer
export class FinanceInputForm extends React.Component {
    constructor(props) {
        super(props);
        this.financeStore = getComp('FinanceInputStore');
    }

    componentDidMount() {
        this.financeStore.getActiveTypes();
        this.financeStore.getPassiveTypes();
    }

    render() {

        const { mode, selectedItem, formType, typesList, currentSubTypes, additionalFields } = this.props;
        debugger;
        var options = [];
        for (var i = 0; i < currentSubTypes.length; i++) {
            options.push({ value: currentSubTypes[i].Id, label: currentSubTypes[i].Name });
        }
        // let typesList = [];
        // const { activeTypes, passiveTypes } = this.financeStore;
        // if (formType == '1')
        //     typesList = activeTypes;
        // if (formType == '2')
        //     typesList = passiveTypes;
        const title = 'объекта';
        let titleBegin = '';
        if (mode == 'create')
            titleBegin = 'Добавление ';
        if (mode == 'edit')
            titleBegin = 'Редактирование ';
        debugger;
        const titleMerged = titleBegin + title;
        return (
            <div className='input-form-container'>
                <div className='input-form-content'>
                    <div className='input-form-heading'>
                        <span>{titleMerged}</span>
                        <img src='assets/img/close.svg' onClick={this.props.handleHideModal} style={{ cursor: 'pointer' }} />
                    </div>
                    <div className='input-form-type'>
                        <span>Тип {title}</span>
                        <InputTypesList typesList={typesList} {...this.props} />
                    </div>
                    <div className="flex-group-wrap">
                        <FormInput type='select' value={selectedItem.financeSubTypeId} classNames={'full-width'} label={'Подтип ' + title} options={options} onChange={this.props.onSubTypeChange} />
                    </div>
                    <HideComponent isHide={selectedItem.subTypeSelected === false}>
                        <div className="flex-group-wrap" style={{ paddingTop: 0 }}>
                            {/* <FormInput type='money' value={selectedItem.amount} label={'Сумма, Р '} onChange={this.props.onAmountChange} /> */}
                            {selectedItem.additionalFields.map((el) => {
                                const { FieldType, Id, Value } = el;
                                return (
                                    <FormInput type={el.FieldType} value={Value} label={el.Label} onChange={(e) => this.props.onAdditionalChange(e, FieldType, Id)} />
                                );
                            })}
                        </div>
                    </HideComponent>
                    {/* <div className="flex-group-wrap">
                    <FormInput type='simpleText' value={selectedItem.label} label={'Наименование ' + title} classNames={'full-width'} onChange={this.props.onLabelChange} />
                    <FormInput type='money' value={selectedItem.amount} label={'Сумма, Р '} custStyle={marginRightStyle25} onChange={this.props.onAmountChange} />
                    <br />
                    <FormInput type='select' value={selectedItem.regularityId} label={'Регулярность ' + title} options={periodicalOptions} custStyle={marginRightStyle16} onChange={this.props.onRegularityChange} />
                    <FormInput type='date' value={selectedItem.eventDate} label={'День получения ' + title} onChange={(el) => this.props.onEventDateChange(el, 'eventDate')} />
                </div>
                <HideComponent isHide={selectedItem.canFillDates === false}>
                    <div>
                        <label for="subscribeNews">
                            <input type="checkbox" checked={selectedItem.hasDatesBorders} id='subscribeNews' name='subscribeNews' onChange={this.props.onHasDatesBordersChange} />
                            Ограничить период получения {title}
                        </label>
                    </div>
                </HideComponent>
                <HideComponent isHide={selectedItem.hasDatesBorders === false}>
                    <div className="flex-group-wrap">
                        <FormInput type='date' value={selectedItem.startDate} label={'Начало ' + title} onChange={(el) => this.props.onEventDateChange(el, 'startDate')} custStyle={marginRightStyle16} />
                        <FormInput type='date' value={selectedItem.endDate} label={'Конец ' + title} onChange={(el) => this.props.onEventDateChange(el, 'endDate')} />
                    </div>
                </HideComponent>
                {/* {selectedItem.canFillDates && } */}
                    <div className='input-form-controls'>
                        <button className='input-form-save-btn' onClick={this.props.onSaveClick}>Сохранить</button>
                        {mode === 'edit' && <button className='input-form-del-btn' onClick={() => this.props.onDeleteClick(selectedItem.id, selectedItem.budgetDirection, true)}>Удалить</button>}
                    </div>
                </div>


            </div>
        );
    }
}