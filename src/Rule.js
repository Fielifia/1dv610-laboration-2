export class Rule {

  constructor(errorMessage) {
    if (this.constructor === Rule) {
      throw new Error('Rule is an abstract class and cannot be instant')
    }

    this.errorMessage = errorMessage || 'Field is invalid'
  }

  validate(value, field, formData) {
    throw new Error(`The method 'validate()' must be implemented by the subclass [${this.constructor.name}]`)
  }
}

export class RequiredRule extends Rule {

  validate(value, field, formData) {
    return value !== null && value !== undefined && value !== ''
  }
}

export class EmailRule extends Rule {

  validate(value, field, formData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }
}


export class OnlyLettersRule extends Rule {

  validate(value, field, formData) {
    const letterRegex = /^\p{L}*$/u
    return letterRegex.test(value)
  }
}

export class OnlyDigitsRule extends Rule {

  validate(value, field, formData) {
    const digitRegex = /^\d+$/
    return digitRegex.test(value)
  }
}


export class MinLengthRule extends Rule {

  constructor(minLength, errorMessage) {
    super(errorMessage)
    this.minLength = minLength
  }

  validate(value, field, formData) {
    return value.length >= this.minLength
  }
}

export class MaxLengthRule extends Rule {

  constructor(maxLength, errorMessage) {
    super(errorMessage)
    this.maxLength = maxLength
  }

  validate(value, field, formData) {
    return value.length <= this.maxLength
  }
}

export class MinValueRule extends Rule {

  constructor(minValue, errorMessage) {
    super(errorMessage)
    this.minValue = minValue
  }

  validate(value, field, formData) {
    return Number(value) >= this.minValue
  }
}

export class MaxValueRule extends Rule {

  constructor(maxValue, errorMessage) {
    super(errorMessage)
    this.maxValue = maxValue
  }

  validate(value, field, formData) {
    return Number(value) <= this.maxValue
  }
}


export class UppercaseRule extends Rule {

  validate(value, field, formData) {
    const uppercaseRegex = /\p{Lu}/u
    return uppercaseRegex.test(value)
  }
}

export class LowercaseRule extends Rule {

  validate(value, field, formData) {
    const lowercaseRegex = /\p{Ll}/u
    return lowercaseRegex.test(value)
  }
}

export class SpecialCharacterRule extends Rule {

  validate(value, field, formData) {
    const specialCharacterRegex = /[^\p{L}\d\s]/u
    return specialCharacterRegex.test(value)
  }
}

export class NoCodeOrLinksRule extends Rule {

  validate(value, field, formData) {
    const codeRegex = /<[^>]*>|javascript:/i
    const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i

    return (!codeRegex.test(value) && !linkRegex.test(value))
  }
}

export class MatchingFieldsRule extends Rule {
  constructor(identifier, errorMessage) {
    super(errorMessage)
    this.identifier = identifier
  }
  validate(value, field, formData) {
    return value === formData[this.identifier]
  }
}
