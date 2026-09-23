import Field from './Field.js'
import { RequiredRule, EmailRule, MinLengthRule, OnlyLettersRule, OnlyDigitsRule } from './Rule.js'
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


// Test min length format

console.log('Test min length: ')

const name = new Field('name')

name.addRule(new MinLengthRule(2, 'Must be at least 2 characters'))

name.addRule(new OnlyLettersRule('Only letters accepted'))

const minLengthValidation = new Validation()

minLengthValidation.addField(name)

console.log(minLengthValidation.validate({ name: 'Bo!' }))


console.log('Test only digits rule: ')

const age = new Field('age')

age.addRule(new OnlyDigitsRule('Must be digits'))

const onlyDigitsValidation = new Validation()

onlyDigitsValidation.addField(age)

console.log(onlyDigitsValidation.validate({ age: '8' }))
