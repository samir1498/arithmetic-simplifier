import evaluateExpression from "./evaluateExpression.js"

describe("#evaluateExpression", () => {
  describe("with exponents", () => {
    test("it returns the correct result", () => {
      expect(evaluateExpression("3 ^ 2")).toBe(9)
    })
  })

  describe("with addition", () => {
    test("it returns the correct result", () => {
      expect(evaluateExpression("3 + 2")).toBe(5)
    })
  })

  describe("with subtraction", () => {
    test("it returns the correct result", () => {
      expect(evaluateExpression("2 - 3")).toBe(-1)
    })
  })

  describe("with multiplication", () => {
    test("it returns the correct result", () => {
      expect(evaluateExpression("2 * 3")).toBe(6)
    })
  })

  describe("with division", () => {
    test("it returns the correct result", () => {
      expect(evaluateExpression("3 / 2")).toBe(1.5)
    })
  })

  describe("with parenthesis", () => {
    test("it returns the correct result", () => {
      expect(evaluateExpression("(3 + 2) * 4")).toBe(20)
    })
  })

  describe("with very large numbers", () => {
    test("it returns the correct result in scientific notation", () => {
      expect(evaluateExpression("10 ^ 30")).toBe(1e30)
    })
  })

  describe("with very small numbers", () => {
    test("it returns the correct result in scientific notation", () => {
      expect(evaluateExpression("10 ^ -30")).toBe(1e-30)
    })
  })

  describe("with a malformed equation", () => {
    test("it returns NaN", () => {
      expect(evaluateExpression("abc")).toBeNaN()
    })
  })
  describe("with a non valid operation", () => {
    test("it returns NaN", () => {
      expect(evaluateExpression("2 ** 4")).toBeNaN()
    })
  })
})
