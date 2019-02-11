import React from 'react';
import { WizardQuestion } from './WizardQuestion';
import { debug } from 'util';
import uuid from 'uuid/v1';
import { observable, action, toJS } from 'mobx';
import { getComp } from '../bs_react_lib/utils/bsDI';
import HideComponent from 'bs_react_lib/components/HideComponent';

export class WizardStepCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: props.groups,
            maxOccurs: props.maxOccurs,
            levelId: props.levelId,
        }
        this.formStore = getComp('QuestionFormStore');
    }

    handleClickRemoval = (groupId) => {
        this.formStore.removeCategoryFromLevel(this.props.levelId, groupId)
    }


    handleClick(event) {
        this.formStore.addCategoryToLevel(this.props.levelId);

        /* const grId = uuid();
        const QAs = event.QuestionsWithAnswers;

        const copy = [];

        for (let i = 0; i < QAs.length; i++) {
            copy.push(
                {
                    DisplayName: QAs[i].DisplayName,
                    UniqueCode: QAs[i].UniqueCode,
                    InputType: QAs[i].InputType,
                    Id: QAs[i].Id,
                })
        }

        this.setState({
            groups: this.state.groups.concat({ GroupId: grId, QuestionsWithAnswers: copy })
        }); */
    }
    render() {
        
        const { groups, maxOccurs } = this.props;
        return (

            <div>
                {groups.map((group, i) => {
                    
                    const length = groups.length;
                    const canAdd = (maxOccurs == null) | ((maxOccurs > 1) & length < maxOccurs);
                    return <div key={'div'+i}>
                        <WizardQuestion key={'q'+group.GroupId+i}
                         questionsWithAnswers={group.QuestionsWithAnswers}
                         groupId={group.GroupId} 
                         level2Id = {this.state.levelId}/>
                         <HideComponent isHide={!canAdd || i!=length-1} ><button key={'btn'+i} onClick={(event) => this.handleClick(group, event)}>Добавить</button></HideComponent>                          
                         <HideComponent isHide={i===0} ><button onClick={()=>{this.handleClickRemoval(group.GroupId)}}>Удалить</button></HideComponent>                          
                    </div>
                })}
            </div>
        );
    }

}