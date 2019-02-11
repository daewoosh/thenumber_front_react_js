import React from 'react';
import { UserInputPage } from '../_components';
import { UserAimsComponent } from './UserAimsComponent';

export class UserAimsPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <UserInputPage>
                <UserAimsComponent />
            </UserInputPage>
        );
    }
}