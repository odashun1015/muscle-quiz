# CLAUDE.md

・日本語で会話をしてください

このファイルは、このリポジトリでClaude Code (claude.ai/code) が作業する際のガイダンスを提供します。

## コマンド

- **開発サーバー**: `npm run dev` (Vite開発サーバーを http://localhost:5173 で起動)
- **ビルド**: `npm run build` (型チェックとビルドを並行実行)
- **型チェック**: `npm run type-check` (vue-tsc --build を実行)
- **ビルドのみ**: `npm run build-only` (型チェックなしでvite buildを実行)
- **プレビュー**: `npm run preview` (ビルド済みアプリケーションをローカルで配信)

## アーキテクチャ

これはViteで構築されたVue 3 + TypeScriptの筋肉解剖学クイズアプリケーションです。インタラクティブなSVGベースの人体図を通じて人体解剖学を学習できます。

### コア構造

- **状態管理**: Vue 3 Composition APIを使用し、すべてのゲーム状態を管理する`useQuizGame`コンポーザブルで集中管理
- **画面遷移**: `gameState.currentScreen`で管理される3つの主要画面（`title`、`game`、`result`）を持つSPA
- **クイズロジック**: 問題生成、回答検証、スコア計算は`src/composables/useQuizGame.ts`で処理
- **データ**: 筋肉情報は`src/data/muscles.json`に保存され、5つのカテゴリ（upper、lower、core、arm、leg）に分類された34の筋肉データ

### 主要コンポーネント

- **TitleScreen**: ゲーム設定（問題数、カテゴリフィルター、選択肢数）
- **GameScreen**: SVG人体図と多肢選択回答を含むメインクイズインターフェース
- **ResultScreen**: スコア表示と間違った問題の復習
- **MuscleCanvas**: インタラクティブな筋肉ハイライト機能付きSVGベース人体図
- **QuizOptions**: 視覚的フィードバック付き多肢選択回答インターフェース

### TypeScript型定義

すべての型は`src/types/index.ts`で定義：
- `Muscle`: 個別の筋肉データ構造
- `QuizSettings`: クイズカスタマイズ用設定オプション
- `QuizQuestion`: 筋肉、選択肢、正解を含む問題
- `GameState`: 完全なアプリケーション状態管理

### 設定

- **Vite設定**: GitHub Pagesデプロイメント用に条件付きベースパスで設定
- **TypeScript**: Vue 3 Composition APIサポート付き厳密モード
- **エイリアス**: `@`は`src/`ディレクトリにマップ
- **ビルド**: `dist/`ディレクトリに出力

このアプリケーションは教育用に設計されており、各筋肉の詳細な説明付きでカスタマイズ可能なクイズセッションをサポートしています。