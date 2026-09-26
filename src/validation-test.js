import Field from './Field.js'
import { RequiredRule, UppercaseRule, LowercaseRule, MinLengthRule, MaxLengthRule, NoCodeOrLinksRule, SpecialCharacterRule, MatchingFieldsRule } from './Rule.js'
import Validation from './Validation.js'

// Test required
console.log('Test password rules (required, minlength, uppercase, matching): ')

const password = new Field('password')
const confirm = new Field('confirm')


password.addRule(new RequiredRule)
password.addRule(new MinLengthRule(8))
password.addRule(new MaxLengthRule(18))
password.addRule(new UppercaseRule)
password.addRule(new LowercaseRule)
password.addRule(new SpecialCharacterRule)
password.addRule(new NoCodeOrLinksRule)
confirm.addRule(new MatchingFieldsRule('password'))


const passwordValidation = new Validation()

passwordValidation.addField(password)
passwordValidation.addField(confirm)

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
