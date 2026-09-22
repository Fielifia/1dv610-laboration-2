class ValidationError {

  constructor(field, rule) {
    this.field = field
    this.rule = rule
    this.errorMessage = rule.errorMessage
  }

}
export default ValidationError
