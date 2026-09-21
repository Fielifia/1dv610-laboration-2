import Field from './Field.js'
import Rule from './Rule.js'

/**
 * This test will throw an error because we are trying to add a rule of the same type to the same field.
 */

const email = new Field('email', 'required')

email.addRule(new Rule('required', 'Email is required'))

email.addRule(new Rule('required', 'Email is required'))

console.log(email)
