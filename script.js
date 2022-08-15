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

const button = document.querySelectorAll("button");
let mainDisplay = document.querySelector(".current");
let topDisplay = document.querySelector(".previous");

// let equalsPressed; //makes sure multiple operations can be chained right before equals key is pressed

let mainDisplayNumber;
let topDisplayNumber;
let op;

//a function to create classes and add event listeners to number buttons quickly
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
        if (mainDisplayNumber === 0) {
          mainDisplay.innerHTML = class1;
          mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
        } else {
          mainDisplay.innerHTML += class1;
          mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
        }
      }
    });
  }
}

addClass(button);

let del = document.querySelector(".Delete");
del.addEventListener("click", () => {
  if (mainDisplay.innerHTML != "") {
    mainDisplay.innerHTML = mainDisplay.innerHTML.substring(
      0,
      mainDisplay.innerHTML.length - 1
    );
    if (mainDisplay.innerHTML === "") {
      mainDisplayNumber = 0;
      mainDisplay.innerHTML = mainDisplayNumber;
    } else {
      mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
    }
  }
});

let dot = document.querySelector(".dot");
dot.addEventListener("click", () => {
  if (mainDisplay.innerHTML.includes(".") != true) {
    // prevents the user from clicking dot multiple times
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
  // equalsPressed = false;
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
  // equalsPressed = true;

  if (mainDisplay.innerHTML != "" && mainDisplay.innerHTML != ".") {
    if (topDisplay.innerHTML.includes("/")) {
      if (mainDisplayNumber != 0) {
        mainDisplay.innerHTML = equal();
        mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
      } else {
        alert("Cannot divide by zero !");
        mainDisplayNumber = undefined;
        mainDisplay.innerHTML = "";
      }
    } else {
      mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
      mainDisplay.innerHTML = equal();
      mainDisplayNumber = parseFloat(mainDisplay.innerHTML);
    }
    topDisplay.innerHTML = "";
    topDisplayNumber = undefined;
  }
});

// this function is called with clicks on operation buttons and reads the strings displayed on the screen
// and
const clickFunction = (op) => {
  if (mainDisplay.innerHTML != "" && mainDisplay.innerHTML != ".") {
    if (topDisplay.innerHTML.length === 0) {
      topDisplay.innerHTML = mainDisplayNumber + ` ${op}`;
      topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(` ${op}`, ""));
      mainDisplay.innerHTML = "";
    } else {
      topDisplay.innerHTML = equal() + ` ${op}`;
      mainDisplay.innerHTML = "";
    }
  } else if (
    mainDisplay.innerHTML === "" &&
    topDisplay.innerHTML != "" &&
    mainDisplay.innerHTML != "."
  ) {
    topDisplay.innerHTML = topDisplayNumber + ` ${op}`;
    topDisplayNumber = parseFloat(topDisplay.innerHTML.replace(` ${op}`, ""));
    mainDisplay.innerHTML = "";
  }
};

// this function is called for operations and
// decides what "op" parameter should be used in the "operator" function
const equal = () => {
  if (topDisplay.innerHTML.includes("x")) {
    op = multiply;
  } else if (topDisplay.innerHTML.includes("+")) {
    op = add;
  } else if (topDisplay.innerHTML.includes("/") && mainDisplayNumber != 0) {
    op = divide;
  } else if (topDisplay.innerHTML.includes("-")) {
    op = subtract;
  }

  let result = operator(op, topDisplayNumber, mainDisplayNumber);
  result = parseFloat((Math.round(result * 100) / 100).toFixed(4));
  topDisplayNumber = result; // this is important for making sure equals key works after chaining operations
  return result;
};
