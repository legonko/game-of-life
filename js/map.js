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
                this.gameMap[y][x] = new Cell(this.ctx, x, y);
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

    updateAllNeighbors() {
        this.gameMap.map(row => {
            row.map(currentCell => {
                let numNeighbors = this.getNeighbors(currentCell.x, currentCell.y);
                currentCell.setCellNeighbors(numNeighbors);
            })
        })
    }

    updateMap() {
        this.gameMap.map(row => {
            row.map(currentCell => {
                currentCell.nextGeneration();
                currentCell.drawCell();
            })
        })
        
    }

    clearMap() {
        this.gameMap.map(row => {
            row.map(currentCell => {
                currentCell.setCellState(false);
                currentCell.drawCell();
            })
        })
    }

    toggleCell(x, y) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.gameMap[y][x].setCellState(!this.gameMap[y][x].getCellState());
            this.gameMap[y][x].drawCell();
        }
    }

    resizeCells() {
        this.gameMap.map(row => {
            row.map(currentCell => {
                currentCell.drawCell();
            })
        })
    }
}
