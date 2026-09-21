class ValidationError {
  constructor(field, rule, errorMessage) {
    this.field = field;
    this.rule = rule;
    this.errorMessage = errorMessage;
  }
}
export default ValidationError
