import React, { Fragment } from 'react';
import { RoundIcon } from '../_components/SvgIcon';
import NumberFormat from 'react-number-format';

class ExpencesListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { iconType, name, amount, month } = this.props;
        return (
            <div className='planned-expences-list-item user-input-list-item' >
                <div className="list-item-left">
                    <div className='list-item-icon'>
                        <RoundIcon type={iconType} filled={true} />
                    </div >
                    <div className="list-item-title-container">
                        <div className="list-item-title">
                            {name}
                        </div>
                    </div>
                </div>
                <div className="list-item-right">
                    <div>{month}</div>
                    <div><NumberFormat
                        value={amount}
                        thousandSeparator=' '
                        displayType={'text'}
                        suffix=' &#8381;'
                    /></div>
                </div>
            </div>
        );
    }
}

class ExpencesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { expences } = this.props;
        return (
            <div className='planned-expences-list-container user-plans-list '>
                {expences.map((el, i) => {
                    return <ExpencesListItem {...el} {...this.props} />
                })}
            </div>
        );
    }
}

class PeriodExpencesComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { expences,TotalExpencesWithPrevious } = this.props.selectedPeriod;
        return (
            <div className="user-plans-container">
                <h5> 
                    Запланированые расходы 
                    <NumberFormat
                        value={TotalExpencesWithPrevious}
                        thousandSeparator=' '
                        displayType={'text'}
                        suffix=' &#8381;'
                    />
                </h5>                
                <ExpencesList expences={expences} />
            </div>
        );
    }
}

export default PeriodExpencesComponent;