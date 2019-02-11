import React from 'react';
// import '../default.less';
import NumberFormat from 'react-number-format';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { RoundIcon } from '../_components/SvgIcon';
import { has } from 'mobx';

export class UserInputListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { type, Amount, fromDate, toDate, IconType, TypeName, Id, Label } = this.props;
        const isFilled = Amount !== null;
        let iconPath = '';
        const baseImgPath = 'assets/img';
        const notShowDash = fromDate === null || toDate === null;
        const hasLabel = !(!Label || /^\s*$/.test(Label));
        debugger;
        if (isFilled)
            iconPath = `${baseImgPath}/${IconType}_filled.svg`
        else
            iconPath = `${baseImgPath}/${IconType}_empty.svg`
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
                            <NumberFormat value={this.props.Amount} displayType={'text'} thousandSeparator={' '} suffix=' &#8381;'/>
                        </div>
                        <div className="input-value-date">
                            {this.props.date}
                        </div>
                        <div className="input-value-date-range">
                            {this.props.fromDate} {notShowDash && <span>-</span>} {this.props.toDate}
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
        debugger;
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