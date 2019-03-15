# rollup-plugin-chrome-ext-reloader

WIP

## Installation

```sh
npm i rollup-plugin-chrome-ext-reloader -D
```

## Usage

```js
import { rollup } from 'rollup'
import reloader from 'rollup-plugin-chrome-ext-reloader'

rollup({
  input: 'src/manifest.json',
  output: {
    dir: 'dest',
    format: 'esm'
  },
  plugins: [reloader()]
})
```
