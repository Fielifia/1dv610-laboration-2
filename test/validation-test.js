import Field from '../src/Field.js'
import { EmailRule, LowercaseRule, MatchingFieldsRule, MaxLengthRule, MaxValueRule, MinLengthRule, MinValueRule, NoCodeOrLinksRule, OnlyDigitsRule, OnlyLettersRule, RequiredRule, SpecialCharacterRule, UppercaseRule } from '../src/Rule.js'
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

// ===== REQUIRED RULE =====
test('RequiredRule accepts a value', () => {
  const field = new Field('name')
  field.addRule(new RequiredRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'Lucifer'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('RequiredRule rejects an empty value', () => {
  const field = new Field('name')
  field.addRule(new RequiredRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: ''
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

test('RequiredRule rejects whitespace', () => {
  const field = new Field('name')
  field.addRule(new RequiredRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: ' '
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// EMAIL FORMAT RULE
test('EmailRule accepts correct email format', () => {
  const field = new Field('email')
  field.addRule(new EmailRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    email: 'Lucifer@email.com'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('EmailRule rejects invalid email format', () => {
  const field = new Field('email')
  field.addRule(new EmailRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    email: 'email'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ==== TEST SEVERAL ERRORS =====
test('Validation accepts a value that passes several rules', () => {
  const field = new Field('name')
  field.addRule(new OnlyLettersRule())
  field.addRule(new MinLengthRule(2))

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'Lucifer'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('Failed validation presents several errors', () => {
  const field = new Field('name')
  field.addRule(new OnlyLettersRule())
  field.addRule(new MinLengthRule(2))

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: '0'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 2, 'Expected two validation errors')
})
