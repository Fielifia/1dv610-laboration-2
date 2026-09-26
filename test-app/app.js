import Validation from '../src/Validation.js'
import Field from '../src/Field.js'
import { RequiredRule, OnlyLettersRule, OnlyDigitsRule, MinValueRule, MaxValueRule, MinLengthRule, MaxLengthRule, EmailRule, UppercaseRule, LowercaseRule, SpecialCharacterRule, MatchingFieldsRule } from '../src/Rule.js'

const registrationValidation = new Validation()

const username = new Field('username')
username.addRule(new RequiredRule())
username.addRule(new OnlyLettersRule())

const age = new Field('age')
age.addRule(new OnlyDigitsRule())
age.addRule(new MinValueRule(0))
age.addRule(new MaxValueRule(100))

const email = new Field('email')
email.addRule(new RequiredRule())
email.addRule(new EmailRule())

const password = new Field('password')
password.addRule(new MinLengthRule(8))
password.addRule(new MaxLengthRule(20))
password.addRule(new SpecialCharacterRule())
password.addRule(new UppercaseRule())
password.addRule(new LowercaseRule())

const passwordConfirmation = new Field('passwordConfirmation')
passwordConfirmation.addRule(new MatchingFieldsRule('password'))


registrationValidation.addField(username)
registrationValidation.addField(age)
registrationValidation.addField(email)
registrationValidation.addField(password)
registrationValidation.addField(passwordConfirmation)


const form = document.querySelector('#registration')
const resultReport = document.querySelector('.result-report')

form.addEventListener('submit', event => {
  event.preventDefault()

  const formData = {
    username: document.querySelector('#username').value,
    age: document.querySelector('#age').value,
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value,
    passwordConfirmation: document.querySelector('#passwordConfirmation').value
  }

  const result = registrationValidation.validate(formData)

  resultReport.innerHTML = ''

  if (result.success) {
    const message = document.createElement('p')
    message.textContent = 'Valid!'
    resultReport.append(message)
  } else {
    const message = document.createElement('p')
    message.textContent = 'Invalid!'
    resultReport.append(message)
  }

  for (const error of result.errors) {
    const errorMessage = document.createElement('p')
    errorMessage.textContent = `${error.field.identifier}: ${error.errorMessage}`
    resultReport.append(errorMessage)
  }
})
