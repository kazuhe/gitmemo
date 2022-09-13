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

フロントエンドの開発サーバを起動する。

```sh
pnpm run dev:client
```

これは Vite によって起動されており、API サーバは起動していないので API へのリクエストは行えない。

サーバーを起動する。

```sh
# pnpm run build を先に実行しておく必要がある
pnpm run dev:server
```

これは nodemon によって起動され、`src/server` または `src/domain` 配下を編集すると自動で再起動される。

build されたフロントエンドのリソースを静的ファイルとして読み込んで利用しており、ブラウザで UI も含め確認することができる（`pnpm run build:client` を実行しない限りフロントエンドの編集は反映されない）。

### 📦 Create and run npm package locally

ローカル環境で npm パッケージを作成して `playground` ディレクトリで実行する。

```sh
pnpm run pack
```

これは `npx gitmemo` と同じ挙動になる。

内部で `npm pack` しており環境によってはうまくいかないかもしれない。npm `ver.8.15.0` では意図した通りに動作した。

### 📂 Directory structure

オニオンアーキテクチャの思想をベースにしている。

| パッケージ名  | 役割                                                                 |
| ------------- | -------------------------------------------------------------------- |
| Commands      | コマンドラインでユーザーによって実行される                           |
| Api           | フロントエンドとやりとりをする                                       |
| Repositories  | 抽象化されたデータ永続化ロジック                                     |
| Controllers   | リクエストを元に Repository を Usecases に DI する                   |
| Usecases      | アプリケーション固有のロジック（このシステムが何をするか）を表現する |
| Domain        | ドメインオブジェクトとルール                                         |
| Components    | UI コンポーネント                                                    |
| Pages         | ページを表示する                                                     |
| Public/Assets | 画像等の静的ファイル                                                 |
| Composables   | ステートフルなロジック                                               |

![gitmemo](https://user-images.githubusercontent.com/57878514/187081863-be170b0d-2433-4c6e-9097-288e95dbb518.png)

<details>
<summary>UML</summary>

```
@startuml
rectangle src {
    rectangle Client {
        rectangle Pages
        rectangle Components
        rectangle PublicAssets
        rectangle Composables
        Components --> PublicAssets
        Components --> Composables
        Pages -> Components
        Pages -> PublicAssets
        Pages --> Composables
    }

    rectangle Server {
        rectangle Api
        rectangle Commands
        rectangle Controllers
        rectangle Repositories
        rectangle Usecases
        Controllers -> Repositories
        Commands --> Controllers
        Api --> Controllers
        Controllers --> Usecases: Repositoryを注入する
    }

    rectangle Domain

    Usecases --> Domain
    Repositories --> Domain
    Pages ---> Domain
    Components --> Domain
    Composables --> Domain
    Api ..> Client: ビルドされたリソースを参照する
}
@enduml
```

</details>
