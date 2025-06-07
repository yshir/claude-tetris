import { TetrisGame } from './game.js';
import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';

class GameApp {
    private game: TetrisGame;
    private renderer: Renderer;
    private inputHandler: InputHandler;
    private lastTime: number = 0;
    private animationId: number = 0;

    constructor() {
        const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
        const nextCanvas = document.getElementById('nextCanvas') as HTMLCanvasElement;

        if (!canvas || !nextCanvas) {
            throw new Error('Canvas elements not found');
        }

        this.game = new TetrisGame();
        this.renderer = new Renderer(canvas, nextCanvas);
        this.inputHandler = new InputHandler(this.game);

        this.gameLoop = this.gameLoop.bind(this);
        this.gameLoop(0);
    }

    private gameLoop(currentTime: number): void {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.game.update(deltaTime);
        this.renderer.render(this.game.getState());

        this.animationId = requestAnimationFrame(this.gameLoop);
    }

    public restart(): void {
        this.game.restart();
    }

    public destroy(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// グローバルスコープに公開してHTMLから呼び出せるようにする
declare global {
    interface Window {
        game: GameApp;
    }
}

// ページ読み込み完了時にゲームを開始
document.addEventListener('DOMContentLoaded', () => {
    window.game = new GameApp();
});

export { GameApp };