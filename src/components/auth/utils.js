import emailValidator from "email-validator/index";

export const validate = ({ email, password }) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    if (!password) errors.password = 'password is a required field'

    if (email && !emailValidator.validate(email)) errors.email = 'invalid email'
    if (password && password.length < 8) errors.password = 'to short'

    return errors
}