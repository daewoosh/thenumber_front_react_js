import React from 'react';
// import '../default.less';
import NumberFormat from 'react-number-format';
import HideComponent from 'bs_react_lib/components/HideComponent';
import { RoundIcon } from '../_components/SvgIcon';

export class UserFinanceInputListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { type, Amount, IconType, TypeName, Id } = this.props;
        debugger;
        const isFilled = Amount !== null;
        let iconPath = '';
        const baseImgPath = 'assets/img';
        if (isFilled)
            iconPath = `${baseImgPath}/${IconType}_filled.svg`
        else
            iconPath = `${baseImgPath}/${IconType}_empty.svg`
        return (
            <div className="user-input-list-item" onClick={this.props.onClick}>
                <div className="list-item-left">
                    <div className="list-item-icon">
                        {/* <img src={iconPath} /> */}
                        <RoundIcon type={IconType} filled={isFilled} />
                    </div>
                    <div className="list-item-title-container">
                        <div className="list-item-title">
                            {this.props.FinanceTypeDescription}
                        </div>
                    </div>
                    <div className="list-item-title_sub">
                        {this.props.FinanceSubTypeDescription.substring(0, 15)}
                    </div>
                </div >
                <HideComponent isHide={!isFilled} >
                    <div className="list-item-right">
                        <div className="list-item-input-value">
                            <NumberFormat value={this.props.Amount} displayType={'text'} thousandSeparator={' '} />
                        </div>
                        {/* <div className="input-value-date">
                            {this.props.date}
                        </div>
                        <div className="input-value-date-range">
                            {this.props.fromDate} {notShowDash && <span>-</span>} {this.props.toDate}
                        </div> */}
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



export class UserFinanceInputList extends React.Component {
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
                    return <UserFinanceInputListItem  
                                {...el} 
                                onClick={(e) => this.props.onItemClick(el)} 
                                onDeleteClick={(e) => this.handleHideClick(e, el)} 
                                onFillClick={(e) => this.handleFillClick(e, el)} 
                            />
                })}
            </div>
        );
    }
}