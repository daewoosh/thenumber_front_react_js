import React from 'react';
import { userService } from '../_services';

export class EmailConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state={token :this.props.match.params.token};
    };


componentDidMount()
{
    const {token} = this.state;
    debugger;
    userService.emailConfirm(token);
}

    render()     {
return (
<div>
    Confirming. Please Wait
</div>);
    }
}