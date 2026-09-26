import Field from './Field.js'
import { EmailRule, LowercaseRule, MatchingFieldsRule, MaxLengthRule, MinValueRule, MaxValueRule, MinLengthRule, NoCodeOrLinksRule, OnlyDigitsRule, OnlyLettersRule, RequiredRule, SpecialCharacterRule, UppercaseRule } from './Rule.js'
import Validation from './Validation.js'

const password = new Field('password')
password.addRule(new RequiredRule)
password.addRule(new MinLengthRule(8))
password.addRule(new MaxLengthRule(18))
password.addRule(new UppercaseRule)
password.addRule(new LowercaseRule)
password.addRule(new SpecialCharacterRule)
password.addRule(new NoCodeOrLinksRule)

const passwordValidation = new Validation()
passwordValidation.addField(password)

const confirm = new Field('confirm')
confirm.addRule(new MatchingFieldsRule('password'))
passwordValidation.addField(confirm)

const name = new Field('name')
name.addRule(new OnlyLettersRule)

const nameValidation = new Validation()
nameValidation.addField(name)

const age = new Field('age')
age.addRule(new OnlyDigitsRule)
age.addRule(new MinValueRule(0))
age.addRule(new MaxValueRule(100))

const ageValidation = new Validation()
ageValidation.addField(age)

const email = new Field('email')
email.addRule(new EmailRule)

const emailValidation = new Validation()
emailValidation.addField(email)

// REQUIRED RULE
console.log('\nTest required rule:')
console.log('Success: true:')
console.log(passwordValidation.validate({ 'password': 'Sofia@1990', 'confirm': 'Sofia@1990' }))

console.log('\nTest required rule:')
console.log('Success: false:')
console.log(passwordValidation.validate({ 'password': '', 'confirm': '' }))

// MIN LENGTH RULE
console.log('\nTest min length rule:')
console.log('Success: true:')
console.log(passwordValidation.validate({ 'password': 'Sofia@1990', 'confirm': 'Sofia@1990' }))

console.log('\nTest min length rule:')
console.log('Success: false:')
console.log(passwordValidation.validate({ 'password': 'Sofia@', 'confirm': 'Sofia@' }))

// MAX LENGTH RULE
console.log('\nTest max length rule:')
console.log('Success: true:')
console.log(passwordValidation.validate({ 'password': 'Sofia@1990', 'confirm': 'Sofia@1990' }))

console.log('\nTest max length rule:')
console.log('Success: false:')
console.log(passwordValidation.validate({ 'password': 'Sofia@1990Sofia@1990Sofia@1990', 'confirm': 'Sofia@1990Sofia@1990Sofia@1990' }))

// UPPERCASE RULE
console.log('\nTest uppercase rule:')
console.log('Success: true:')
console.log(passwordValidation.validate({ 'password': 'Sofia@1990', 'confirm': 'Sofia@1990' }))

console.log('\nTest uppercase rule:')
console.log('Success: false:')
console.log(passwordValidation.validate({ 'password': 'sofia@1990', 'confirm': 'sofia@1990' }))

// LOWER RULE
console.log('\nTest lowercase rule:')
console.log('Success: true:')
console.log(passwordValidation.validate({ 'password': 'Sofia@1990', 'confirm': 'Sofia@1990' }))

console.log('\nTest lowercase rule:')
console.log('Success: false:')
console.log(passwordValidation.validate({ 'password': 'SOFIA@1990', 'confirm': 'SOFIA@1990' }))

// SPECIAL CASE RULE
console.log('\nTest special character rule:')
console.log('Success: true:')
console.log(passwordValidation.validate({ 'password': 'Sofia@1990', 'confirm': 'Sofia@1990' }))

console.log('\nTest special character rule:')
console.log('Success: false:')
console.log(passwordValidation.validate({ 'password': 'Sofia1990', 'confirm': 'Sofia1990' }))

// NO CODE OR LINKS
console.log('\nTest no code or links rule:')
console.log('Success: true:')
console.log(passwordValidation.validate({ 'password': 'Sofia@1990', 'confirm': 'Sofia@1990' }))

console.log('\nTest no code or links rule:')
console.log('Success: false:')
console.log(passwordValidation.validate({ 'password': '<b>Sofia@1990', 'confirm': '<b>Sofia@1990' }))

// MATCHING FIELDS RULE
console.log('\nTest matching fields rule:')
console.log('Success: true:')
console.log(passwordValidation.validate({ 'password': 'Sofia@1990', 'confirm': 'Sofia@1990' }))

console.log('\nTest matching fields rule:')
console.log('Success: false:')
console.log(passwordValidation.validate({ 'password': 'Sofia@1990', 'confirm': 'Sofia@@1990' }))


// ONLY LETTERS RULE
console.log('\nTest only letters rule:')
console.log('Success: true:')
console.log(nameValidation.validate({ 'name': 'Sofia' }))

console.log('\nTest only letters rule:')
console.log('Success: false:')
console.log(nameValidation.validate({ 'name': 'Sofia.1990.com' }))

// ONLY DIGITS RULE
console.log('\nTest only digits rule:')
console.log('Success: true:')
console.log(ageValidation.validate({ 'age': '19' }))

console.log('\nTest only digits rule:')
console.log('Success: false:')
console.log(ageValidation.validate({ 'age': 'Sofia' }))

// Min value RULE
console.log('\nTest min value rule:')
console.log('Success: true:')
console.log(ageValidation.validate({ 'age': '19' }))

console.log('\nTest min value rule:')
console.log('Success: false:')
console.log(ageValidation.validate({ 'age': '-19' }))

// Max value RULE
console.log('\nTest max value rule:')
console.log('Success: true:')
console.log(ageValidation.validate({ 'age': '19' }))

console.log('\nTest max value rule:')
console.log('Success: false:')
console.log(ageValidation.validate({ 'age': '190' }))

// EMAIL FORMAT RULE
console.log('\nTest email format rule:')
console.log('Success: true:')
console.log(emailValidation.validate({ 'email': 'Sofia@1990.com' }))

console.log('\nTest email format rule:')
console.log('Success: false:')
console.log(emailValidation.validate({ 'email': 'Sofia.1990.com' }))
