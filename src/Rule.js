export class Rule {

  constructor(errorMessage) {
    if (this.constructor === Rule) {
      throw new Error('Rule is an abstract class and cannot be instantiated')
    }

    this.errorMessage = errorMessage
  }

  validate(value, field, formData) {
    throw new Error(`The method 'validate()' must be implemented by the subclass [${this.constructor.name}]`)
  }
}

export class RequiredRule extends Rule {

  constructor(errorMessage) {
    super(errorMessage || 'This field is required.')
  }

  validate(value, field, formData) {
    return value !== null && value !== undefined && value.trim() !== ''
  }
}

export class EmailRule extends Rule {

  constructor(errorMessage) {
    super(errorMessage || 'Please enter a valid email address.')
  }

  validate(value, field, formData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  }
}


export class OnlyLettersRule extends Rule {

  constructor(errorMessage) {
    super(errorMessage || 'This field may only contain letters.')
  }

  validate(value, field, formData) {
    const letterRegex = /^\p{L}*$/u
    return letterRegex.test(value)
  }
}

export class OnlyDigitsRule extends Rule {

  constructor(errorMessage) {
    super(errorMessage || 'This field may only contain digits.')
  }

  validate(value, field, formData) {
    const digitRegex = /^\d+$/
    return digitRegex.test(value)
  }
}


export class MinLengthRule extends Rule {

  constructor(minLength, errorMessage) {
    if (!Number.isInteger(minLength) || minLength < 0) {
      throw new Error('minLength must be a non-negative integer')
    }

    super(errorMessage || `This field must contain at least ${minLength} characters.`)
    this.minLength = minLength
  }

  validate(value, field, formData) {
    return value.length >= this.minLength && value.length >= 0
  }
}

export class MaxLengthRule extends Rule {

  constructor(maxLength, errorMessage) {
    if (!Number.isInteger(maxLength) || maxLength < 0) {
      throw new Error('maxLength must be a non-negative integer')
    }

    super(errorMessage || `This field may contain at most ${maxLength} characters.`)
    this.maxLength = maxLength
  }

  validate(value, field, formData) {
    return value.length <= this.maxLength && value.length >= 0
  }
}

export class MinValueRule extends Rule {

  constructor(minValue, errorMessage) {
    if (!typeof minValue !== 'number' || Number.isNaN(minValue)) {
      throw new Error('minValue must be a number')
    }

    super(errorMessage || `This value must be at least ${minValue}.`)
    this.minValue = minValue
  }

  validate(value, field, formData) {
    return Number(value) >= this.minValue && value.length >= 0
  }
}

export class MaxValueRule extends Rule {

  constructor(maxValue, errorMessage) {
    if (!typeof maxValue !== 'number' || Number.isNaN(maxValue)) {
      throw new Error('maxValue must be a number')
    }

    super(errorMessage || `This value must not exceed ${maxValue}.`)
    this.maxValue = maxValue
  }

  validate(value, field, formData) {
    return Number(value) <= this.maxValue && value.length >= 0
  }
}


export class UppercaseRule extends Rule {
  constructor(errorMessage) {
    super(errorMessage || 'This field must contain an uppercase letter.')
  }

  validate(value, field, formData) {
    const uppercaseRegex = /\p{Lu}/u
    return uppercaseRegex.test(value)
  }
}

export class LowercaseRule extends Rule {
  constructor(errorMessage) {
    super(errorMessage || 'This field must contain an lowercase letter.')
  }

  validate(value, field, formData) {
    const lowercaseRegex = /\p{Ll}/u
    return lowercaseRegex.test(value)
  }
}

export class SpecialCharacterRule extends Rule {
  constructor(errorMessage) {
    super(errorMessage)
    this.errorMessage = errorMessage || 'This field must contain a special character.'
  }

  validate(value, field, formData) {
    const specialCharacterRegex = /[^\p{L}\d\s]/u
    return specialCharacterRegex.test(value)
  }
}

export class NoCodeOrLinksRule extends Rule {
  constructor(errorMessage) {
    super(errorMessage || 'This field may not contain code or links.')
  }

  validate(value, field, formData) {
    const codeRegex = /<[^>]*>|javascript:/i
    const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i

    return (!codeRegex.test(value) && !linkRegex.test(value))
  }
}

export class MatchingFieldsRule extends Rule {
  constructor(identifier, errorMessage) {
    super(errorMessage || 'The fields do not match.')
    this.identifier = identifier
  }

  validate(value, field, formData) {
    return value === formData[this.identifier]
  }
}
