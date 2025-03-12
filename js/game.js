import { GameMap } from "./map.js";

export class Game {
    constructor(width, height) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.gameMap = new GameMap(this.ctx, width, height);
        this.gameMap.createNewMap();
        this.running = false;
    }

    stop() {
        this.running = false;
    }

    run() {
        this.running = true;
        this.gameloop();
    }

    randomMap() {
        this.gameMap.createNewMap();
        this.running = false;
    }

    reset() {
        this.gameMap.clearMap();
        this.running = false;
    }

    step() {
        this.running = false;
        this.gameMap.updateAllNeighbors();
        this.gameMap.updateMap();
    }

    gameloop() {
        if (!this.running) return;
        this.gameMap.updateAllNeighbors();
        this.gameMap.updateMap();
        setTimeout(() => this.gameloop(), 200);
    }

}
