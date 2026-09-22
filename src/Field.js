class Field {

  constructor(identifier) {
    this.identifier = identifier
    this.rules = []
  }

  addRule(rule) {

    if (this.rules.some(r => r.ruleType === rule.ruleType)) {
      throw new Error(`Rule of type ${rule.ruleType} already exists for field ${this.identifier}`)
    }

    this.rules.push(rule)
  }

}

export default Field
