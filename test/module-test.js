import Field from '../src/Field.js'
import { EmailRule, MinLengthRule, OnlyLettersRule, OnlyDigitsRule, RequiredRule } from '../src/Rule.js'
import Validation from '../src/Validation.js'

function test(description, testFunction) {
  try {
    testFunction()
    console.log(`PASS: ${description}`)
  } catch (error) {
    console.log(`FAIL: ${description}`)
    console.log(error.message)
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

// ===== DUPLICATE FIELD =====
test('Validation rejects duplicate field identifiers', () => {
  let errorThrown = false
  
  const field = new Field('name')
  const fieldDuplicate = new Field('name')

  const validation = new Validation()
  validation.addField(field)

  try {
    validation.addField(fieldDuplicate)
  } catch (error) {
    errorThrown = true
  }

  assert(errorThrown === true, 'Expected validation to fail')
})

// ===== DUPLICATE RULE =====
test('Validation rejects duplicate rules', () => {
  let errorThrown = false

  const field = new Field('name')

  field.addRule(new OnlyLettersRule())
  
  const validation = new Validation()
  validation.addField(field)
  
  try {
    field.addRule(new OnlyLettersRule())
  } catch (error) {
    errorThrown = true
  }

  assert(errorThrown === true, 'Expected validation to fail')
})

// ===== CUSTOM ERROR MESSAGE =====
test('Validations uses a custom error message', () => {
  const field = new Field('name')

  field.addRule(new OnlyLettersRule('Write only letters'))

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: '90102'
  })

  assert(result.errors[0].errorMessage === 'Write only letters')
})

// ===== OPTIONAL EMPTY FIELD =====
test('Validation accepts an empty optional field', () => {
  const field = new Field('name')
  field.addRule(new OnlyLettersRule())
  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: ''
  })

  assert(result.success === true, 'Expected validation to succeed')
})

// ===== MULTIPLE FIELDS WITH ERRORS =====
test('Validation collects errors from multiple fields', () => {
  const nameField = new Field('name')
  const ageField = new Field('age')
  const emailField = new Field('email')

  nameField.addRule(new OnlyLettersRule())
  ageField.addRule(new OnlyDigitsRule())
  emailField.addRule(new EmailRule())

  const validation = new Validation()
  validation.addField(nameField)
  validation.addField(ageField)
  validation.addField(emailField)

  const result = validation.validate({
    name: '0',
    age: '-3',
    email: 'myEmail'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 3, 'Expected tree validation errors')
})
