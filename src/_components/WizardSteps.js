import React from 'react';

export class WizardSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stepsCount: props.stepsCount,
        };
    }

    render() {
        let buttons = [];
        for (let i = 1; i <= this.state.stepsCount; i++) {
            buttons.push(<button key={i} onClick={()=>this.props.handleGoToStep(i)}>{i}</button>);
        }
        return (<div>{buttons}</div>);
    }
}