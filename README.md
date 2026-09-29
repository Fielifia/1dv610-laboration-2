# Form Validation Module

A reusable JavaScript module for form validation.

The module allows programmers to configure fields and validation rules instead of implementing validation logic separately for each form.

## Features

The module supports the following validation rules:

- Required fields
- Email format
- Letters only
- Digits only
- Minimum and maximum length
- Minimum and maximum value
- Uppercase letters
- Lowercase letters
- Special characters
- Code and link detection
- Matching fields

The module also supports:

- Custom error messages
- Multiple validation rules per field
- Validation of multiple fields
- Collection of multiple validation errors
- Duplicate field identifier detection
- Duplicate rule detection

## Requirements

- Node.js
- JavaScript ES modules

The module has no external dependencies.

## Installation

Clone the repository:

```bash
git clone https://github.com/Fielifia/1dv610-laboration-2.git
```

Navigate to the project directory:

```bash
cd 1dv610-laboration-2
```

No additional packages are required.

## Usage

Create a `Validation` object and add `Field` objects to it.

Each field can be configured with one or more validation rules.

Example:

```javascript
import Field from './src/Field.js'
import Validation from './src/Validation.js'
import { EmailRule, RequiredRule } from './src/Rule.js'

const validation = new Validation()

const nameField = new Field('name')
nameField.addRule(new RequiredRule())

const emailField = new Field('email')
emailField.addRule(new RequiredRule())
emailField.addRule(new EmailRule())

validation.addField(nameField)
validation.addField(emailField)

const result = validation.validate({
  name: 'Anna',
  email: 'anna@email.com',
})
```

The validation result contains a `success` value and a collection of validation errors.

```javascript
result.success
result.errors
```

If validation fails, each error contains information about the field, the failed rule and the error message.

## Custom Error Messages

Validation rules can be given a custom error message.

Example:

```javascript
const nameField = new Field('name')
nameField.addRule(new RequiredRule('Name is required'))
```

The custom message is included in the corresponding validation error when the rule fails.

## Validation Behaviour

Empty fields are handled depending on whether a `RequiredRule` is configured.

- An empty optional field is accepted.
- An empty required field produces a required-field error.
- Other rules are not evaluated when a required field is empty.
- When a field contains a value, all configured rules are evaluated.
- Multiple validation errors can be returned from the same validation.

## Test App

The project includes a separate Test App consisting of an HTML form and its supporting JavaScript and CSS.

The Test App demonstrates how the validation module can be connected to a real form and how validation results can be presented to the user.

The Test App is located in the `test-app` directory.

## Testing

The module is tested using automated JavaScript tests executed with Node.js.

The tests cover both individual validation rules and module-level behaviour.

Run all automated tests from the project root:

```bash
npm test
```

The test suite currently contains 36 tests, covering:

- Individual validation rules
- Multiple rules
- Multiple validation errors
- Duplicate field identifiers
- Duplicate rules
- Custom error messages
- Optional and required fields
- Successful validation

See [TEST_REPORT.md](./TEST_REPORT.md) for the complete test report and test results.

## Project Structure

```text
src/
├── Field.js
├── Result.js
├── Rule.js
├── Validation.js
└── ValidationError.js

test/
├── module-test.js
└── validation-test.js

test-app/
├── app.js
├── index.html
└── style.css

package.json
README.md
REFLECTION.md
TEST_REPORT.md
```

## Reusing the Module

The module can be reused in different applications that need form validation.

A programmer can:

1. Create a `Validation` object.
2. Create fields with unique identifiers.
3. Add validation rules to each field.
4. Add the fields to the validation.
5. Pass the form data to `validate()`.
6. Use the returned result to determine whether the data is valid.
7. Handle the returned validation errors in the application's user interface.

The module is responsible for the validation logic, while the application using the module is responsible for creating the form and presenting validation feedback to the user.

## License

This project is licensed under the ISC License
