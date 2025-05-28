import { Cell } from "./cell.js";

export class GameMap {
    
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width; // in cells, not pixels
        this.height = height;
    }

    createNewMap(){
        this.gameMap = [];

        for (let y = 0; y < this.height; y++) {
            this.gameMap[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.gameMap[y][x] = new Cell(this.ctx, x, y, this.cellSize);
                this.gameMap[y][x].drawCell();
            }
        }
    }

    getNeighbors(x, y) {
        const neighborsDirectoins = [
                                    [-1, -1], [0, -1], [1, -1],
                                    [-1,  0],          [1,  0],
                                    [-1,  1], [0,  1], [1,  1]
                                    ];
        const numNeighbors = neighborsDirectoins.reduce((count, [dx, dy]) => {
            let nx = x + dx;
            let ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < this.width && ny < this.height) {
                count += this.gameMap[ny][nx].getCellState() ? 1 : 0;
            }
            return count;
        }, 0);

        return numNeighbors
    }

    forEachCell(func) {
        this.gameMap.forEach(row => {
            row.forEach(currentCell => {
                func(currentCell);
            })
        })
    }

    updateAllNeighbors() {
        this.forEachCell(cell => {
            let numNeighbors = this.getNeighbors(cell.x, cell.y);
            cell.setCellNeighbors(numNeighbors);
        })
    }

    updateMap() {
        this.forEachCell(cell => {
            cell.nextGeneration();
            cell.drawCell();
        })
    }

    clearMap() {
        this.forEachCell(cell => {
            cell.setCellState(false);
            cell.drawCell();
        })
    }

    toggleCell(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.gameMap[y][x].setCellState(!this.gameMap[y][x].getCellState());
            this.gameMap[y][x].drawCell();
        }
    }

    resizeCells(cellSize) {
        this.cellSize = cellSize;
        this.forEachCell(cell => {
            cell.setCellSize(cellSize);
            cell.drawCell();
        })
    }
}
