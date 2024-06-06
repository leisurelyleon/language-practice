// Calculator class to perform mathematical operations
class Calculator {
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        if (b === 0) {
            console.error('Cannot divide by zero.');
            return undefined;
        }
        return a / b;
    }

    power(base, exponent) {
        return Math.pow(base, exponent);
    }

    factorial(n) {
        if (n < 0) {
            console.error('Factorial is not defined for negative numbers.');
            return undefined;
        }

        if (n === 0 || n === 1) {
            return 1;
        }

        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }

        return result;
    }
}

// Creating a calculator instance
const calculator = new Calculator();

// Performing basic arithmetic operations
console.log(`Addition: ${calculator.add(5, 3)}`);
console.log(`Subtraction: ${calculator.subtract(8, 2)}`);
console.log(`Multiplication: ${calculator.multiply(4, 6)}`);
console.log(`Division: ${calculator.divide(9, 3)}`);

// Performing power and factorial operations
console.log(`Power: ${calculator.power(2, 3)}`);
console.log(`Factorial: ${calculator.factorial(5)}`);
console.log(`Factorial of -3: ${calculator.factorial(-3)}`);