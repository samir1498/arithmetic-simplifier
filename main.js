import "./style.css"

import evaluateExpression from "./evaluateExpression.js"

const InputValue = document.querySelector("#equation")
const ResultDiv = document.querySelector("#results")
const form = document.querySelector("#equation-form")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const input = InputValue.value
  const result = evaluateExpression(input)
  ResultDiv.innerText = isNaN(result) ? "Invalid Math Expression" : result
})

InputValue.addEventListener("input", (e) => {
  if (e.target.value === "") ResultDiv.innerText = 0
})
