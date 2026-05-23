class Calculator {

    // Stores DOM refs and initializes state with clearAll()
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clearAll()
    }
    
    // Resets all three state values
    clearAll(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    // Clears only the current operand
    clear(){
        this.currentOperand = ''
    }

    // Implements a decimal guard; appends new number
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // Implements empty operand guard and chaining behavior
    chooseOperation(operation){
        if(this.currentOperand === ''){
            return
        }
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // Computes depending on the operator
    compute(){
        let curr = parseFloat(this.currentOperand)
        let prev = parseFloat(this.previousOperand)
        if(isNaN(curr) || isNaN(prev))return

        switch(this.operation){
            case '+':
                this.currentOperand = prev + curr
                break
            case '-':
                this.currentOperand = prev - curr
                break
            case '*':
                this.currentOperand = prev * curr
                break
            case '÷':
                this.currentOperand = prev / curr
                break
            default:
                return
        }

        this.operation = undefined
        this.previousOperand = ''
    }

    // Takes a raw number/string and returns a formatted string
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerPart = parseFloat(stringNumber.split('.'), [0])
        const decimalPart = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerPart)){
            integerDisplay = ''
        } else{
            integerPart.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if(decimalPart != null){
            return integerDisplay + '.' + decimalPart
        } else{
            integerDisplay
        }
    }

    // Writes state of the DOM
    updateDisplay(){
        currentOperandTextElement.innerText = getDisplayNumber(this.currentOperand)
        if(this.operation != null){
            this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand)+' '+this.operation
        } else{
            this.previousOperandTextElement.innerText = ''
        }
    }

}