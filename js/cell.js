import { COLOR_ALIVE, COLOR_DEAD } from "./config.js";


export class Cell {
    constructor(ctx, x, y, cellSize){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.state = Math.random() > 0.7;
        this.cellSize = cellSize;
    
    }
    
    getCellState() {
        return this.state
    }

    setCellState(state) {
        this.state = state;
    }

    setCellNeighbors(numNeighbors) {
        this.neighbors = numNeighbors;
    }

    getCellNeighbors() {
        return this.neighbors
    }

    setCellSize(cellSize) {
        this.cellSize = cellSize;
    }

    getCellSize() {
        return this.cellSize
    }

    drawCell() {
        this.ctx.fillStyle = this.getCellState() ? COLOR_ALIVE : COLOR_DEAD;
        this.ctx.fillRect(this.x*this.getCellSize(), this.y*this.getCellSize(), this.getCellSize(), this.getCellSize());
    }

    nextGeneration() {
        if (!this.getCellState() && this.getCellNeighbors() === 3) {
            this.setCellState(true);
        } else if (this.getCellState() && (this.getCellNeighbors() < 2 || this.getCellNeighbors() > 3)) {
            this.setCellState(false);
        }
    }
}