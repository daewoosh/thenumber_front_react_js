import React from 'react';



class UserTargetStepsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="user-plans-container">
                <h5>Шаги к цели</h5>
                <div className="steps-list">
                    <div className="step-item _current">
                        <span className="step-item-number">1</span>
                        <div>
                            <h6 className="step-item-title">Открыть пополняемый вклад на максимально выгодных условиях</h6>
                            <div className="step-item-descr">
                                <p>Посмотреть предложения на текущий момент</p>
                                <div className="btns-group">
                                    <button>Подобрать вклад</button>
                                    <button>Я открыл вклад</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="step-item">
                        <span className="step-item-number">2</span>
                        <div>
                            <h6 className="step-item-title">Сообщить параметры открытого вклада</h6>
                        </div>
                    </div>
                    <div className="step-item">
                        <span className="step-item-number">3</span>
                        <div>
                            <h6 className="step-item-title">Откладывать ежемесячно на вклад все свободные средства</h6>
                        </div>
                    </div>
                    <div className="step-item">
                        <span className="step-item-number">4</span>
                        <div>
                            <h6 className="step-item-title">Накопить 300 000 руб. к маю 2019г.</h6>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default UserTargetStepsComponent;