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
let state;
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
        class1 != "." &&
        class1 != "Delete"
      ) {
        mainDisplay.innerHTML += class1;
        mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
      }
    });
  }
}

addClass(button);

let del = document.querySelector(".Delete");
del.addEventListener("click", () => {
  mainDisplay.innerHTML = mainDisplay.innerHTML.substring(
    0,
    mainDisplay.innerHTML.length - 1
  );
  mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
});

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
  clickFunction("x");
});

let add1 = document.querySelector(".add");
add1.addEventListener("click", () => {
  clickFunction("+");
});

let sub = document.querySelector(".subtract");
sub.addEventListener("click", () => {
  clickFunction("-");
});

let div = document.querySelector(".divide");
div.addEventListener("click", () => {
  clickFunction("/");
});

let equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
  state = "equal";

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
    mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
    mainDisplay.innerHTML = equal();
    mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
  }
  topDisplay.innerHTML = "";
  topDisplayNumber = undefined;
});

const clickFunction = (op) => {
  if (topDisplay.innerHTML.length === 0) {
    topDisplay.innerHTML = mainDisplayNumber + ` ${op}`;
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(` ${op}`, ""));
    mainDisplay.innerHTML = "";
  } else if (state === "equal") {
    topDisplay.innerHTML = topDisplayNumber + ` ${op}`;
    mainDisplayNumber = undefined;
    mainDisplay.innerHTML = "";
    state = "notequal";
  } else if (state === "notequal") {
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(` ${op}`, ""));
    topDisplay.innerHTML = equal() + ` ${op}`;
    mainDisplay.innerHTML = "";
  }
};

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
  // topDisplayNumber = result;

  return result;
};
