import React from 'react';
import NumberFormat from 'react-number-format';

class RadioElems extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { collection, onElemClick } = this.props;
        return (
            <React.Fragment>
                {
                    collection.map((el, i) => {
                        const isElemSelected = el.isElemSelected;
                        return (
                            <div
                                className={isElemSelected ? 'radio-block _active' : 'radio-block'}
                                onClick={() => onElemClick(el)}
                            >
                                <div className="radio-control">
                                    {
                                        isElemSelected
                                            ? <img src="./assets/img/radio-on.svg" />
                                            : <img src="./assets/img/radio-off.svg" />
                                    }
                                    <div>
                                        <h5>{el.title}</h5>
                                        <p>{el.text}</p>
                                        <span>
                                            <NumberFormat
                                                value={Math.round(el.amount)}
                                                thousandSeparator=' '
                                                displayType={'text'}
                                                suffix=' &#8381;'
                                            />   /мес</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </React.Fragment>
        );
    }
}
export default RadioElems;

{/* <div 
                                className={isElemSelected ? 'radio-block _active' : 'radio-block'}
                                onClick={onElemClick}
                            >
                                <div className="radio-control">
                                    {
                                        isElemSelected 
                                        ? <img src="./assets/img/radio-on.svg"/>
                                        : <img src="./assets/img/radio-off.svg"/>
                                    }
                                    <div>
                                        <h5>{el.title}</h5>
                                        <p>{el.text}</p>
                                        <span>{el.amount} &#8381;/мес</span>
                                    </div>
                                </div>
                            </div> */}