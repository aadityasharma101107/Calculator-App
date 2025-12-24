let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            string = eval(string);
            input.value = string;
            input.scrollLeft = input.scrollWidth;
        }

        else if (e.target.innerHTML == 'AC') {
            string = "";
            input.value = string;
            input.scrollLeft = input.scrollWidth;
        }
        else if (e.target.innerHTML == 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;
            input.scrollLeft = input.scrollWidth;
        }
        else if (e.target.innerHTML === '%') {

            // Case 1: Single number percentage
            if (!string.match(/[\+\-\*\/]/)) {
                string = (parseFloat(string) / 100).toString();
                input.value = string;
                input.scrollLeft = input.scrollWidth;
                return;
            }

            // Case 2: Expression with operator
            let match = string.match(/(\d+\.?\d*)([\+\-\*\/])(\d+\.?\d*)$/);
            if (!match) return;

            let A = parseFloat(match[1]);
            let op = match[2];
            let B = parseFloat(match[3]);

            let result;

            // + and - → percentage of A
            if (op === '+' || op === '-') {
                result = A * B / 100;
            }
            // × and ÷ → simple percentage
            else {
                result = B / 100;
            }

            // Replace last part of expression
            string = string.replace(
                /(\d+\.?\d*)([\+\-\*\/])(\d+\.?\d*)$/,
                `${A}${op}${result}`
            );

            input.value = string;
            input.scrollLeft = input.scrollWidth;
        }
        else if (['+', '-', '*', '/'].includes(e.target.innerHTML)) {

            let operator = e.target.innerHTML;

            // If string is empty, do not allow operator
            if (string === "") return;

            // If last character is already an operator, replace it
            let lastChar = string[string.length - 1];
            if (['+', '-', '*', '/'].includes(lastChar)) {
                string = string.slice(0, -1) + operator;
            }
            else {
                string += operator;
            }

            input.value = string;
            input.scrollLeft = input.scrollWidth;
        }
        else if (e.target.innerHTML === '.') {

            // Case 1: empty input → 0.
            if (string === "") {
                string = "0.";
                input.value = string;
                input.scrollLeft = input.scrollWidth;
                return;
            }

            let lastChar = string[string.length - 1];

            // Case 2: after operator → add 0.
            if (['+', '-', '*', '/'].includes(lastChar)) {
                string += "0.";
                input.value = string;
                input.scrollLeft = input.scrollWidth;
                return;
            }

            // Case 3: prevent multiple dots in same number
            let lastNumber = string.split(/[\+\-\*\/]/).pop();
            if (lastNumber.includes('.')) return;

            // Case 4: normal dot
            string += '.';
            input.value = string;
            input.scrollLeft = input.scrollWidth;
        }

        else {
            string += e.target.innerHTML;
            input.value = string;
            input.scrollLeft = input.scrollWidth;
        }
    })
})




document.addEventListener("keydown", function (e) {

    const key = e.key;

    // Numbers
    if (!isNaN(key)) {
        document.querySelector(`button[data-key="${key}"]`)?.click();
    }

    // Operators
    else if (['+', '-', '*', '/'].includes(key)) {
        document.querySelector(`button[data-key="${key}"]`)?.click();
    }

    // Decimal
    else if (key === '.') {
        document.querySelector(`button[data-key="."]`)?.click();
    }

    // Percentage
    else if (key === '%') {
        document.querySelector(`button[data-key="%"]`)?.click();
    }

    // Equals (Enter)
    else if (key === 'Enter') {
        e.preventDefault(); // prevent form submit
        document.querySelector(`button[data-key="="]`)?.click();
    }

    // Delete last character
    else if (key === 'Backspace') {
        document.querySelector(`button[data-key="DEL"]`)?.click();
    }

    // Clear all
    else if (key === 'Escape') {
        document.querySelector(`button[data-key="AC"]`)?.click();
    }
});
