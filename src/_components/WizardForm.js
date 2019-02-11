import React from 'react';
import { WizardStepCategory } from './WizardStepCategory';
import { observer } from 'mobx-react';
import { getComp } from '../bs_react_lib/utils/bsDI';
import { observable, action, toJS } from 'mobx';

const RenderStepCategory = ({

})

@observer
export class WizardForm extends React.Component {
    constructor(props) {
        super(props);
        this.formStore = getComp('QuestionFormStore');
        this.state = {
            form: props.form,
            lvl2s: props.lvl2s,
        }
    }


    render() {
        const { form } = this.props;
        const { lvl2s } = this.formStore;
        
        return (
            <div>
                <h2>{form.DisplayName}</h2>
                {lvl2s.map((level2, i) => {
                    
                    return <div key={'div'+i}>
                        <h3 key={'h'+i}>{level2.DisplayName}</h3>
                        <p key={'h2'+i}>{level2.Description}</p>
                        <WizardStepCategory key={'w'+level2+'_'+i} groups={level2.Level2Groups} maxOccurs={level2.MaxOccurs} levelId={level2.Id} />
                    </div>
                })}
            </div>
        );
    }
}