class Field {

  constructor(identifier) {
    this.identifier = identifier;
    this.rules = [];
  }

  addRule(rule) {
    this.rules.push(rule)
  }
  
}

export default Field
