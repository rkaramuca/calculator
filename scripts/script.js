const numButtons = document.querySelectorAll("[num]");
const opButtons = document.querySelectorAll("[operator]");
const clrButton = document.querySelector("[clr]");
const bkspcButton = document.querySelector("[bkspc]");
const decimalButton = document.querySelector("[decimal]");
const equalButton = document.querySelector("[equal]");
const screen = document.querySelector("#screen");

// global vars
let x = "";
let y = "";
let op = null;
let toClear = false;

// basic operations
add = (x, y) => x + y;
subtract = (x, y) => x - y;
multiply = (x, y) => x * y;
divide = (x, y) => x / y;

// add a nubmer to the screen
function addNum(num) {
    if (screen.textContent === "0" || toClear) clearScreen();
    screen.textContent += num;
}

// delete a number from the screen
function deleteNum() {
    if (screen.textContent != "0")
        screen.textContent = screen.textContent.toString().slice(0, -1);
}

// set the operation to be done
function setOp(newOp) {
    // if they already did something like 2+2 then they hit + again, evaluate 2+2
    if (op !== null) evaluate();
    x = screen.textContent;
    op = newOp;
    toClear = true;
}

// round the result
function result(num) {
    return Math.round(num * 1000) / 1000;
}

// do the evaluation for the current equation in the stack
function evaluate() {
    if (op === null || toClear) return;
    y = screen.textContent;
    if (op === "/" && y === "0") {
        reset();
        return;
    }
    screen.textContent = result(operate(op, x, y));
    op = null;
}

// clear the screen to add more numbers
function clearScreen() {
    screen.textContent = "";
    toClear = false;
}

// resets the screen and globals
function reset() {
    screen.textContent = "0";
    x = "";
    y = "";
    op = null;
}

// add the decimal point correctly
function addDecimal() {
    if (toClear) clearScreen();
    if (screen.textContent === "") screen.textContent = "0";
    if (screen.textContent.includes(".")) return;
    screen.textContent += ".";
}

// convert strings to nums then run the correct operation
function operate(op, x, y) {
    x = Number(x);
    y = Number(y);
    switch (op) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
        default:
            break;
    }
}

// add click events for each button
numButtons.forEach((button) => {
    button.addEventListener("click", () => addNum(button.textContent));
});
opButtons.forEach((button) => {
    button.addEventListener("click", () => setOp(button.textContent));
});

// special cases
equalButton.addEventListener("click", evaluate);
clrButton.addEventListener("click", reset);
bkspcButton.addEventListener("click", deleteNum);
decimalButton.addEventListener("click", addDecimal);
window.addEventListener("keydown", keyIn);

// add keydown events
function keyIn(e) {
    if (e.key >= 0 && e.key <= 9) addNum(e.key);
    if (e.key === ".") addDecimal();
    if (e.key === "=" || e.key === "Enter") evaluate();
    if (e.key === "Backspace") deleteNum();
    if (e.key === "Escape") reset();
    if (e.key === "+") setOp("+");
    if (e.key === "-") setOp("-");
    if (e.key === "/") setOp("*");
    if (e.key === "*") setOp("/");
}
