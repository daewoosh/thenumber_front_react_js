import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { getComp } from '../bs_react_lib/utils/bsDI';
import Select from 'react-select';

const monthOptions = [
    { value: 1, label: 'Январь' },
    { value: 2, label: 'Февраль' },
    { value: 3, label: 'Март' },
    { value: 4, label: 'Апрель' },
    { value: 5, label: 'Май' },
    { value: 6, label: 'Июнь' },
    { value: 7, label: 'Июль' },
    { value: 8, label: 'Август' },
    { value: 9, label: 'Сентябрь' },
    { value: 10, label: 'Октябрь' },
    { value: 11, label: 'Ноябрь' },
    { value: 12, label: 'Декабрь' },
];

const getMonthSelectTemplate = ({ props }) => {
    const answer = monthOptions.filter(item => item.value == props.question.Answer)[0];
    return <SelectList options={monthOptions} answer={answer} question={props.question} level2Id={props.level2Id} groupId={props.groupId} />
};

const getDecimalInputTemplate = ({ props }) => {
    return <FormattedInput answer={props.question.Answer} separator={' '} question={props.question} level2Id={props.level2Id} groupId={props.groupId} decimalScale={2} />
};

const getYearInput = ({ props }) => {
    return <FormattedInput answer={props.question.Answer} question={props.question}
        level2Id={props.level2Id}
        groupId={props.groupId}
        maxLength="4" 
        placeholder="YYYY" />
};

const getDatePickerTemplate = ({ props }) => {
    let sDate = null;
    if (props.question.Answer == null)
        sDate = null;
    else
        sDate = moment(props.question.Answer);
    return <DateTimeInput2 answer={sDate} question={props.question} level2Id={props.level2Id} groupId={props.groupId} />
};


const FormInputField = ({ type, ...props }) => {
    let Field = null;
    switch (type) {
        case 4:
        case 3:
            Field = getDecimalInputTemplate({ props });
            break;
        case 8:
            Field = getMonthSelectTemplate({ props });
            break;
        case 9:
            Field = getYearInput({ props });
            break;
        case 10:
            Field = getDatePickerTemplate({ props });
            break;
        default:
    }
    return Field;
};


export class FormattedInput extends React.Component {
    constructor(props) {
        super(props);
        this.formStore = getComp('QuestionFormStore');
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        const { level2Id, groupId, question } = this.props;
        //question.Answer = value.floatValue;
        this.formStore.addAnswerToQuestion(level2Id, groupId, question.UniqueCode, value.floatValue);
    }

    render() {
        return (
            <NumberFormat allowNegative={false} value={this.props.answer} onValueChange={this.handleChange} {...this.props} thousandSeparator={this.props.separator || false} />
        );
    }
}

export class DateTimeInput2 extends React.Component {
    constructor(props) {
        super(props);
        this.formStore = getComp('QuestionFormStore');
        this.state = {
            answer: props.answer,
            question: props.question,
            level2Id: props.level2Id,
            groupId: props.groupId,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        const { level2Id, groupId, question } = this.props;
        const value = moment(date).toISOString();
        this.formStore.addAnswerToQuestion(level2Id, groupId, question.UniqueCode, value);
        this.setState({
            answer: date
        });
    }
    render() {
        return (
            <DatePicker selected={this.state.answer} onChange={this.handleChange} />
        );
    }
}



export class SelectList extends React.Component {
    constructor(props) {
        super(props);
        this.formStore = getComp('QuestionFormStore');
        this.state={
            answer:props.answer,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(chosenValue) {
        const { level2Id, groupId, question,options } = this.props;
        // const value = moment(date).toISOString();
        const value = chosenValue === null ? null : chosenValue.value
        this.formStore.addAnswerToQuestion(level2Id, groupId, question.UniqueCode, value);
        this.setState({
            answer:chosenValue
        });

    }

    render() {
        return (
            <Select
                value={this.state.answer}
                isClearable
                onChange={this.handleChange}
                options={this.props.options}
            />
        );
    }
}

export default FormInputField;