import Validation from '../src/Validation.js'
import Field from '../src/Field.js'
import { RequiredRule, OnlyLettersRule, OnlyDigitsRule, MinValueRule, MaxValueRule, MinLengthRule, MaxLengthRule, EmailRule, UppercaseRule, LowercaseRule, SpecialCharacterRule, MatchingFieldsRule } from '../src/Rule.js'

const registrationValidation = new Validation()

const username = new Field('username')
username.addRule(new RequiredRule())
username.addRule(new OnlyLettersRule())
registrationValidation.addField(username)

const form = document.querySelector('#registration')
const resultReport = document.querySelector('.result-report')

form.addEventListener('submit', event => {
  event.preventDefault()
  
  const formData = {
    username: document.querySelector('#username').value
  }
  
  const result = registrationValidation.validate(formData)
  
  resultReport.innerHTML = ''
  
  if (result.success) {
    const message = document.createElement('p')
    message.textContent = 'Valid!'
    resultReport.append(message)
  }
  
  const message = document.createElement('p')
  message.textContent = 'Invalid!'
  resultReport.append(message)
  
  for (const error of result.errors) {
    const errorMessage = document.createElement('p')
    errorMessage.textContent = error.errorMessage
    resultReport.append(errorMessage)
  }
})
