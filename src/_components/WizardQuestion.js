import React from 'react';
import { getComp } from '../bs_react_lib/utils/bsDI';
import FormInputField from './FormInput';


export class WizardQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.formStore = getComp('QuestionFormStore');
        this.state = {            
            groupId: props.groupId,
            level2Id: props.level2Id,
        }
       
    }

    render() {
        
        const divStyle = {
            color: 'grey',
            borderStyle: 'solid',
            borderWidth: '2px',
        };
        const { maxOccurs, groupId } = this.props;
        const { questionsWithAnswers } = this.props;
        
        return (

            <div style={divStyle}>
                {questionsWithAnswers.map((question, i) => {
                    const { level2Id, groupId } = this.props;
                    let inputEl;                   
                    inputEl = <FormInputField type={question.InputType} question={question} level2Id={level2Id} groupId={groupId} />

                    return <div key={i}>
                        {question.DisplayName}
                        <br />
                      
                        {inputEl}
                    </div>
                })}
            </div>
        );
    }

}