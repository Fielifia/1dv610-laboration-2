import Field from './Field.js'
import Rule from './Rule.js'

const email = new Field('email', 'required')

email.addRule(new Rule('required', 'Email is required'))

email.addRule(new Rule('email', 'Email must be a valid email address'))

console.log('Adding rules to the email field')

console.log(email)

/**
 * This test will throw an error because we are trying to add a rule of the same type to the same field.
 */

const emailWithDuplicateRules = new Field('email', 'required')

emailWithDuplicateRules.addRule(new Rule('required', 'Email is required'))

emailWithDuplicateRules.addRule(new Rule('required', 'Email is required'))

console.log('Duplicate rule test: Adding a rule of the same type to the same field should throw an error')

console.log(emailWithDuplicateRules)
