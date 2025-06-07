import { GameState, Piece, BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE } from './types.js';
import { PIECE_COLORS } from './pieces.js';

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private nextCanvas: HTMLCanvasElement;
    private nextCtx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, nextCanvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.nextCanvas = nextCanvas;
        
        const ctx = canvas.getContext('2d');
        const nextCtx = nextCanvas.getContext('2d');
        
        if (!ctx || !nextCtx) {
            throw new Error('Canvas context not available');
        }
        
        this.ctx = ctx;
        this.nextCtx = nextCtx;
    }

    public render(gameState: GameState): void {
        this.clearCanvas();
        
        if (!gameState.gameOver && !gameState.paused) {
            this.drawBoard(gameState.board);
            if (gameState.currentPiece) {
                this.drawPiece(gameState.currentPiece);
            }
        }
        
        if (gameState.paused) {
            this.drawPauseScreen();
        }
        
        if (gameState.nextPiece) {
            this.drawNextPiece(gameState.nextPiece);
        }
        
        this.updateUI(gameState);
    }

    private clearCanvas(): void {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.nextCtx.fillStyle = '#333';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
    }

    private drawBoard(board: number[][]): void {
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (board[y][x]) {
                    this.drawCell(x, y, '#666');
                }
            }
        }
    }

    private drawPiece(piece: Piece): void {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    this.drawCell(piece.x + x, piece.y + y, piece.color);
                }
            }
        }
    }

    private drawCell(x: number, y: number, color: string): void {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        
        this.ctx.strokeStyle = '#222';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }

    private drawNextPiece(piece: Piece): void {
        this.nextCtx.fillStyle = '#333';
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        
        const cellSize = 20;
        const offsetX = (this.nextCanvas.width - piece.shape[0].length * cellSize) / 2;
        const offsetY = (this.nextCanvas.height - piece.shape.length * cellSize) / 2;
        
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    this.nextCtx.fillStyle = piece.color;
                    this.nextCtx.fillRect(
                        offsetX + x * cellSize,
                        offsetY + y * cellSize,
                        cellSize,
                        cellSize
                    );
                    
                    this.nextCtx.strokeStyle = '#222';
                    this.nextCtx.lineWidth = 1;
                    this.nextCtx.strokeRect(
                        offsetX + x * cellSize,
                        offsetY + y * cellSize,
                        cellSize,
                        cellSize
                    );
                }
            }
        }
    }

    private drawPauseScreen(): void {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = 'white';
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('一時停止', this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.fillText('Pキーで再開', this.canvas.width / 2, this.canvas.height / 2 + 30);
    }

    private updateUI(gameState: GameState): void {
        const scoreElement = document.getElementById('score');
        const levelElement = document.getElementById('level');
        const linesElement = document.getElementById('lines');
        const gameOverElement = document.getElementById('gameOver');
        const finalScoreElement = document.getElementById('finalScore');
        
        if (scoreElement) scoreElement.textContent = gameState.score.toString();
        if (levelElement) levelElement.textContent = gameState.level.toString();
        if (linesElement) linesElement.textContent = gameState.lines.toString();
        
        if (gameOverElement && finalScoreElement) {
            if (gameState.gameOver) {
                gameOverElement.style.display = 'block';
                finalScoreElement.textContent = gameState.score.toString();
            } else {
                gameOverElement.style.display = 'none';
            }
        }
    }
}