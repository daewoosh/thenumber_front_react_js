import React from 'react';
import { BudgetComponent } from './BudgetComponent';
import {UserInputPage} from '../_components';

export class BudgetPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <UserInputPage>
                <BudgetComponent />
            </UserInputPage>
        );
    }
}