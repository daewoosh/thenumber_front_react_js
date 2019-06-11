import React from 'react';
import HideComponent from 'bs_react_lib/components/HideComponent';

class AdviceMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        }
    }
    handleClose = () => {
        this.setState({ show: false });
    }

    render() {
        const { advicetext, closeMessage } = this.props;
        const defaltText = 'Заполните подробнее информацию о себе, чтобы мы точнее построили ваш персональный план'
        return (
            <HideComponent isHide={this.state.show === false}>
                <div className="app-message">

                    {/* <a onClick={this.handleClose} className="close-btn"><img src="./assets/img/close.svg" /></a> */}
                    <div className="app-message-content">
                        <img src="./assets/img/advice_filled.svg" />
                        <h6>Совет</h6>
                        <p>{advicetext || defaltText}</p>
                    </div>

                </div>
            </HideComponent>
        );
    }
}

export default AdviceMessage;