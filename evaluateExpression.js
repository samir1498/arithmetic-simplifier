const PARENTHESIS_REGEX = /\((?<expression>[^\(\)]*)\)/
const MULTIPLY_DIVIDE_REGEX =
  /(?<operand1>\d+(?:[eE][-+]?\d+)?)\s*(?<operation>[\/\*])\s*(?<operand2>\d+(?:[eE][-+]?\d+)?)\b/
const EXPONENT_REGEX =
  /(?<operand1>\d+(?:[eE][-+]?\d+)?)\s*(?<operation>\^)\s*(?<operand2>-?\d+(?:[eE][-+]?\d+)?)\b/

const ADD_SUBTRACT_REGEX =
  /(?<operand1>\d+(?:[eE][-+]?\d+)?)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\d+(?:[eE][-+]?\d+)?)\b/
const PARENTHESIS_MULTPLY_REGEX = /(\d+)\(/g

export default function evaluateExpression(expression) {
  let match
  // parentesis evaluation with a recursive call
  while ((match = PARENTHESIS_REGEX.exec(expression)) !== null) {
    // adding * between a number and a parenthisis
    expression = expression.replace(PARENTHESIS_MULTPLY_REGEX, "$1*(")
    const contents = match.groups.expression
    const result = evaluateExpression(contents)
    expression = expression.replace(PARENTHESIS_REGEX, result)
  }

  while ((match = EXPONENT_REGEX.exec(expression)) !== null) {
    let result = handleMath(match.groups)
    expression = expression.replace(EXPONENT_REGEX, result)
  }

  while ((match = MULTIPLY_DIVIDE_REGEX.exec(expression)) !== null) {
    let result = handleMath(match.groups)
    expression = expression.replace(MULTIPLY_DIVIDE_REGEX, result.toString())
  }

  while ((match = ADD_SUBTRACT_REGEX.exec(expression)) !== null) {
    let result = handleMath(match.groups)
    expression = expression.replace(ADD_SUBTRACT_REGEX, result.toString())
  }
  return Number(expression)
}

function handleMath({ operand1, operation, operand2 }) {
  let result
  let number1 = Number(operand1)
  let number2 = Number(operand2)
  switch (operation) {
    case "+":
      result = number1 + number2
      break
    case "-":
      result = number1 - number2
      break
    case "*":
      result = number1 * number2
      break
    case "/":
      result = number1 / number2
      break
    case "^":
      result = Math.pow(number1, number2)
      break
  }
  return result
}
