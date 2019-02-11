import React from 'react';
import './FormInput.less';

import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';

import ru from 'date-fns/locale/ru';
import DeviceDataUsage from 'material-ui/SvgIcon';
//registerLocale('ru', ru);


const genderOptions = [
    { value: 1, label: "Мужской" },
    { value: 2, label: "Женский" }
]

const countryOptions = [
    { value: 1, label: "Россия" },
]

const regionOptions = [
    { value: 77, label: "Москва" },
    { value: 78, label: "Санкт-Петербург" },
]
const maritalStatusOptions = [
    { value: 1, label: "Холост/Не замужем" },
    { value: 2, label: "В браке" },
]

const getGenderInputTemplate = ({ props }) => {
    const selected = genderOptions.filter(item => item.value == props.value)[0];
    return (
        <SelectList
            className="form-select"
            value={props.value}
            isClearable={false}
            onChange={props.onChange}
            options={genderOptions}
        />
    );
}

const getMaritalStatusInputTemplate = ({ props }) => {
    const selected = maritalStatusOptions.filter(item => item.value == props.value)[0];
    return (
        <SelectList
            className="form-select"
            value={props.value}
            isClearable={false}
            onChange={props.onChange}
            options={maritalStatusOptions}
        />
    );
}

const getCountryInputTemplate = ({ props }) => {
    const selected = countryOptions.filter(item => item.value == props.value)[0];
    return (
        <SelectList
            className="form-select"
            value={props.value}
            isClearable={false}
            onChange={props.onChange}
            options={countryOptions}
        />
    );
}

const getRegionInputTemplate = ({ props }) => {
    const selected = regionOptions.filter(item => item.value == props.value)[0];
    return (
        <SelectList
            className="form-select"
            value={props.value}
            isClearable={false}
            onChange={props.onChange}
            options={regionOptions}
        />
    );
}

const getDateInputTemplate = ({ props }) => {
    let sDate = null;
    if (props.value == null || props.value == '')
        sDate = null;
    else
        sDate = moment(props.value);
    return (<DateTimeInput dateValue={sDate}  {...props} />);
}

const getInputRangeTemplate = ({ props }) => {
    const { min, max } = props;
    let options = [];
    for (var i = min; i <= max; i++) {
        options.push({ value: i, label: i });
    }
    const selected = options.filter(item => item.value == props.value)[0];
    return (
        <SelectList
            className="form-select"
            value={props.value}
            isClearable={false}
            onChange={props.onChange}
            options={options}
        />
    );
}

const getPercentInputTemplate = ({ props }) => {
    props.maxLength = 3;
    const addit = { maxLength: 3 }
    return (
        <NumberFormat
            allowNegative={false}
            onValueChange={props.onChange}
            value={props.value}
            className="form-control"
            {...addit}
            suffix='%'
        />
    );
}

const getMoneyInputTemplate = ({ props }) => {
    return (
        <NumberFormat
            allowNegative={false}
            value={props.value}
            onValueChange={props.onChange}
            thousandSeparator=' '
            className="form-control"
        />
    );
}

const currencyOptions = [
    { value: '810', label: 'Рубль' }
]
const getCurrencyInputTemplate = ({ props }) => {
    return (
        <SelectList
            className="form-select"
            value={props.value}
            isClearable={false}
            onChange={props.onChange}
            options={currencyOptions}
        />
    );
}


const monthsOptions = [
    { value: '1', label: 'Январь' },
    { value: '2', label: 'Февраль' },
    { value: '3', label: 'Март' },
    { value: '4', label: 'Апрель' },
    { value: '5', label: 'Май' },
    { value: '6', label: 'Июнь' },
    { value: '7', label: 'Июль' },
    { value: '8', label: 'Август' },
    { value: '9', label: 'Сентябрь' },
    { value: '10', label: 'Октябрь' },
    { value: '11', label: 'Ноябрь' },
    { value: '12', label: 'Декабрь' }

]

const getMonthsInputTemplate = ({ props }) => {
    return (
        <SelectList
            className="form-select"
            value={props.value}
            isClearable={false}
            onChange={props.onChange}
            options={monthsOptions}
        />
    );
}

const getControlTemplate = ({ type, ...props }) => {
    let field = null
    if (type == "simpleText")
        return (<input type="text" className="form-control" value={props.value} onChange={props.onChange} />);
    if (type == "gender")
        field = getGenderInputTemplate({ props });
    if (type == "date")
        field = getDateInputTemplate({ props });
    if (type == "country")
        field = getCountryInputTemplate({ props });
    if (type == "region")
        field = getRegionInputTemplate({ props });
    if (type == "marital")
        field = getMaritalStatusInputTemplate({ props });
    if (type == "inputRangeSelect")
        field = getInputRangeTemplate({ props });
    if (type == 'select')
        return <SelectList {...props} />
    if (type == 'money')
        field = getMoneyInputTemplate({ props });
    if (type == 'percent')
        field = getPercentInputTemplate({ props });
    if (type == 'currency')
        field = getCurrencyInputTemplate({ props });
    if (type == 'months')
        field = getMonthsInputTemplate({ props });
    return field;
};

class DateTimeInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        // const value = moment(date).toISOString();      

        this.props.onChange(date);
    }
    render() {
        const { dateValue } = this.props;
        return (

            <div className="datepicker-wrapper">
                <DatePicker
                    locale="ru"
                    className="form-control"
                    selected={dateValue}
                    onChange={this.handleChange}
                    dateFormat="DD.MM.YYYY"
                />
                <img src="./assets/img/calendar.svg" />
            </div>


        );
    }
}


class SelectList extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectedValue) {

        this.props.onChange(selectedValue);
    }


    render() {
        const value2 = this.props.value;
        var selected = this.props.options.filter(item => item.value == value2)[0];
        if (!selected)
            selected = null;
        debugger;
        return (
            <Select
                className="form-select"
                classNamePrefix="form-select"
                value={selected}
                isClearable={this.props.isClearable}
                onChange={this.handleChange}
                options={this.props.options}
                placeholder="Выберите"
            />
        );
    }
}

export default class FormInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let control = getControlTemplate(this.props);
        return (
            <div className={'flex-control-group panel-form-group ' + this.props.classNames} style={this.props.custStyle}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                {control}
            </div>
        );
    }

}