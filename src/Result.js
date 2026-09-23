
class Result {

  constructor(success) {
    this.success = success
    this.errors = []
  }

  addError(validationError) {
    this.errors.push(validationError)
  }

}
export default Result
