export interface Position {
    x: number;
    y: number;
}

export interface Piece {
    shape: number[][];
    color: string;
    x: number;
    y: number;
}

export interface GameState {
    board: number[][];
    currentPiece: Piece | null;
    nextPiece: Piece | null;
    score: number;
    level: number;
    lines: number;
    gameOver: boolean;
    paused: boolean;
}

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const CELL_SIZE = 30;