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
        this.onLiveAgeSliderChange = this.onLiveAgeSliderChange.bind(this);
        this.state = {
            age: 0,
            income: 0,
            capital: 0,
            range: [{ value: 2, step: 2 }, { value: 6 }],
            capitalRange: [{ value: 2, step: 2 }, { value: 6 }],
            income2: 0,
            update: false,
        };
    }

    componentWillReceiveProps() {
        //  this.calcStore.updateByAge(this.calcStore.selectedAge);
        this.setState({
            age: this.calcStore.selectedAge,
            income: this.calcStore.selectedIncome,
            capital: this.calcStore.selectedCapital,
            range: this.calcStore.incomeRange,
            capitalRange: this.calcStore.capitalRange,
            income2: this.calcStore.selectedIncome,
            update: false,
        });
    }

    onAgeSliderChange(value) {
        const { selectedLiveAge } = this.calcStore;
        if (value >= selectedLiveAge)
            return false;
        this.calcStore.updateByAge(value);
    }

    onLiveAgeSliderChange(value) {
        const { selectedAge } = this.calcStore;
        if (value <= selectedAge)
            return false;
        this.calcStore.updateLiveByAge(value);
    }

    onIncomeSliderChange(value) {
        this.calcStore.updateByIncome(value);
        this.setState({
            age: this.calcStore.selectedAge,
            income: this.calcStore.selectedIncome,
            income2: this.calcStore.selectedIncome,
            capital: this.calcStore.selectedCapital,
            update: true,
        });
    }

    onChangeComplete(value) {
        this.calcStore.updateByIncome(value);
        this.setState({
            age: this.calcStore.selectedAge,
            income: this.calcStore.selectedIncome,
            income2: this.calcStore.selectedIncome,
            capital: this.calcStore.selectedCapital,
            //range:this.calcStore.incomeRange,
            update: true,
        });
    }


    render() {
        const { minAge, maxAge, selectedAge, selectedLiveAge } = this.calcStore;

        const { selectedIncome, incomeRange } = this.calcStore;
        const { capitalRange, selecteCapital } = this.calcStore;

        return (
            <div className="slider-form">
                {/* <div className="panel-form-group">
                    <label>Возраст</label>
                    <input type="text" className="form-control" name="LastName" value={selectedAge} disabled />
                    <Slider min={minAge} max={maxAge} value={selectedAge} step={1} handle={handle} onChange={this.onAgeSliderChange} />
                </div>
                <div className="panel-form-group">
                    <label>Доход</label>
                    <input type="text" className="form-control" name="LastName" value={selectedIncome} disabled />
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
                    <StepRangeSlider
                        value={selectedKapital}
                        defaultValue={selectedKapital}
                        range={kapitalRange}
                        //onChange  = {this.onChangeComplete}
                        children={null}
                        update={this.state.update}
                        disabled
                    />
                </div> */}
                <div className="panel-form-group">
                    <label>Выйти на пенсию</label>
                    <input type="text" className="form-control" name="LastName" value={selectedAge} disabled />
                    <Slider
                        min={minAge}
                        max={maxAge}
                        value={selectedAge}
                        step={1}
                        handle={handle}
                        onChange={this.onAgeSliderChange}
                    />
                </div>
                <div className="panel-form-group">
                    <label>Тратить до</label>
                    <input type="text" className="form-control" name="LastName" value={selectedLiveAge} disabled />
                    <Slider
                        min={minAge}
                        max={maxAge}
                        value={selectedLiveAge}
                        step={1}
                        handle={handle}
                        onChange={this.onLiveAgeSliderChange}
                    />
                </div>
            </div>
        );
    }
}