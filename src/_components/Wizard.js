
import React from 'react';
import { SuccessToast, ErrorToast, ErrorToastNoClose } from '../_components/Notification';
import { observer } from 'mobx-react';
import { getComp } from '../bs_react_lib/utils/bsDI';
import { WizardSteps } from './WizardSteps';
import { WizardForm } from './WizardForm';
// import { saveStep } from '../_services/WebApi';
import { observable, action, toJS } from 'mobx';
// import "bootstrap/dist/css/bootstrap.css";
import { ajaxReq } from '_services/WebApi';

export const saveStep = (params) => {
  const res = ajaxReq('SaveStep', 'POST', params, true);
  debugger;
  return res;
};

@observer
export class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.formStore = getComp('QuestionFormStore');
    this.incrementCurrentIndex = this.incrementCurrentIndex.bind(this);
    this.decrementCurrentIndex = this.decrementCurrentIndex.bind(this);
    this.handleGoFirst = this.handleGoFirst.bind(this);
    this.handleGoLast = this.handleGoLast.bind(this);
    this.handleGoToStep = this.handleGoToStep.bind(this);
    this.saveCurrentStep = this.saveCurrentStepAndMove.bind(this);
  }

  componentWillMount() {
    const params = { currentIndex: this.formStore.currentIndex };
    this.formStore.load(params);
  }

  handleGoFirst(e) {
    e.preventDefault();
    this.saveCurrentStepAndMove(1);
  }

  handleGoLast(e) {
    e.preventDefault();
    const total = this.formStore.total;
    this.saveCurrentStepAndMove(total);
  }

  incrementCurrentIndex(e) {
    e.preventDefault();
    const currentIndex = this.formStore.currentIndex;
    const newIndex = currentIndex + 1;
    if (newIndex > this.formStore.total)
      return false;
    this.saveCurrentStepAndMove(newIndex);

  }


  decrementCurrentIndex(e) {
    e.preventDefault();

    const currentIndex = this.formStore.currentIndex;
    const newIndex = currentIndex - 1;
    if (newIndex < 1)
      return false;
    this.saveCurrentStepAndMove(newIndex);
  }

  handleGoToStep(e) {
    //e.preventDefault();
    debugger;
    this.saveCurrentStepAndMove(e);
  }

  saveCurrentStepAndMove(index) {

    const { total, currentIndex, form, isLoaded, lvl2s } = this.formStore;
    var clone2 = toJS(lvl2s);
    debugger;
    const params = {
      Level2s: clone2,

    };
    return saveStep(params).then(data => {
      this.formStore.setCurrentIndex(index);
    }).catch((errMsg) => {
      debugger;
      ErrorToastNoClose(errMsg);
    });

  }



  render() {
    const { total, currentIndex, form, isLoaded, lvl2s } = this.formStore;
    const canGoNext = currentIndex < total;
    const canGoBack = currentIndex > 1;
    debugger;
    if (!isLoaded)
      return (<WizardSteps stepsCount={total} handleGoToStep={this.handleGoToStep} />);
    return (
      <div>
        <WizardSteps stepsCount={total} handleGoToStep={this.handleGoToStep} />
        <WizardForm form={form} lvl2s={lvl2s} />
        {canGoBack && <div className="pull-left">
          <button onClick={this.handleGoFirst}>В начало</button>
          <button onClick={this.decrementCurrentIndex}>Назад</button>
        </div>
        }
        <button onClick={()=>this.saveCurrentStepAndMove(currentIndex)}>Сохранить</button>
        {canGoNext && <div className="pull-right">
          <button onClick={this.incrementCurrentIndex} >Вперед</button>
          <button onClick={this.handleGoLast}>В конец</button>
        </div>
        }
      </div >

    );
  }
}