import React from 'react';
import { FinanceComponent } from './FinanceComponent';
import {UserInputPage} from '../_components';

export class FinancePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <UserInputPage>
                <FinanceComponent name="Финансы" />
            </UserInputPage>
        );
    }
}