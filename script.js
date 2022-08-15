// Basic operations

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const operator = (op = op, a = topDisplayNumber, b = mainDisplayNumber) => {
  return op(a, b);
};

//a function to create classes and add event listeners quickly

const button = document.querySelectorAll("button");
let mainDisplay = document.querySelector(".current");

let topDisplay = document.querySelector(".previous");

let mainDisplayNumber;
let topDisplayNumber;
let op;
function addClass(button) {
  for (let i = 0; i < button.length; i++) {
    let element = button[i];
    let class1 = element.innerHTML;
    element.classList.add(class1);
    element.addEventListener("click", () => {
      if (
        class1 != "Clear" &&
        class1 != "=" &&
        class1 != "x" &&
        class1 != "/" &&
        class1 != "+" &&
        class1 != "-" &&
        class1 != "."
      ) {
        mainDisplay.innerHTML += class1;
        mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
      }
    });
  }
}

addClass(button);

let dot = document.querySelector(".dot");
dot.addEventListener("click", () => {
  if (mainDisplay.innerHTML.includes(".") != true) {
    mainDisplay.innerHTML += ".";
    mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
  }
});

let clear = document.querySelector(".Clear");
clear.addEventListener("click", () => {
  mainDisplay.innerHTML = "";
  mainDisplayNumber = undefined;
  topDisplay.innerHTML = "";
  topDisplayNumber = undefined;
});

let x = document.querySelector(".x");
x.addEventListener("click", () => {
  if (topDisplay.innerHTML.length === 0) {
    op = multiply;
    topDisplay.innerHTML = mainDisplayNumber + " x";
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(" x", ""));
    mainDisplay.innerHTML = "";
  } else {
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(" x", ""));
    topDisplay.innerHTML = equal() + " x";
    mainDisplay.innerHTML = "";
  }
});

let add1 = document.querySelector(".add");
add1.addEventListener("click", () => {
  if (topDisplay.innerHTML.length === 0) {
    op = add;
    topDisplay.innerHTML = mainDisplayNumber + " +";
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(" +", ""));
    mainDisplay.innerHTML = "";
  } else {
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(" +", ""));
    topDisplay.innerHTML = equal() + " +";
    mainDisplay.innerHTML = "";
  }
});

let sub = document.querySelector(".subtract");
sub.addEventListener("click", () => {
  if (topDisplay.innerHTML.length === 0) {
    op = subtract;
    topDisplay.innerHTML = mainDisplayNumber + " -";
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(" -", ""));
    mainDisplay.innerHTML = "";
  } else {
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(" -", ""));
    topDisplay.innerHTML = equal() + " -";
    mainDisplay.innerHTML = "";
  }
});

let div = document.querySelector(".divide");
div.addEventListener("click", () => {
  if (topDisplay.innerHTML.length === 0) {
    op = divide;
    topDisplay.innerHTML = mainDisplayNumber + " /";
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(" /", ""));
    mainDisplay.innerHTML = "";
  } else {
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(" /", ""));
    topDisplay.innerHTML = equal() + " /";
    mainDisplay.innerHTML = "";
  }
});

let equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
  if (mainDisplay.innerHTML != "" && topDisplay.innerHTML.includes("/")) {
    if (mainDisplayNumber != 0) {
      mainDisplay.innerHTML = equal();
      mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
    } else {
      alert("Cannot divide by zero !");
      mainDisplayNumber = undefined;
      mainDisplay.innerHTML = "";
    }
  } else if (mainDisplay.innerHTML != "") {
    mainDisplay.innerHTML = equal();
    mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
  }
});

const equal = () => {
  if (topDisplay.innerHTML.includes("x") || topDisplay.innerHTML.length === 0) {
    op = multiply;
  } else if (
    topDisplay.innerHTML.includes("+") ||
    topDisplay.innerHTML.length === 0
  ) {
    op = add;
  } else if (
    topDisplay.innerHTML.includes("/") ||
    (topDisplay.innerHTML.length === 0 && mainDisplayNumber != 0)
  ) {
    op = divide;
  } else if (
    topDisplay.innerHTML.includes("-") ||
    topDisplay.innerHTML.length === 0
  ) {
    op = subtract;
  }
  let result = operator(op, topDisplayNumber, mainDisplayNumber);
  result = parseFloat((Math.round(result * 100) / 100).toFixed(4));
  topDisplayNumber = result;
  return result;
};
