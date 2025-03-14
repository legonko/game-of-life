import { Game } from "./game.js";
import { WIDTH, HEIGHT } from "./config.js";


let isDrawing = false;
let changedCells = new Set();

const canvas = document.getElementById("canvas");

// let isPortrait = window.innerWidth < window.innerHeight;
// let game = new Game(isPortrait ? HEIGHT : WIDTH, isPortrait ? WIDTH : HEIGHT);
const game = new Game(WIDTH, HEIGHT);

window.addEventListener("resize", resizeCanvas);
// window.addEventListener("orientationchange", () => {
//     let newIsPortrait = window.innerWidth < window.innerHeight;

//     if (newIsPortrait !== isPortrait) {
//         isPortrait = newIsPortrait;
//         game = new Game(isPortrait ? HEIGHT : WIDTH, isPortrait ? WIDTH : HEIGHT);
//     }
// });

resizeCanvas();


const btnRun = document.getElementById("run");
const btnStop = document.getElementById("stop");
const btnReset = document.getElementById("reset");
const btnRandom = document.getElementById("random");
const btnStep = document.getElementById("step");
const slider = document.getElementById("speed");

export let simulationSpeed = slider.value;

btnRun.addEventListener("click", () => game.run());
btnStop.addEventListener("click", () => game.stop());
btnReset.addEventListener("click", () => game.reset());
btnRandom.addEventListener("click", () => game.randomMap());
btnStep.addEventListener("click", () => game.step());
slider.addEventListener("input", updateSliderBackground);
slider.addEventListener("input", updateSimulationSpeed)

canvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    handleCanvasClick(event);
});

canvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
        handleCanvasClick(event);
    }
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    changedCells.clear();
});

canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
    changedCells.clear();
});

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (event.clientX - rect.left) * scaleX;
    const mouseY = (event.clientY - rect.top) * scaleY;
    const cellSize = game.gameMap.gameMap[0][0].getCellSize();
    const cellX = Math.floor(mouseX / cellSize);
    const cellY = Math.floor(mouseY / cellSize);

    if (changedCells.has(`${cellX},${cellY}`)) return;
    changedCells.add(`${cellX},${cellY}`)
    game.gameMap.toggleCell(cellX, cellY);

}

function resizeCanvas() {
    canvas.width = window.innerWidth - 60; // + padding
    canvas.height = window.innerHeight * 0.8;

    let cellSize = parseInt(Math.min(canvas.width / WIDTH, canvas.height / HEIGHT));
    canvas.width = WIDTH * cellSize;
    canvas.height = HEIGHT * cellSize;

    game.gameMap.resizeCells(cellSize);
}

function updateSliderBackground() {
    const min = this.min;
    const max = this.max;
    const val = this.value;

    const percent = ((val - min) / (max - min)) * 100;
    
    this.style.background = `linear-gradient(to right, #b2e673 ${percent}%, #ddd ${percent}%)`;
}

function updateSimulationSpeed() {
    const val = this.max - this.value;
    game.setSimulatoinSpeed(val);
}

updateSliderBackground();

