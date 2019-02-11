import React from 'react';
import NumberFormat from 'react-number-format';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


export class DateTimeInput2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answer : props.answer,
            question : props.question,
        }
    }

    render() {
        return
        (
            <DatePicker selected={this.state.answer} onChange={(date) => this.props.handleDateChange(date, this.props.question)} />
        );

    }
}