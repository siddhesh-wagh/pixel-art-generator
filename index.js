let container = document.querySelector(".container");
let gridButton = document.getElementById("submit-grid");
let clearGridButton = document.getElementById("clear-grid");
let gridWidth = document.getElementById("width-range");
let gridHeight = document.getElementById("height-range");
let colorButton = document.getElementById("color-input");
let eraseBtn = document.getElementById("erase-btn");
let paintBtn = document.getElementById("paint-btn");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");

let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend"
    }
};

let deviceType = isTouchDevice() ? "touch" : "mouse";
let draw = false, erase = false;

// Detect if the device supports touch
function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints;
}

// Function to create grid
function createGrid() {
    container.innerHTML = "";
    
    for (let i = 0; i < gridHeight.value; i++) {
        let row = document.createElement("div");
        row.classList.add("gridRow");

        for (let j = 0; j < gridWidth.value; j++) {
            let col = document.createElement("div");
            col.classList.add("gridCol");

            // Mouse or Touch Start Event
            col.addEventListener(events[deviceType].down, () => {
                draw = true;
                col.style.backgroundColor = erase ? "transparent" : colorButton.value;
            });

            // Mouse Move or Touch Move Event
            col.addEventListener(events[deviceType].move, (e) => {
                if (draw) {
                    let element = document.elementFromPoint(
                        deviceType === "mouse" ? e.clientX : e.touches[0].clientX,
                        deviceType === "mouse" ? e.clientY : e.touches[0].clientY
                    );
                    if (element && element.classList.contains("gridCol")) {
                        element.style.backgroundColor = erase ? "transparent" : colorButton.value;
                    }
                }
            });

            // Mouse or Touch End Event
            col.addEventListener(events[deviceType].up, () => draw = false);

            row.appendChild(col);
        }
        container.appendChild(row);
    }
}

// Button Click Listeners
gridButton.addEventListener("click", createGrid);
clearGridButton.addEventListener("click", () => container.innerHTML = "");

// Toggle Erase Mode
eraseBtn.addEventListener("click", () => erase = true);
paintBtn.addEventListener("click", () => erase = false);

// Update Slider Values
gridWidth.addEventListener("input", () => widthValue.textContent = gridWidth.value.padStart(2, "0"));
gridHeight.addEventListener("input", () => heightValue.textContent = gridHeight.value.padStart(2, "0"));

// Set Default Values on Load
window.onload = () => {
    gridWidth.value = 10;
    gridHeight.value = 10;
    widthValue.textContent = "10";
    heightValue.textContent = "10";
};
