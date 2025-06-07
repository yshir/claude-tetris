import { GameState, Piece, BOARD_WIDTH, BOARD_HEIGHT } from './types.js';
import { createRandomPiece, rotatePiece } from './pieces.js';

export class TetrisGame {
    private state: GameState;
    private dropTimer: number = 0;
    private dropTime: number = 1000;

    constructor() {
        this.state = this.createInitialState();
    }

    private createInitialState(): GameState {
        return {
            board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)),
            currentPiece: createRandomPiece(),
            nextPiece: createRandomPiece(),
            score: 0,
            level: 1,
            lines: 0,
            gameOver: false,
            paused: false
        };
    }

    public getState(): GameState {
        return this.state;
    }

    public update(deltaTime: number): void {
        if (this.state.gameOver || this.state.paused) return;

        this.dropTimer += deltaTime;
        if (this.dropTimer >= this.dropTime) {
            this.moveDown();
            this.dropTimer = 0;
        }
    }

    public moveLeft(): void {
        if (this.state.currentPiece && this.canMove(this.state.currentPiece, -1, 0)) {
            this.state.currentPiece.x--;
        }
    }

    public moveRight(): void {
        if (this.state.currentPiece && this.canMove(this.state.currentPiece, 1, 0)) {
            this.state.currentPiece.x++;
        }
    }

    public moveDown(): void {
        if (this.state.currentPiece && this.canMove(this.state.currentPiece, 0, 1)) {
            this.state.currentPiece.y++;
        } else {
            this.placePiece();
        }
    }

    public rotate(): void {
        if (!this.state.currentPiece) return;

        const rotatedPiece = rotatePiece(this.state.currentPiece);
        if (this.canMove(rotatedPiece, 0, 0)) {
            this.state.currentPiece = rotatedPiece;
        }
    }

    public hardDrop(): void {
        if (!this.state.currentPiece) return;

        while (this.canMove(this.state.currentPiece, 0, 1)) {
            this.state.currentPiece.y++;
        }
        this.placePiece();
    }

    public togglePause(): void {
        this.state.paused = !this.state.paused;
    }

    public restart(): void {
        this.state = this.createInitialState();
        this.dropTimer = 0;
    }

    private canMove(piece: Piece, deltaX: number, deltaY: number): boolean {
        const newX = piece.x + deltaX;
        const newY = piece.y + deltaY;

        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const boardX = newX + x;
                    const boardY = newY + y;

                    if (boardX < 0 || boardX >= BOARD_WIDTH || 
                        boardY >= BOARD_HEIGHT || 
                        (boardY >= 0 && this.state.board[boardY][boardX])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private placePiece(): void {
        if (!this.state.currentPiece) return;

        for (let y = 0; y < this.state.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.state.currentPiece.shape[y].length; x++) {
                if (this.state.currentPiece.shape[y][x]) {
                    const boardX = this.state.currentPiece.x + x;
                    const boardY = this.state.currentPiece.y + y;

                    if (boardY >= 0) {
                        this.state.board[boardY][boardX] = 1;
                    }
                }
            }
        }

        this.clearLines();
        this.spawnNewPiece();
    }

    private clearLines(): void {
        let linesCleared = 0;

        for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
            if (this.state.board[y].every(cell => cell !== 0)) {
                this.state.board.splice(y, 1);
                this.state.board.unshift(Array(BOARD_WIDTH).fill(0));
                linesCleared++;
                y++;
            }
        }

        if (linesCleared > 0) {
            this.state.lines += linesCleared;
            this.state.score += this.calculateScore(linesCleared);
            this.state.level = Math.floor(this.state.lines / 10) + 1;
            this.dropTime = Math.max(100, 1000 - (this.state.level - 1) * 100);
        }
    }

    private calculateScore(linesCleared: number): number {
        const baseScore = [0, 40, 100, 300, 1200];
        return baseScore[linesCleared] * this.state.level;
    }

    private spawnNewPiece(): void {
        this.state.currentPiece = this.state.nextPiece;
        this.state.nextPiece = createRandomPiece();

        if (this.state.currentPiece && !this.canMove(this.state.currentPiece, 0, 0)) {
            this.state.gameOver = true;
        }
    }
}