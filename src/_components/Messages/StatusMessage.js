import React from 'react';

class StatusMessage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {statusText, handleShareStatus, closeMessage}=this.props;
        const defaltText = 'Женись на мне! У вас всё хорошо, многие хотят быть, как вы!'
        return (
            <div className="app-message">
                <a onClick={closeMessage} className="close-btn"><img src="./assets/img/close.svg"/></a>
                <div className="app-message-content">
                    <img src="./assets/img/star_filled.svg"/>
                    <h6>Благосостояние</h6>
                    <p>{statusText || defaltText}</p>
                </div>
                <div className="app-message-share">
                    <p>Поделиться</p>
                    <div className="share-socials">
                        <a onClick={handleShareStatus}><img src="./assets/img/fb_colored.svg"/></a>
                        <a onClick={handleShareStatus}><img src="./assets/img/tw_colored.svg"/></a>
                        <a onClick={handleShareStatus}><img src="./assets/img/vk_colored.svg"/></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatusMessage;