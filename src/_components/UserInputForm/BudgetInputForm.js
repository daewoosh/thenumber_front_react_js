import React from 'react';
import './UserFormInput.less';
import FormInput from '../FormInput/FormInput';
import { observer } from 'mobx-react';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { RoundIcon } from '../SvgIcon';



class InputTypeListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let iconPath = '';
        const baseImgPath = 'assets/img';
        iconPath = baseImgPath + '/' + this.props.IconType + '_filled.svg';
        const id = this.props.Id;
        const isSelected = id === this.props.selectedItem.selectedTypeId;
        return (
            <div
                className={'input-form-type-item' + (isSelected ? ' _selected' : '')}
                onClick={(el) => this.props.onBudgetTypeClick(id)}
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

const periodicalOptions = [
    { value: 1, label: 'Единоразово' },
    { value: 2, label: 'Ежедневно' },
    { value: 3, label: 'Еженедельно' },
    { value: 4, label: 'Ежемесячно' },
    { value: 5, label: 'Ежегодно' },
]
@observer
export class BudgetFormInput extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('mounted');
    }

    render() {
        const { mode, title, selectedItem } = this.props;
        const { typesList } = this.props;
        let titleBegin = '';
        if (mode == 'create')
            titleBegin = 'Добавление ';
        if (mode == 'edit')
            titleBegin = 'Редактирование ';
        const titleMerged = titleBegin + title;
        const canSave = selectedItem.canSave;
        let svBtnClass;
        if (canSave === true) {
            svBtnClass = 'input-form-save-btn';
        }
        else
            svBtnClass = 'input-form-save-btn _disabled';
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
                        <FormInput type='simpleText' value={selectedItem.label} label={'Наименование ' + title} classNames={'full-width'} onChange={this.props.onLabelChange} />
                    </div>
                    <div className="flex-group-wrap" style={{ paddingTop: 0 }}>
                        <FormInput type='money' value={selectedItem.amount} label={'Сумма, Р '} onChange={this.props.onAmountChange} error={selectedItem.errors['amount']} />
                    </div>
                    <div className="flex-group-wrap" style={{ paddingTop: 0 }}>
                        <FormInput type='select' value={selectedItem.regularityId} label={'Регулярность ' + title} options={periodicalOptions} onChange={this.props.onRegularityChange}  error={selectedItem.errors['regularityId']}/>
                        {selectedItem.regularityId == '1' && <FormInput type='date' value={selectedItem.eventDate} label={'День получения ' + title} onChange={(el) => this.props.onEventDateChange(el, 'eventDate')} error={selectedItem.errors['eventDateDay']}/>}
                        {selectedItem.regularityId == '5' && <FormInput type='months' value={selectedItem.eventDate} label={'Месяц получения ' + title} onChange={this.props.onMonthsChange} error={selectedItem.errors['eventDateMonth']} />}
                    </div>
                    <HideComponent isHide={selectedItem.canFillDates === false}>
                        <div className="input-form-checkbox">
                            <label for="subscribeNews">
                                <input type="checkbox" checked={selectedItem.hasDatesBorders} id='subscribeNews' name='subscribeNews' onChange={this.props.onHasDatesBordersChange} />
                                Ограничить период получения {title}
                            </label>
                        </div>
                    </HideComponent>
                    <HideComponent isHide={selectedItem.hasDatesBorders === false}>
                        <div className="flex-group-wrap" style={{ paddingTop: 0 }}>
                            <FormInput type='date' value={selectedItem.startDate} label={'Начало ' + title} onChange={(el) => this.props.onEventDateChange(el, 'startDate')} />
                            <FormInput type='date' value={selectedItem.endDate} label={'Конец ' + title} onChange={(el) => this.props.onEventDateChange(el, 'endDate')} />
                        </div>
                    </HideComponent>
                    {/* {selectedItem.canFillDates && } */}
                    <div className='input-form-controls'>
                        <button className={svBtnClass} onClick={this.props.onSaveClick}>Сохранить</button>
                        {mode === 'edit' && <button className='input-form-del-btn' onClick={() => this.props.onDeleteClick(selectedItem.id, selectedItem.budgetDirection, true)}>Удалить</button>}
                    </div>
                </div>

                {/* {selectedItem && <span>{selectedItem.name}</span>} */}
            </div>
        );
    }
}