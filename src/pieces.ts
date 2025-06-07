import { Piece } from './types.js';

export const PIECE_SHAPES: number[][][] = [
    // I-piece
    [
        [1, 1, 1, 1]
    ],
    // O-piece
    [
        [1, 1],
        [1, 1]
    ],
    // T-piece
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    // S-piece
    [
        [0, 1, 1],
        [1, 1, 0]
    ],
    // Z-piece
    [
        [1, 1, 0],
        [0, 1, 1]
    ],
    // J-piece
    [
        [1, 0, 0],
        [1, 1, 1]
    ],
    // L-piece
    [
        [0, 0, 1],
        [1, 1, 1]
    ]
];

export const PIECE_COLORS = [
    '#00f5ff', // I-piece (cyan)
    '#ffff00', // O-piece (yellow)
    '#8000ff', // T-piece (purple)
    '#00ff00', // S-piece (green)
    '#ff0000', // Z-piece (red)
    '#0000ff', // J-piece (blue)
    '#ff8000'  // L-piece (orange)
];

export function createRandomPiece(): Piece {
    const pieceIndex = Math.floor(Math.random() * PIECE_SHAPES.length);
    return {
        shape: PIECE_SHAPES[pieceIndex],
        color: PIECE_COLORS[pieceIndex],
        x: Math.floor((10 - PIECE_SHAPES[pieceIndex][0].length) / 2),
        y: 0
    };
}

export function rotatePiece(piece: Piece): Piece {
    const rotated = piece.shape[0].map((_, index) =>
        piece.shape.map(row => row[index]).reverse()
    );
    
    return {
        ...piece,
        shape: rotated
    };
}