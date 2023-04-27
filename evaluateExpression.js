const PARENTHESIS_REGEX = /\((?<equation>[^\(\)]*)\)/
const MULTIPLY_DIVIDE_REGEX =
  /(?<operand1>-?\d+(?:[eE][-+]?\d+)?)\s*(?<operation>[\/\*])\s*(?<operand2>-?\d+(?:[eE][-+]?\d+)?)\b/
const EXPONENT_REGEX =
  /(?<operand1>-?\d+(?:[eE][-+]?\d+)?)\s*(?<operation>\^)\s*(?<operand2>-?\d+(?:[eE][-+]?\d+)?)\b/

const ADD_SUBTRACT_REGEX =
  /(?<operand1>-?\d+(?:[eE][-+]?\d+)?)\s*(?<operation>(?<!e)[\-\+])\s*(?<operand2>\d+(?:[eE][-+]?\d+)?)\b/
const ADD_MULTIPLY_REGEX =
  /(?<operand1>-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?)(?<operation>\()(?<operand2>-?\d+(?:\.\d+)?(?:[eE][-+]?\d+)?)\b/;

export default function evaluateExpression(equation) {
  let match
  // Add multiplication between number and parentheses
  equation = equation.replace(ADD_MULTIPLY_REGEX, "$1*$2")

  // parentesis evaluation with a recursive call
  while ((match = PARENTHESIS_REGEX.exec(equation)) !== null) {
    const contents = match.groups.equation
    const result = evaluateExpression(contents)
    equation = equation.replace(PARENTHESIS_REGEX, result)
  }

  while ((match = EXPONENT_REGEX.exec(equation)) !== null) {
    let result = handleMath(match.groups)
    equation = equation.replace(EXPONENT_REGEX, result)
  }

  while ((match = MULTIPLY_DIVIDE_REGEX.exec(equation)) !== null) {
    let result = handleMath(match.groups)
    equation = equation.replace(MULTIPLY_DIVIDE_REGEX, result.toString())
  }

  while ((match = ADD_SUBTRACT_REGEX.exec(equation)) !== null) {
    let result = handleMath(match.groups)
    equation = equation.replace(ADD_SUBTRACT_REGEX, result.toString())
  }

  return Number(equation)
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
