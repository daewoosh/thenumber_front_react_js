import React from 'react';
// import '../default.less';
import NumberFormat from 'react-number-format';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { RoundIcon } from '../_components/SvgIcon';
import { has } from 'mobx';

const dateRange = (startDate, endDate) => {
    if (startDate === null && endDate === null)
        return null;
    if (startDate && endDate)
        return `${startDate} - ${endDate}`;
    if (startDate && endDate === null)
        return `c ${startDate}`;
    if (endDate && startDate === null)
        return `до ${endDate}`;
}

export class UserInputListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { type, Amount, StartDate, EndDate, IconType, TypeName, Id, Label, DisplayStartDate, DisplayEndDate,Regularity } = this.props;
        const isFilled = Amount !== null;            
        const hasLabel = !(!Label || /^\s*$/.test(Label));     
        return (
            <div className="user-input-list-item" onClick={this.props.onClick}>
                <div className="list-item-left">
                    <div className="list-item-icon">
                        <RoundIcon type={IconType} filled={isFilled} />
                    </div>
                    <div className="list-item-title-container">
                        <div className="list-item-title">
                            {Label || TypeName}
                        </div>
                        <HideComponent isHide={hasLabel === false}>
                            <div className="list-item-type-name">
                                {TypeName}
                            </div>
                        </HideComponent>
                    </div>
                </div >
                <HideComponent isHide={!isFilled} >
                    <div className="list-item-right">
                        <div className="list-item-input-value">
                            <NumberFormat value={Amount} displayType={'text'} thousandSeparator={' '} suffix=' &#8381;' />
                        </div>
                        <div className="input-value-date">
                            {Regularity}
                        </div>
                        <div className="input-value-date-range">
                            {/* {DisplayStartDate} {notShowDash && <span>-</span>} {DisplayEndDate} */}
                            {dateRange(DisplayStartDate, DisplayEndDate)}
                        </div>
                    </div>
                </HideComponent>
                <HideComponent isHide={isFilled}>
                    <div className="list-item-right flex-row">
                        <div className="list-item-flex-row">
                            <button className="list-item-fill-btn" onClick={this.props.onFillClick}>Заполнить</button>
                            <a className="list-item-hide-btn" onClick={this.props.onDeleteClick}>Скрыть</a>
                        </div>
                    </div>
                </HideComponent>
            </div >
        );
    }
}



export class UserInputList extends React.Component {
    constructor(props) {
        super(props);
    }

    handleHideClick = (e, el) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onDeleteClick(el.Id, el.BudgetDirection);
        //console.log('hide ' + el.name);
    }

    handleFillClick = (e, el) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.onItemClick(el);
    }

    render() {
        const items = this.props.items;
        return (
            <div className="items-list">
                {items.map((el, index) => {
                    return <UserInputListItem  {...el} onClick={(e) => this.props.onItemClick(el)} onDeleteClick={(e) => this.handleHideClick(e, el)} onFillClick={(e) => this.handleFillClick(e, el)} />
                })}
            </div>
        );
    }
}