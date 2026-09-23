class Field {

  constructor(identifier) {
    this.identifier = identifier
    this.rules = []
  }

  addRule(rule) {

    if (this.rules.some(existingRule => existingRule.constructor === rule.constructor)) {
      throw new Error(`Rule already exists for field ${this.identifier}`)
    }
    this.rules.push(rule)
  }

}

export default Field
