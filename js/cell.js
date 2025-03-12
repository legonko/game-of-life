import { CELL_SIZE, COLOR_ALIVE, COLOR_DEAD } from "./config.js";
import { cellSize } from "./main.js";

export class Cell {
    constructor(ctx, x, y){
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.state = Math.random() > 0.7;
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

    drawCell() {
        this.ctx.fillStyle = this.getCellState() ? COLOR_ALIVE : COLOR_DEAD;
        // this.ctx.fillRect(this.x*CELL_SIZE, this.y*CELL_SIZE, CELL_SIZE, CELL_SIZE);
        this.ctx.fillRect(this.x*cellSize, this.y*cellSize, cellSize, cellSize);
    }

    nextGeneration() {
        if (!this.getCellState() && this.getCellNeighbors() === 3) {
            this.setCellState(true);
        } else if (this.getCellState() && (this.getCellNeighbors() < 2 || this.getCellNeighbors() > 3)) {
            this.setCellState(false);
        }
    }
}