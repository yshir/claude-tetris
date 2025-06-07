# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

必ず日本語で回答してください。

## Project Overview

TypeScriptで実装されたブラウザベースのテトリスゲーム。Canvas APIを使用してゲームを描画し、完全なテトリス体験を提供します。

## Development Commands

```bash
npm install          # 依存関係をインストール（TypeScript + http-server）
npm run build        # TypeScriptをコンパイル
npm run serve        # TypeScriptをコンパイルしてローカルサーバーを起動
npm run dev          # npm run serveのエイリアス
npm run watch        # ファイル変更を監視してコンパイル
```

**重要**: ES6モジュールを使用しているため、ローカルサーバー経由でアクセスする必要があります。
`npm run serve`でサーバーを起動し、ブラウザで以下にアクセス：
- http://127.0.0.1:8000
- http://localhost:8000

## Architecture

- `src/index.ts` - メインエントリーポイント、ゲームループ管理
- `src/game.ts` - コアゲームロジック（TetrisGameクラス）
- `src/pieces.ts` - テトリスピースの定義と操作
- `src/renderer.ts` - Canvas描画システム
- `src/input.ts` - キーボード入力処理
- `src/types.ts` - TypeScript型定義
- `index.html` - ゲームUI、メインHTML
- `dist/` - コンパイル済みJavaScript（自動生成）

## Game Features

- 7種類のテトリスピース（I, O, T, S, Z, J, L）
- ライン消去とスコアシステム
- レベルシステム（10ライン毎にレベルアップ）
- 次のピース表示
- 一時停止機能（Pキー）
- ゲームオーバー処理とリスタート

## Controls

- 矢印キー：移動・回転
- スペースキー：即座に落下
- Pキー：一時停止

## Important Notes

- ES6モジュールを使用しているため、ファイルをブラウザで直接開くことはできません
- 必ず`npm run serve`でローカルサーバーを起動してからアクセスしてください
- ゲームはCanvas APIを使用しており、モダンブラウザが必要です
