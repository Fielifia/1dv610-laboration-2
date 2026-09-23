import Field from './Field.js'
import { RequiredRule, EmailRule } from './Rule.js'
import Validation from './Validation.js'

// Test required
console.log('Test required: ')

const email = new Field('email')

email.addRule(new RequiredRule('Email is required'))

const emailValidation = new Validation()

emailValidation.addField(email)

console.log(emailValidation.validate({email: 'mejl'}))


// Test email format

console.log('Test email format: ')

const emailFormat = new Field('emailFormat')

emailFormat.addRule(new EmailRule('Must be in email format'))

const emailFormatValidation = new Validation()

emailFormatValidation.addField(emailFormat)

console.log(emailFormatValidation.validate({ emailFormat: 'sofia@hotmail.com' }))
