import Result from './Result.js'
import ValidationError from './ValidationError.js'

class Validation {

  constructor() {
    this.fields = []
  }

  addField(field) {
    if (this.fields.some(f => f.identifier === field.identifier)) {
      throw new Error(`Field with identifier ${field.identifier} already exists`)
    }

    this.fields.push(field)
  }

  removeField(identifier) {
    const index = this.fields.findIndex(f => f.identifier === identifier)
    if (index !== -1) {
      this.fields.splice(index, 1)
    }
  }

  validate(data) {
    const result = new Result(true)

    for (const field of this.fields) {
      for (const rule of field.rules) {
        if (!rule.validate(data[field.identifier])) {
          result.success = false
          const validationError = new ValidationError(field, rule)
          result.addError(validationError)
        }
      }
    }
    return result
  }

}

export default Validation
