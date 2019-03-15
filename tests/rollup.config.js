/* eslint-env node */

import autoManifest from 'rollup-plugin-auto-manifest'
import manifestEntry from 'rollup-plugin-manifest-entry'
import pkg from '../package.json'

import { reloader } from '../src/index'

const plugins = [
  autoManifest({ pkg }),
  manifestEntry({
    copyManifest: false,
  }),
  reloader(),
]

export default {
  input: 'tests/fixtures/src/manifest.json',
  output: {
    dir: 'tests/fixtures/dest',
    format: 'esm',
  },
  plugins,
}
