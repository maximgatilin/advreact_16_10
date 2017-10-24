import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import {validate} from './utils';
import ErrorField from "../common/ErrorField";

class SignIn extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h3>Sign In</h3>
                <form onSubmit = {this.props.handleSubmit}>
                    <Field name = 'email' component = {ErrorField} type = 'text' label = 'email'/>
                    <Field name = 'password' component = {ErrorField} type = 'password' label = 'password'/>
                    <div>
                        <input type = 'submit' disabled={this.props.invalid}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'auth',
    validate
})(SignIn)