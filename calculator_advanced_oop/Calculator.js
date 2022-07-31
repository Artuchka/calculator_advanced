export default class Calculator {
	constructor(
		primaryOperandDisplay,
		secondaryOperandDisplay,
		operationDisplay
	) {
		this.primaryOperandDisplay = primaryOperandDisplay
		this.secondaryOperandDisplay = secondaryOperandDisplay
		this.operationDisplay = operationDisplay

		this.clear()
	}

	get operation() {
		return this.operationDisplay.textContent
	}
	set operation(value) {
		this.operationDisplay.textContent = value
	}

	get primaryOperand() {
		return parseFloat(this.primaryOperandDisplay.dataset.value)
	}
	set primaryOperand(value) {
		this.primaryOperandDisplay.dataset.value = value ?? ""
		this.primaryOperandDisplay.textContent = displayNumber(value)
	}

	get secondaryOperand() {
		return parseFloat(this.secondaryOperandDisplay.dataset.value)
	}
	set secondaryOperand(value) {
		this.secondaryOperandDisplay.dataset.value = value ?? ""
		this.secondaryOperandDisplay.textContent = displayNumber(value)
	}

	clear() {
		this.operation = null
		this.secondaryOperand = null
		this.primaryOperand = 0
	}

	addDigit(digit) {
		if (this.primaryOperand == 0) {
			this.primaryOperand = digit
			return
		}
		if (
			digit == "." &&
			this.primaryOperandDisplay.dataset.value.includes(".")
		) {
			return
		}
		this.primaryOperand =
			this.primaryOperandDisplay.textContent.toString() + digit.toString()
	}

	chooseOperation(operation) {
		if (this.operation !== "") return
		this.operation = operation
		this.secondaryOperand = this.primaryOperand
		this.primaryOperand = 0
	}

	removeDigit() {
		const stringNumber = this.primaryOperand.toString()
		if (stringNumber.length <= 1) {
			this.primaryOperand = 0
			return
		}
		this.primaryOperand = parseFloat(
			stringNumber.substring(0, stringNumber.length - 1)
		)
	}

	evaluate() {
		const num1 = this.secondaryOperand
		const num2 = this.primaryOperand

		let result
		switch (this.operation) {
			case "*":
				result = num1 * num2
				break
			case "/":
				result = num1 / num2
				break
			case "+":
				result = num1 + num2
				break
			case "-":
				result = num1 - num2
				break
		}

		this.clear()

		this.primaryOperand = result
	}
}

const NUMBER_FORMATTER = Intl.NumberFormat("en")
function displayNumber(number) {
	if (number === null) return ""

	const [integer, decimal] = number.toString().split(".")
	const formattedInteger = NUMBER_FORMATTER.format(integer)

	if (decimal === undefined) return formattedInteger

	return formattedInteger + "." + decimal
}
