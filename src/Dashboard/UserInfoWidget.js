import React from 'react';
import NumberFormat from 'react-number-format';


class UserInfoWidget extends React.Component {
    constructor(props) {
        super(props);
    }

    getAgeEnding = (age) => {
        if (age) {
            var ageStr = age.toString();
            if (ageStr.endsWith(1))
                return 'год';
            if (ageStr.endsWith(2) || ageStr.endsWith(3) || ageStr.endsWith(4))
                return 'года';
            return 'лет';
        }
    }

    render() {
        const { age, funds, expense } = this.props;
        return (
            <div className="user-info-container">
                <div className="user-info-item">
                    <h6 className="item-title">Возраст</h6>
                    <p className="item-value">{age}<span className="suffix">{this.getAgeEnding(age)}</span></p>
                </div>
                <div className="user-info-item">
                    <h6 className="item-title">Капитал</h6>
                    <div className="item-value">
                        <NumberFormat
                            value={Math.round(funds)}
                            thousandSeparator=' '
                            displayType={'text'}
                        />
                        <span className="suffix">&#8381;</span>
                    </div>
                </div>
                <div className="user-info-item">
                    <h6 className="item-title">Расходы</h6>
                    <div className="item-value">
                        <NumberFormat
                            value={expense}
                            thousandSeparator=' '
                            displayType={'text'}
                        />
                        <span className="suffix">&#8381;</span>
                    </div>
                </div>
            </div>
        );
    }
}


export default UserInfoWidget;