import Field from './Field.js'
import { RequiredRule, EmailRule, MinLengthRule, OnlyLettersRule, OnlyDigitsRule, MatchingFieldsRule } from './Rule.js'
import Validation from './Validation.js'

// Test required
console.log('Test required rule: ')

const email = new Field('email')

email.addRule(new RequiredRule)

const emailValidation = new Validation()

emailValidation.addField(email)

console.log(emailValidation.validate({email: '     '}))


// Test email format
console.log('Test email format rule: ')

email.addRule(new EmailRule)

console.log(emailValidation.validate({ email: 'sofia@hotmail.com' }))


// Test min length format

console.log('Test min length rule: ')

const name = new Field('name')

name.addRule(new MinLengthRule(2,))

const minLengthValidation = new Validation()

minLengthValidation.addField(name)

console.log(minLengthValidation.validate({ name: 'Bo' }))

// Test only letters rule:
console.log('Test only letters rule: ')

name.addRule(new OnlyLettersRule)

console.log(minLengthValidation.validate({ name: 'Bo1' }))



// Test only digits rule
console.log('Test only digits rule: ')

const age = new Field('age')

age.addRule(new OnlyDigitsRule)

const onlyDigitsValidation = new Validation()

onlyDigitsValidation.addField(age)

console.log(onlyDigitsValidation.validate({ age: '8' }))


// Test matching rule (password)
console.log('Test match fields rule: ')

const password = new Field('password')
const confirm = new Field('confirm')

confirm.addRule(new MatchingFieldsRule('password'))

const matchingFieldsValidation = new Validation()

matchingFieldsValidation.addField(password)
matchingFieldsValidation.addField(confirm)

console.log(matchingFieldsValidation.validate({
  password: 'password',
  confirm: 'password'
}))
