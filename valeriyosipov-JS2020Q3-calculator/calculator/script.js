class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
        this.unaryOperation = undefined;
    }

    delete() {
        if (/^-[0-9]{1}$/.test(this.currentOperand) || this.currentOperand === Infinity || this.currentOperand === -Infinity) {
            this.currentOperand = "";
        } else (this.currentOperand = this.currentOperand.toString().slice(0, -1));
    }

    negate() {
        if (this.currentOperand == null || this.currentOperand == "" || /^-?0\.?[0]{0,}?$/.test(this.currentOperand)) return;
        if (this.currentOperand < 0) {
            this.currentOperand = this.currentOperand.toString().slice(1);
        } else {
            this.currentOperand = "-" +  this.currentOperand;
        }
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        if (number === "." && this.currentOperand === "") {
            this.currentOperand = "0.";
        } else {this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    chooseUnaryOperation(unaryOperation) {
        this.unaryOperation = unaryOperation;
        if (this.currentOperand === "") return;
        else {
            this.computeUnary();
        }
    }

    compute() {
        let result;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        let ac;
        let bc;
        if ((current ^ 0) !== current){
            bc = Math.pow(10, current.toString().length - current.toString().indexOf('.') - 1);
        } else {bc = 1};
        if ((previous ^ 0) !== previous){
            ac = Math.pow(10, previous.toString().length - previous.toString().indexOf('.') - 1);
        } else {ac = 1};
        switch (this.operation) {
            case "+":
                result = ((previous * ac * bc) + (current * bc * ac))/(ac * bc);
                break;
            case "-":
                result = ((previous * ac * bc) - (current * bc * ac))/(ac * bc);
                break;
            case "*":
                result = ((previous * ac) * (current * bc))/(ac * bc);
                break;
            case "÷":
                result = ((previous * ac) / (current * bc))/(ac / bc);
                break;
            case "x^y":
                result = Math.pow(previous, current);
                break;
            default:
                return;
        }
        this.readyToReset = true;
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    computeUnary() {
        let result;
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        switch (this.unaryOperation) {
            case "sqrt(x)":
                result = Math.sqrt(current);
                break;
            default:
                return;
        }
        this.readyToReset = true;
        this.currentOperand = result;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
        integerDisplay = "";
        } else {
        integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
        } else {
        return integerDisplay;
        }
    }

    updateDisplay() {
        if (isNaN(this.currentOperand)) {
            this.clear();
            this.currentOperandTextElement.innerText = "Error";
            this.previousOperandTextElement.innerText = "";
            return;
        }
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation === "x^y") {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ^`;
        } 
        else if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
        this.previousOperandTextElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const unaryOperationButtons = document.querySelectorAll("[data-unary-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const negateButton = document.querySelector("[data-negate]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
            calculator.currentOperand = "";
        }
        if (calculator.currentOperand === "0") {
            calculator.currentOperand = "";
        }
        calculator.appendNumber(button.innerText);
        calculator.readyToReset = false;
        calculator.updateDisplay();
        })
    })

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        })
    })

unaryOperationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseUnaryOperation(button.innerText);
        calculator.updateDisplay();
        })
    })

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
    })

negateButton.addEventListener("click", button => {
    calculator.negate();
    calculator.updateDisplay();
    })

allClearButton.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
    })

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
    })