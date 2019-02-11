import React from 'react';
import AdviceMessage from './Messages/AdviceMessage';
import StatusMessage from './Messages/StatusMessage';
//import './BudgetPage.less';
// import '../default.less'
//import { BudgetComponent } from './BudgetComponent';

export class UserInputPage extends React.Component {
    constructor(props) {
        super(props);
    }

    goBack = () => {
        document.location.hash = '/home';
    }

    render() {
        const Inner = this.props.innerComponent;
        return (
            <div className="main-flex-container">
                <div className="navigation-panel">
                    <div className="navigation-control" onClick={this.goBack}>
                        <img src="assets/img/back.svg" />
                        <span className="navigation-label _back">Назад</span>
                    </div>
                </div>
                <div className="main-panel">
                    {this.props.children}
                    <div className="additional-panel">
                        {/* сообщения */}
                        <AdviceMessage/>
                        {/* <StatusMessage/>  TODO как будет понятно как расчитывать текст - вернуть*/}
                    </div>
                </div>
            </div>
        );
    }
}