import { Game } from "./game.js";
import { WIDTH, HEIGHT } from "./config.js";


let isDrawing = false;
let changedCells = new Set();
let game = new Game(WIDTH, HEIGHT);

const canvas = document.getElementById("canvas");
const btnRun = document.getElementById("run");
const btnStop = document.getElementById("stop");
const btnReset = document.getElementById("reset");
const btnRandom = document.getElementById("random");
const btnStep = document.getElementById("step");
const slider = document.getElementById("speed");

export let simulationSpeed = slider.value;

window.addEventListener('resize', resizeCanvas);
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

function calculateGrid(canvasWidth, canvasHeight, minCellSize = 20) {
    const cols = Math.floor(canvasWidth / minCellSize);
    const rows = Math.floor(canvasHeight / minCellSize);
    const cellSize = Math.min(
        Math.floor(canvasWidth / cols),
        Math.floor(canvasHeight / rows)
    );
    return { cols, rows, cellSize };
}

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
    const bounds = canvas.getBoundingClientRect();
    canvas.width = bounds.width;
    canvas.height = bounds.height;
    const { cols, rows, cellSize } = calculateGrid(canvas.width, canvas.height);
    game = new Game(cols, rows);
    game.gameMap.resizeCells(cellSize);
}


resizeCanvas();

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
