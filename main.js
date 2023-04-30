import "./style.css"

import evaluateExpression from "./evaluateExpression.js"

const InputValue = document.querySelector("#expression")
const ResultDiv = document.querySelector("#results")
const form = document.querySelector("#expression-form")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const input = InputValue.value
  const result = evaluateExpression(input)
<<<<<<< HEAD
  ResultDiv.innerText = isNaN(result) ? "Invalid math expression" : result
=======
  ResultDiv.innerText = isNaN(result) ? "Invalid Math Expression" : result
>>>>>>> 30872c74b88f97c9cb48c0f52356d045322261a1
})

InputValue.addEventListener("input", (e) => {
  if (e.target.value === "") ResultDiv.innerText = 0
})
