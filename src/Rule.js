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
