import Field from './Field.js'
import Rule from './Rule.js'
import Result from './Result.js'
import ValidationError from './ValidationError.js'

const email = new Field('email')

const requiredRule = new Rule('required', 'Email is required')

email.addRule(requiredRule)

const result = new Result(false)

const validationError = new ValidationError(email, requiredRule)

result.addError(validationError)

console.log(result)
