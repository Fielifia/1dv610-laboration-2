# Test Report

## Summary

The module was tested using automated JavaScript test files executed with Node.js. Two test files were used: one for testing the individual validation rules and one for testing module-level behavior such as field and rule configuration, validation results, custom error messages and handling of multiple errors.

Automated tests were chosen because they make it possible to repeatedly test the validation logic with both valid and invalid input and verify the expected results consistently.

The tests can be repeated by running the test files with Node.js from the test directory.

## Test Results

| What was tested | How it was tested  | Result  |
| ------ | -------------- | ----------- |
| Validation rules with valid and invalid input, including required fields, email format, character restrictions, length and value limits, password rules, code/link detection and matching fields. | Automated tests in [`validation-test.js`](./test/validation-test.js)  using valid and invalid input and assertions on the validation results. | ✅ Passed – 29/29 tests passed. 
| Duplicate field identifiers are rejected | Automated test in [`module-test.js`](./test/module-test.js) that attempts to add two fields with the same identifier and verifies that an error is thrown. | ✅ Passed. |
| Duplicate rules of the same type are rejected for a field | Automated test in [`module-test.js`](./test/module-test.js) that attempts to add the same rule type twice and verifies than an error is thrown. | ✅ Passed. |
| Custom error messages are included in validation errors. | Automated test in [`module-test.js`](./test/module-test.js) using a custom error message with `OnlyLettersRule` and invalid input, then checking the resulting error message. | ✅ Passed. |
| Empty optional fields are accepted. | Automated test in [`module-test.js`](./test/module-test.js) using an empty field without a `RequiredRule`. | ✅ Passed. |
| An empty required field only produces a required-field error and does not run the other rules. | Automated test in [`module-test.js`](./test/module-test.js) using both `RequiredRule` and `MinLengthRule` on an empty field. | ✅ Passed. |
| Errors from multiple fields are collected in the same validation result. | Automated test in [`module-test.js`](./test/module-test.js) with three fields containing invalid values and assertions on the number of errors. | ✅ Passed. |
| Validation succeeds when all fields contain valid data. | Automated test in [`module-test.js`](./test/module-test.js) with three fields and valid values. | ✅ Passed. |
