import Field from '../src/Field.js'
import { EmailRule, LowercaseRule, MatchingFieldsRule, MaxLengthRule, MaxValueRule, MinLengthRule, MinValueRule, NoCodeOrLinksRule, OnlyDigitsRule, OnlyLettersRule, RequiredRule, SpecialCharacterRule, UppercaseRule } from '../src/Rule.js'
import Validation from '../src/Validation.js'

/**
 * Runs a test and reports whether it passed or failed.
 *
 * @param {string} description - Description of the test.
 * @param {Function} testFunction - Function containing the test logic.
 */
function test(description, testFunction) {
  try {
    testFunction()
    console.log(`PASS: ${description}`)
  } catch (error) {
    console.log(`FAIL: ${description}`)
    console.log(error.message)
  }
}

/**
 * Checks that a condition is true.
 *
 * @param {boolean} condition - Condition that must be true.
 * @param {string} message - Error message if the condition is false.
 * @throws {Error} If the condition is false.
 */
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

// ===== EMAIL FORMAT RULE =====
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

// ===== ONLY LETTERS RULE =====
test('OnlyLettersRule accepts value with only letters', () => {
  const field = new Field('name')
  field.addRule(new OnlyLettersRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'Lucifer'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('OnlyLettersRule rejects value containing anything but letters', () => {
  const field = new Field('name')
  field.addRule(new OnlyLettersRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'Lucifer1'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ===== ONLY DIGITS RULE =====
test('OnlyDigitsRule accepts value with only digits', () => {
  const field = new Field('age')
  field.addRule(new OnlyDigitsRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    age: '32'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('OnlyDigitsRule rejects value containing anything but digits', () => {
  const field = new Field('age')
  field.addRule(new OnlyDigitsRule())
  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    age: 'Lucifer'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ===== MIN LENGTH RULE =====
test('MinLengthRule accepts value with at least X characters', () => {
  const field = new Field('name')
  field.addRule(new MinLengthRule(2))

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'Lu'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('MinLengthRule rejects value with under X characters', () => {
  const field = new Field('name')
  field.addRule(new MinLengthRule(2))
  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'L'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ===== MAX LENGTH RULE =====
test('MaxLengthRule accepts value with at most X characters', () => {
  const field = new Field('name')
  field.addRule(new MaxLengthRule(12))

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'Lucifer'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('MaxLengthRule rejects value with over X characters', () => {
  const field = new Field('name')
  field.addRule(new MaxLengthRule(12))
  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'LuciferTheDark'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ===== MIN VALUE RULE =====
test('MinValueRule accepts value over or equal to X', () => {
  const field = new Field('age')
  field.addRule(new MinValueRule(0))

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    age: '12'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('MinValueRule rejects value under X', () => {
  const field = new Field('age')
  field.addRule(new MinValueRule(0))
  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    age: '-2'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ===== MIN VALUE RULE =====
test('MaxValueRule accepts value under or equal to X', () => {
  const field = new Field('age')
  field.addRule(new MaxValueRule(100))

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    age: '12'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('MaxValueRule rejects value over X', () => {
  const field = new Field('age')
  field.addRule(new MaxValueRule(100))
  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    age: '120'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ===== UPPERCASE RULE =====
test('UppercaseRule accepts value containing an uppercase character', () => {
  const field = new Field('name')
  field.addRule(new UppercaseRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'Lucifer'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('UppercaseRule rejects value missing an uppercase character', () => {
  const field = new Field('name')
  field.addRule(new UppercaseRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'lucifer'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ===== LOWER RULE =====
test('LowercaseRule accepts value containing a lowercase character', () => {
  const field = new Field('name')
  field.addRule(new LowercaseRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'Lucifer'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('LowercaseRule rejects value missing a lowercase character', () => {
  const field = new Field('name')
  field.addRule(new LowercaseRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    name: 'LUCIFER'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ===== SPECIAL CHARACTER RULE =====
test('SpecialCharacterRule accepts value containing a special character', () => {
  const field = new Field('password')
  field.addRule(new SpecialCharacterRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    password: 'Lucifer@password'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('SpecialCharacterRule rejects value missing a special character', () => {
  const field = new Field('password')
  field.addRule(new SpecialCharacterRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    password: 'Luciferpassword'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ===== NO CODE OR LINKS RULE =====
test('NoCodeOrLinksRule accepts value without code or links', () => {
  const field = new Field('password')
  field.addRule(new NoCodeOrLinksRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    password: 'Lucifer@password'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('NoCodeOrLinksRule rejects value containing code or links', () => {
  const field = new Field('password')
  field.addRule(new NoCodeOrLinksRule())

  const validation = new Validation()
  validation.addField(field)

  const result = validation.validate({
    password: '<a href="https://google.com">Luciferpassword</a>'
  })

  assert(result.success === false, 'Expected validation to fail')
  assert(result.errors.length === 1, 'Expected one validation error')
})

// ===== MATCHING FIELDS RULE =====
test('MatchingFieldsRule accepts value matching another fields value', () => {
  const field = new Field('password')
  const confirm = new Field('confirm')
  confirm.addRule(new MatchingFieldsRule('password'))

  const validation = new Validation()
  validation.addField(field)
  validation.addField(confirm)


  const result = validation.validate({
    password: 'Lucifer@password',
    confirm: 'Lucifer@password'
  })

  assert(result.success === true, 'Expected validation to succeed')
})

test('MatchingFieldsRule rejects value not matching another fields value', () => {
  const field = new Field('password')
  const confirm = new Field('confirm')
  confirm.addRule(new MatchingFieldsRule('password'))

  const validation = new Validation()
  validation.addField(field)
  validation.addField(confirm)

  const result = validation.validate({
    password: 'Lucifer@password',
    confirm: 'Luciferpassword'
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
