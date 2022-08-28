[![](https://img.shields.io/npm/v/gitmemo.svg)](https://www.npmjs.com/package/gitmemo)
![](https://img.shields.io/npm/l/gitmemo.svg)

# GitMemo

## Development

### 🔌 Setup

pnpm を利用して依存関係をインストールする。

```sh
pnpm install
```

### 🔧 Start dev server

フロントエンドの開発サーバを起動する。これは Vite によって起動されており、API サーバは起動していないので API へのリクエストは行えない。

```sh
pnpm run dev:client
```

サーバーを起動する。これは nodemon によって起動され、`src/server` 配下を編集すると自動で再起動される。

build されたフロントエンドのリソースを静的ファイルとして読み込んで利用しており、ブラウザで UI も含め確認することができる（`pnpm run build:client` を実行しない限りフロントエンドの編集は反映されない）。

```sh
# pnpm run build を先に実行しておく必要がある
pnpm run dev:server
```

### 📦 Create and run npm package locally

ローカル環境で npm パッケージを作成して `playground` ディレクトリで実行する。

```sh
pnpm run pack
```

これは `npx gitmemo` と同じ挙動になる。

内部で `npm pack` しており環境によってはうまくいかないかもしれない。`npm -v` => `8.15.0` では意図した通りに動作した。
