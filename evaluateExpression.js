const PARENTHESES_REGEX = /\((?<equation>[^()]+)\)/

const EVALUATTION_REGEX =
  /(?<operand1>\S+)\s*(?<operation>(?<!e)[-+*/^])\s*(?<operand2>\S+)/

export default function evaluateExpression(equation) {
  let match

  if (!EVALUATTION_REGEX.exec(equation)) return Number(equation)
  // parentesis evaluation with a recursive call
  while ((match = PARENTHESES_REGEX.exec(equation)) !== null) {
    const contents = match.groups.equation
    const result = evaluateExpression(contents)
    equation = equation.replace(`(${contents})`, result)
  }

  while ((match = EVALUATTION_REGEX.exec(equation)) !== null) {
    let result = handleMath(match.groups)
    equation = equation.replace(EVALUATTION_REGEX, result.toString())
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
      result = number1 ** number2
      break
  }
  return result
}
