import React from 'react';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { observer, toJS } from 'mobx-react';
import ReactDOM from 'react-dom';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import { getComp } from '../bs_react_lib/utils/bsDI';
import StepRangeSlider from '../_components/react-step-range-slider'


const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};
@observer
export class TargetSliders extends React.Component {
    constructor(props) {
        super(props);
        this.calcStore = getComp('CalcStore');
        this.onAgeSliderChange = this.onAgeSliderChange.bind(this);
        this.onIncomeSliderChange = this.onIncomeSliderChange.bind(this);
        this.onChangeComplete = this.onChangeComplete.bind(this);
        this.state = {
            age: 0,
            income: 0,
            kapital: 0,
            range: [{ value: 2, step: 2 }, { value: 6 }],
            kapitalRange: [{ value: 2, step: 2 }, { value: 6 }],
            income2: 0,
            update: false,
        };
    }

    componentWillReceiveProps() {
        debugger;
      //  this.calcStore.updateByAge(this.calcStore.selectedAge);
        this.setState({
            age: this.calcStore.selectedAge,
            income: this.calcStore.selectedIncome,
            kapital: this.calcStore.selectedKapital,
            range: this.calcStore.incomeRange,
            kapitalRange: this.calcStore.kapitalRange,
            income2: this.calcStore.selectedIncome,
            update: false,
        });
    }

    onAgeSliderChange(value) {
        this.calcStore.updateByAge(value);

        this.setState({
            age: this.calcStore.selectedAge,
            income: this.calcStore.selectedIncome,
            //   range:this.calcStore.incomeRange,
            income2: this.calcStore.selectedIncome,
            kapital: this.calcStore.selectedKapital,
            //kapitalRange : 
            update: true,
        });
    }

    onIncomeSliderChange(value) {
        this.calcStore.updateByIncome(value);
        this.setState({
            age: this.calcStore.selectedAge,
            income: this.calcStore.selectedIncome,
            income2: this.calcStore.selectedIncome,
            kapital: this.calcStore.selectedKapital,
            //  range:this.calcStore.incomeRange,
            update: true,
        });
    }

    onChangeComplete(value) {
        debugger;
        this.calcStore.updateByIncome(value);
        this.setState({
            age: this.calcStore.selectedAge,
            income: this.calcStore.selectedIncome,
            income2: this.calcStore.selectedIncome,
            kapital: this.calcStore.selectedKapital,
            //range:this.calcStore.incomeRange,
            update: true,
        });
    }


    render() {
        const {minAge,maxAge,selectedAge,} = this.calcStore;

        const {selectedIncome,incomeRange}=this.calcStore;
        const {kapitalRange, selectedKapital} =this.calcStore;

        return (
            <div className="slider-form">
                <div className="panel-form-group">
                    <label>Возраст</label>
                    <input type="text" className="form-control" name="LastName" value={selectedAge} disabled />
                    <Slider min={minAge} max={maxAge} value={selectedAge} step={1} handle={handle} onChange={this.onAgeSliderChange} />
                    {/* <input type="range" min={this.calcStore.minAge} max={100} value={this.state.age} step="1" onChange={this.onAgeSliderChange}/> */}
                </div>
                <div className="panel-form-group">
                    <label>Доход</label>
                    <input type="text" className="form-control" name="LastName" value={selectedIncome} disabled />
                    {/* <Slider min={this.calcStore.minIncome} max={this.calcStore.maxIncome} value={this.state.income} handle={handle} onChange={this.onIncomeSliderChange} />                */}
                    <StepRangeSlider
                        value={selectedIncome}
                        defaultValue={selectedIncome}
                        range={incomeRange}
                        onChange={this.onChangeComplete}
                        update={this.state.update}
                        children={null}
                    />
                </div>
                <div className="panel-form-group">
                    <label>Капитал</label>
                    <input type="text" className="form-control" name="LastName" value={selectedKapital} disabled />
                    {/* <Slider min={this.calcStore.minKapital} max={this.calcStore.maxKapital} value={this.state.kapital} handle={handle} disabled />                */}

                    <StepRangeSlider
                        value={selectedKapital}
                        defaultValue={selectedKapital}
                        range={kapitalRange}
                        //onChange  = {this.onChangeComplete}
                        children={null}
                        update={this.state.update}
                        disabled
                    />
                </div>
            </div>
        );
    }
}