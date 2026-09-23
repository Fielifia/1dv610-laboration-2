export class Rule {

  constructor(errorMessage) {
    this.parameters = {}
    this.errorMessage = errorMessage
  }

  validate(data) {
    return true
  }
}

export class RequiredRule extends Rule {
  validate(data) {
    return data !== null && data !== undefined && data !== ''
  }
}

export class EmailRule extends Rule {
  validate(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(data)
  }
}

export class OnlyLettersRule extends Rule {
  validate(data) {
    const letterRegex = /^\p{L}*$/u
    return letterRegex.test(data)
  }
}

export class OnlyDigitsRule extends Rule {
  validate(data) {
    const digitRegex = /^\d+$/
    return digitRegex.test(data)
  }
}

export class MinLengthRule extends Rule {
  constructor(minLength, errorMessage) {
    super(errorMessage)
    this.minLength = minLength
  }

  validate(data) {
    return data.length >= this.minLength
  }
}

export class MaxLengthRule extends Rule {
  constructor(maxLength) {
    this.maxLength = maxLength
  }

  validate(data) {
    return data.length <= this.maxLength
  }
}

export class MinValueRule extends Rule {
  constructor(minValue) {
    this.minValue = minValue
  }

  validate(data) {
    return Number(data) >= this.minValue
  }
}

export class MaxValueRule extends Rule {
  constructor(maxValue) {
    this.maxValue = maxValue
  }

  validate(data) {
    return Number(data) <= this.maxValue
  }
}


export class UppercaseRule extends Rule {
  validate(data) {
    const uppercaseRegex = /\p{Lu}/u
    return uppercaseRegex.test(data)
  }
}

export class LowercaseRule extends Rule {
  validate(data) {
    const lowercaseRegex = /\p{Ll}/u
    return lowercaseRegex.test(data)
  }
}

export class SpecialCharacterRule extends Rule {
  validate(data) {
    const specialCharacterRegex = /[^\p{L}\d\s]/u
    return specialCharacterRegex.test(data)
  }
}

export class NoCodeOrLinksRule extends Rule {
  validate(data) {
    const codeRegex = /<[^>]*>|javascript:/i
    const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/i
    return (codeRegex.test(data) && linkRegex.test(data))
  }
}

export class MatchingFieldsRule extends Rule {
  // Logic
}
