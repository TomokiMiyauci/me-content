---
title: ViteでVue3のTypescript環境を構築する
description: No bundleツールのViteを使って、TypescriptでのVue3環境を構築します。ESLintやPrettierの設定もあわせて行い、DXの高い環境を構築します。
published_at: 2021-03-11
slug: vite-vue3-typescript
language: ja
cover_image: /posts/vite_vue3_typescript/hero.png
---

## はじめに

Vite は Vue.js の作者の Evan You 氏が開発しているビルドツールです。 ネイティブの
ES Module
のインポートを利用し、バンドル不要で高速に動作する開発環境を提供します。 Vue3
はもちろん、React や Preact も対応しています。

今回はそんな Vite を使って、Vue3 プロジェクトの環境構築をします。

できあがったテンプレートは[こちら](https://github.com/TomokiMiyauci/vite-vue3-template)にあります。

## やること

vue/cli の default
テンプレートに近づけることを目標に、最低限開発に必要なツールを導入していきます。
ツールを個別に導入できるよう、それぞれ順を追って説明しています。

- ~~Typescript~~
- ESLint
- Prettier
- Stylelint
- husky と lint-staged
- Path Alias
- vue-tsc

## 環境構築

次のバージョンで検証されました。

```bash
@vitejs/create-app@2.4.5
```

まずは、vite のテンプレートを展開しましょう。

```bash
npm init @vitejs/app <project-name> -- --template vue-ts
cd <project-name>
npm i
```

開発サーバーを立ち上げるとその速さに感動します。

:arrow_heading_down: この作業は不要になりました。

### ~~Typescript にする~~

~~続いてプロジェクトを Typescript 化しましょう。といっても Vue3
からはデフォルトで Typescript が使えるので次の３つを行うだけです。~~

~~1.すべての`.vue`ファイルの`script`タグに`lang="ts"`を追記します。 2.`main.js`を`main.ts`に変更します。 3.`index.html`の
script タグの src を`/src/main.ts`に変更します。~~

~~これで開発サーバーを立ち上げると、問題なく実行できるのが確認できます。~~

~~実際はこれだけでも動きますが、エディター上でのユーザーエクスペリエンスを向上させるために、さらに設定を加えます。~~

~~VSCode を使っている場合は、`main.ts`で`ts(2307)` エラーが出ているはずです。~~

~~これを解消するには、vue 用の型宣言ファイルを用意します。~~

src/shims-vue.d.ts

```ts
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    unknown
  >;
  export default component;
}
```

tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "/@/*": [ // /から始まるようにします
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

~~これで Typescript 化は終了です。~~

### ESLint を導入する

リンターのない開発は厳しいので、必ず導入しましょう。

```bash
npm i -D eslint eslint-plugin-vue @vue/eslint-config-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

.eslintrc

```json
{
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2021
  },
  "plugins": [],
  "rules": {
  }
}
```

これではエラーになってしまうので、型定義を修正します。

src/shims-vue.d.ts

```ts
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    unknown
  >;
  export default component;
}
```

`package.json`の`script`にリント用のコマンドを用意するとのちのち楽です。

package.json

```json
"scripts": {
  "lint:script": "eslint --ext .ts,vue --ignore-path .gitignore ."
}
```

個人的には、fix
したくない場面もあるので、`--fix`は外から付けるようにしています。

さてこれを実行させましょう。

```bash
npm run lint:script --fix
```

VSCode
ユーザーは以下の設定もすることで、自動フォーマットを効かせることができます。
ESLint
の拡張が必要なので、なければ[ここを参考に](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)インストールしてください。

.vscode/settings.json

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  }
}
```

これによって保存時にフォーマットできました。

### husky と lint-staged を設定する

コミット前に、静的チェックを走らせ、エラーコードをコミットできない仕組みにしましょう。

```bash
npm i -D husky lint-staged
```

`package.json`に次を追加します。

package.json

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,vue}": "eslint --fix"
  }
}
```

これによって、コミット前にコミットファイルのうち該当する拡張子のファイルに対し、ESLint
が走ります。

もちろんリントエラーの場合はコミットがキャンセルされます。

### Prettier を設定する

Prettier にプロジェクト全体のフォーマットを任せましょう。 また、Typescript
のコードでは、セミコロンは視認性が悪くなるため、Prettier
で自動的に削除しましょう。

```bash
npm i -D prettier eslint-plugin-prettier @vue/eslint-config-prettier
```

.prettierrc

```json
{
  "singleQuote": true,
  "semi": false,
  "vueIndentScriptAndStyle": true
}
```

ESLint と Prettier
を併用する場合、ルールのバッティングがあるため、`.eslintrc`を修正します。

.eslintrc

```json
{
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    // 他のルールの下に追加
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ]
}
```

コマンドによってフォーマッターを実行できます。

```bash
npm run prettier -w -u .
```

コミット前に自動フォーマットを適用させたいので、`lint-staged`にその設定を加えます。

package.json

```json
{
  "lint-staged": {
    "*.{ts,vue}": "eslint --fix",
    "*": "prettier -w -u" // prettierは一番最後にします
  }
}
```

VSCode ユーザーは次の設定によって、自動的にフォーマットできます。
また、例によって拡張が必要なので、なければ[こちらを参考に](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)インストールしてください。

.vscode/settings.json

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### Stylelint を設定する

スタイルもリント対象にしましょう。

```bash
npm i -D stylelint stylelint-config-recommended stylelint-config-standard
```

.stylelintrc

```json
{
  "extends": ["stylelint-config-recommended", "stylelint-config-standard"]
}
```

`package.json`を編集して、コマンドと lint-staged を設定します。

package.json

```json
{
  "scripts": {
    "lint:style": "stylelint src/**/*.{css,scss,vue}"
  },
  "lint-staged": {
    "*.{ts,tsx}": "eslint --fix",
    "*.{css,scss,vue}": "stylelint --fix",
    "*": "prettier -w -u"
  }
}
```

VSCode ユーザーは次の設定によって、自動的にフォーマットできます。
拡張が必要なので、なければ[こちらを参考に](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)インストールしてください。

長くなりましたがこれでリンターとフォーマッターの基本的な設定は終了です。

### Path Alias を設定する

モジュールの import はデフォルトでは相対パスを指定しますが、alias
を設定して常に同じルートを参照したいです。

vite.config.ts

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [vue()],
});
```

また、 `tsconfig.json` も設定します。

tsconfig.json

```json
{
  "compilerOptions": {
    //...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

これで alias の設定ができました。こんな感じで使います。

App.vue

```html
<script lang="ts">
  import HelloWorld from "@/components/HelloWorld.vue";
</script>
```

### vue-tsc で template の静的チェックをする

`vue-tsc` で template タグへも静的チェックを行えます。
テンプレート生成時にインストールされていますが、`@vue/runtime-dom@3.1.4`
の時点では、 `tsconfig.json`の `skipLibCheck` が `true`
になっていないと動作しません。

tsconfig.json

```json
{
  "compilerOptions": {
    //...
    "skipLibCheck": true
  }
}
```

package.json

```json
{
  "scripts": {
    //...
    "lint:markup": "vue-tsc --noEmit"
  }
}
```

これは `@vue/runtime-dom`
の型定義にエラーがあるのでそれを回避する目的で行います。

また、静的チェックは Vue
ファイルが増加するとかなり時間がかかるようになるため、コミット前ではなく CI
で実行することをおすすめします。

以上で最低限の環境が構築できました。
