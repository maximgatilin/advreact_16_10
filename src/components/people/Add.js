import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/ErrorField'

class PeopleAdd extends Component {
    render() {
        return (
            <div>
                <h3>Add people</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <Field name='firstName' component={ErrorField} type='text' label='First Name'/>
                    <Field name='lastName' component={ErrorField} type='text' label='Last Name'/>
                    <Field name='email' component={ErrorField} type='text' label='Email'/>
                    <div>
                        <input type='submit' disabled={this.props.invalid}/>
                    </div>
                </form>
            </div>
        )
    }
}

const validate = ({firstName, lastName, email}) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    if (!firstName) errors.firstName = 'First name is a required field'
    if (!lastName) errors.lastName = 'Last name is a required field'

    if (email && !emailValidator.validate(email)) errors.email = 'invalid email'

    return errors
}

export default reduxForm({
    form: 'peopleAdd',
    validate
})(PeopleAdd)