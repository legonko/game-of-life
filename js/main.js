import { Game } from "./game.js";
import { WIDTH, HEIGHT, CELL_SIZE } from "./config.js";

export let cellSize;

let isDrawing = false;
let changedCells = new Set();

const canvas = document.getElementById("canvas");
const game = new Game(WIDTH, HEIGHT);

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


const btnRun = document.getElementById("run");
const btnStop = document.getElementById("stop");
const btnReset = document.getElementById("reset");
const btnRandom = document.getElementById("random");
const btnStep = document.getElementById("step");


btnRun.addEventListener("click", () => game.run());
btnStop.addEventListener("click", () => game.stop());
btnReset.addEventListener("click", () => game.reset());
btnRandom.addEventListener("click", () => game.randomMap());
btnStep.addEventListener("click", () => game.step());

// canvas.addEventListener("click", handleCanvasClick);

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

    const cellX = Math.floor(mouseX / cellSize);
    const cellY = Math.floor(mouseY / cellSize);

    if (changedCells.has(`${cellX},${cellY}`)) return;
    changedCells.add(`${cellX},${cellY}`)
    game.gameMap.toggleCell(cellX, cellY);

}

function resizeCanvas() {
    canvas.width = window.innerWidth - 60; // + padding
    canvas.height = window.innerHeight * 0.8;

    cellSize = parseInt(Math.min(canvas.width / WIDTH, canvas.height / HEIGHT));
    canvas.width = WIDTH * cellSize;
    canvas.height = HEIGHT * cellSize;
    game.gameMap.resizeCells();
}

