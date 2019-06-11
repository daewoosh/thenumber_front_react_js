import React from 'react';
import './BudgetPage.less';
import { PanelSection } from '../_components';
import { BudgetFormInput } from '../_components/UserInputForm/BudgetInputForm';
import { Modal } from 'react-bootstrap';
import BudgetInputStore from '../_stores/BudgetInputStore';
import BudgetInputItemStore from '../_stores/BudgetInputItemStore';
import { observer } from 'mobx-react';
import moment from 'moment';
import { getComp } from '../bs_react_lib/utils/bsDI';


@observer
export class BudgetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.budgetStore = getComp('BudgetInputStore');
        this.budgetItemStore = new BudgetInputItemStore();
    }

    componentDidMount() {
        this.budgetStore.loadIncomeItems();
        this.budgetStore.loadExpenceItems();
        this.budgetStore.loadIncomeTypes();
        this.budgetStore.loadExpenceTypes();
    }

    handleClose() {
        this.budgetItemStore = new BudgetInputItemStore();
        this.budgetStore.toggleShowModal();
    }



    handleAddClick = (type) => {
        this.budgetStore.setBudgetTypesList(type);
        this.budgetItemStore = new BudgetInputItemStore();
        this.budgetStore.modalFormMode = 'create';
        this.budgetStore.toggleShowModal();
        this.budgetItemStore.budgetDirection = type;
    }

    //клик на тип дохода/расхода
    onBudgetTypeClick = (id) => {
        debugger;
        this.budgetItemStore.selectedTypeId = id;
    }

    //открытие на редактирование элемента из списка
    onItemClick = (el) => {
        this.budgetStore.setBudgetTypesList(el.BudgetDirection);
        this.budgetItemStore.loadItem(el.Id);
        this.budgetStore.modalFormMode = 'edit';
        this.budgetStore.toggleShowModal();

    }

    onLabelChange = (e) => {
        debugger;
        const { name, value } = e.target;
        this.budgetItemStore.label = value;
    }

    onAmountChange = (e) => {
        debugger;
        //  const { name, value } = e.target;
        this.budgetItemStore.amount = e.value;
    }

    onSaveClick = () => {
        var saveItemRes = this.budgetItemStore.saveItem();
        if (saveItemRes !== false)
            saveItemRes.then(() => {
                this.budgetStore.loadIncomeItems();
                this.budgetStore.loadExpenceItems()
                this.handleClose();
            });
        //почему то не работает если вызывать через if
        //TODO оптимизировать
        // let savedItem = this.mapItemStoreToProps();
        // if (savedItem2.BudgetDirection == '1')
        //     this.budgetStore.loadIncomeItems();
        // if (savedItem2.BudgetDirection == '2')
        //     this.budgetStore.loadExpenceItems();

    }

    onDeleteClick = (id, budgetDirection, closeModal) => {
        debugger;
        var removerRes = this.budgetStore.removeItem(id, budgetDirection);
        removerRes.then(() => {
            debugger;
            if (closeModal)
                this.handleClose();
            this.budgetStore.loadIncomeItems();
            this.budgetStore.loadExpenceItems();

        });

    }

    onRegularityChange = (value) => {
        debugger;
        this.budgetItemStore.regularityId = value.value;
    }

    onMonthsChange = (value) => {
        this.budgetItemStore.eventDate = value.value;
    }

    onHasDatesBordersChange = () => {
        this.budgetItemStore.hasDatesBorders = !this.budgetItemStore.hasDatesBorders;
    }

    onEventDateChange = (date, propName) => {
        debugger;
        const value = moment(date).toISOString();
        this.budgetItemStore[propName] = value;
    }

    mapItemStoreToProps = () => {
        const { label, selectedTypeId, amount, regularityId, eventDate, startDate, endDate, id, canFillDates, hasDatesBorders, budgetDirection, errors, canSave } = this.budgetItemStore;
        const selectedItem = {
            label: label,
            selectedTypeId: selectedTypeId,
            amount: amount,
            regularityId: regularityId,
            eventDate: eventDate,
            startDate: startDate,
            endDate: endDate,
            id: id,
            canFillDates: canFillDates,
            hasDatesBorders: hasDatesBorders,
            budgetDirection: budgetDirection,
            errors: errors,
            canSave: canSave,
        };
        return selectedItem;
    }

    render() {
        const { expenceItems, incomeItems, showModalForm, modalFormMode, currentTypes, modalTitle } = this.budgetStore;
        const selectedItem = this.budgetItemStore;
        return (
            <div className="base-panel">
                <div className="base-panel-content">
                    <div className="panel-header">
                        <span>Бюджет</span>
                    </div>
                    <div className="panel-information">
                        В данном разделе необходимо заполнить информацию по доходам и расходам,
                         чтобы понять текущее финансовое состояние и затем построить план по достижению ваших целей.
                         Чем подробнее заполните, тем качественнее будет план действий.
                    </div>
                    <PanelSection
                        handleHideModal={this.handleClose}
                        title="Доходы"
                        items={incomeItems}
                        onAddClick={(e) => this.handleAddClick('1')}
                        onDeleteClick={this.onDeleteClick}
                        buttonText='Добавить'
                        onItemClick={this.onItemClick}
                        emptyText='Укажите входящие денежные доходы, как постоянные - зарплата или сдача в аренду, так и периодические - премии, возврат долга, дивиденды.'
                        tooltipText='Зарплата и другие источники доходов'
                    />
                    <PanelSection
                        handleHideModal={this.handleClose}
                        title="Расходы"
                        items={expenceItems}
                        onAddClick={(e) => this.handleAddClick('2')}
                        buttonText='Добавить'
                        onItemClick={this.onItemClick}
                        onDeleteClick={this.onDeleteClick}
                        emptyText='Укажите все ваши текущие расходы - ежемесячные траты, аренда квартиры и периодические - отпуск, страховка, налоги, обучение.'
                        tooltipText='Все ваши текущие и планируемые траты'
                    />
                </div>
                <Modal show={showModalForm} onHide={this.handleClose} dialogClassName="custom-modal">
                    <Modal.Body>
                        <BudgetFormInput
                            typesList={currentTypes}
                            title={modalTitle}
                            mode={modalFormMode}
                            selectedItem={selectedItem}
                            handleHideModal={this.handleClose}
                            onLabelChange={(el) => this.onLabelChange(el)}
                            onAmountChange={(el) => this.onAmountChange(el)}
                            onSaveClick={this.onSaveClick}
                            onBudgetTypeClick={(el) => this.onBudgetTypeClick(el)}
                            onRegularityChange={(el) => this.onRegularityChange(el)}
                            onHasDatesBordersChange={this.onHasDatesBordersChange}
                            onEventDateChange={this.onEventDateChange}
                            onDeleteClick={this.onDeleteClick}
                            onMonthsChange={this.onMonthsChange} />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}