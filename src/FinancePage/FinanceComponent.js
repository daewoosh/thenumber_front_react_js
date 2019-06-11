import React from 'react';
import './FinancePage.less';

import { FinancePanelSection } from './FinancePanelSection';
import { Modal } from 'react-bootstrap';
import { observer } from 'mobx-react';
import moment from 'moment';
import FinanceInputItemStore from '../_stores/FinanceInputItemStore';
import FinanceInputStore from '../_stores/FinanceInputStore';
import { FinanceInputForm } from '../_components/UserInputForm/FinanceInputForm'
import { getComp } from '../bs_react_lib/utils/bsDI';
import NumberFormat from 'react-number-format';
import { debug } from 'util';
import { ErrorToast } from '../_components/Notification';


@observer
export class FinanceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.financeStore = getComp('FinanceInputStore');
        this.financeInputItemStore = new FinanceInputItemStore();
    }

    componentDidMount() {
        this.financeStore.loadActiveItems();
        this.financeStore.loadPassiveItems();
        this.financeStore.getActiveTypes();
        this.financeStore.getPassiveTypes();
    }

    handleClose() {
        debugger;
        this.financeInputItemStore = new FinanceInputItemStore();
        this.financeStore.toggleShowModal();
    }

    handleAddClick = (type) => {
        this.financeStore.setFinanceTypesList(type);
        this.financeInputItemStore = new FinanceInputItemStore();
        this.financeStore.modalFormMode = 'create';
        this.financeStore.currentSubTypes = [];
        this.financeStore.toggleShowModal();
        this.financeInputItemStore.financeGlobalTypeId = type;
    }

    handleItemClick = (el) => {
        this.financeStore.setFinanceTypesList(el.FinanceGlobalTypeId);
        this.financeInputItemStore.loadItem(el.Id);
        this.financeStore.modalFormMode = 'edit';
        this.financeStore.toggleShowModal();

    }

    handleFinanceTypeClick = (id) => {
        this.financeInputItemStore.financeTypeId = id;
        this.financeInputItemStore.financeSubTypeId = 0;
    }

    handleSubTypeChange = (selectedValue) => {
        this.financeInputItemStore.financeSubTypeId = selectedValue.value;
        this.financeInputItemStore.subTypeUniqueCode = selectedValue.code;
    }

    handleAmountChange = (value) => {
        debugger;
        this.financeInputItemStore.amount = value.value;
    }

    handleLabelChange = (value) => {
        debugger;
        this.financeInputItemStore.label = value.target.value;
        this.financeInputItemStore.labelError = null;
    }

    handleAdditionalChange = (value, fieldType, id) => {
        debugger;
        this.financeInputItemStore.updateFieldValue(value, fieldType, id);
    }

    handleReserveSelectionChange = () => {
        debugger;
        this.financeInputItemStore.isReserve = !this.financeInputItemStore.isReserve;
    }

    onSaveClick = () => {
        var saveItemRes = this.financeInputItemStore.saveItem();
        if (saveItemRes !== false)
            saveItemRes.then(() => {
                debugger;
                this.financeStore.loadActiveItems();
                this.financeStore.loadPassiveItems();
                this.handleClose();
            }).catch((err) => {
                ErrorToast(err);
            });
    }

    handleDeleteClick = (id) => {
        var deleteRes = this.financeInputItemStore.removeItem(id);
        deleteRes.then(() => {
            this.financeStore.loadActiveItems();
            this.financeStore.loadPassiveItems();
            this.handleClose();
        });
    }

    mapItemStoreToProps = () => {
        const { financeGlobalTypeId, id, amount, financeTypeId, financySubTypeId, additionalFields, subTypeSelected } = this.financeInputItemStore;
        const selectedItem = {
            financeGlobalTypeId: financeGlobalTypeId,
            amount: amount,
            financeTypeId: financeTypeId,
            financySubTypeId: financySubTypeId,
            additionalFields: additionalFields,
            id: id,
            subTypeSelected: subTypeSelected,
        };
        return selectedItem;
    }


    render() {
        const { activeItems, passiveItems, showModalForm, modalFormMode, modalTitle, formType, currentTypes, currentSubTypes, activeSum, passiveSum, financeTotal } = this.financeStore;

        const selectedItem = this.financeInputItemStore;

        //   selectedItem.additionalFields = additionalFields;
        debugger;
        return (
            <div className="base-panel">
                <div className="base-panel-content">
                    <div className="panel-header">
                        <span>{this.props.name}</span>
                        {/* <span>Финансы</span> */}
                        <NumberFormat
                            value={financeTotal}
                            thousandSeparator=' '
                            displayType={'text'}
                            suffix='&#8381;'
                        />
                    </div>

                    <div className="panel-information">
                        Чтобы оценить ваше благосостояние, заполните информацию о вашем имуществе и обязательствах.
                    </div>
                    <FinancePanelSection
                        handleHideModal={this.handleClose}
                        title='Работающие активы'
                        buttonText='Добавить актив'
                        items={activeItems}
                        emptyText='Укажите стоимость вашего имущества, остатков денежных средств на счетах и вкладах, инвестиций.'
                        onAddClick={() => this.handleAddClick('1')}
                        onItemClick={this.handleItemClick}
                        total={activeSum}
                        tooltipText='Работающие активы: Ваше имущество, вклады и инвестиции'
                    />
                    <FinancePanelSection
                        handleHideModal={this.handleClose}
                        title='Пассивы'
                        buttonText='Добавить пассив'
                        items={passiveItems}
                        emptyText='Укажите все ваши обязательства: ипотеку, кредит, займ.'
                        onAddClick={() => this.handleAddClick('2')}
                        onItemClick={this.handleItemClick}
                        total={passiveSum}
                        tooltipText='Все ваши обязательства'
                    />
                </div>
                <Modal show={showModalForm} onHide={this.handleClose} dialogClassName="custom-modal">
                    <Modal.Body>
                        <FinanceInputForm
                            formType={formType}
                            title={modalTitle}
                            mode={modalFormMode}
                            selectedItem={selectedItem}
                            handleHideModal={this.handleClose}
                            typesList={currentTypes}
                            onFinanceTypeClick={(el) => this.handleFinanceTypeClick(el)}
                            currentSubTypes={currentSubTypes}
                            onSubTypeChange={(el) => this.handleSubTypeChange(el)}
                            //   additionalFields={additionalFields}
                            onAmountChange={(el) => this.handleAmountChange(el)}
                            onAdditionalChange={(el, type, id) => this.handleAdditionalChange(el, type, id)}
                            // onLabelChange={(el) => this.onLabelChange(el)}
                            // onAmountChange={(el) => this.onAmountChange(el)}
                            onSaveClick={this.onSaveClick}
                            // onBudgetTypeClick={(el) => this.onBudgetTypeClick(el)}
                            // onRegularityChange={(el) => this.onRegularityChange(el)}
                            // onHasDatesBordersChange={this.onHasDatesBordersChange}
                            // onEventDateChange={this.onEventDateChange}
                            onDeleteClick={this.handleDeleteClick}
                            handleLabelChange={this.handleLabelChange}
                            onReserveSelectionChange={this.handleReserveSelectionChange}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}