import { TetrisGame } from './game.js';

export class InputHandler {
    private game: TetrisGame;
    private keys: Set<string> = new Set();

    constructor(game: TetrisGame) {
        this.game = game;
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        document.addEventListener('keydown', (event) => {
            this.keys.add(event.code);
            this.handleKeyDown(event);
        });

        document.addEventListener('keyup', (event) => {
            this.keys.delete(event.code);
        });
    }

    private handleKeyDown(event: KeyboardEvent): void {
        switch (event.code) {
            case 'ArrowLeft':
                event.preventDefault();
                this.game.moveLeft();
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.game.moveRight();
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.game.moveDown();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.game.rotate();
                break;
            case 'Space':
                event.preventDefault();
                this.game.hardDrop();
                break;
            case 'KeyP':
                event.preventDefault();
                this.game.togglePause();
                break;
        }
    }

    public isKeyPressed(key: string): boolean {
        return this.keys.has(key);
    }
}