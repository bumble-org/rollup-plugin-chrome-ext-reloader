import { rollup } from 'rollup'
import replace from 'replace-in-file'
import git from 'simple-git/promise'
import watch from '@bumble/rollup-watch-next'

import config from '../rollup.config'
import { browsers } from '../../src/index'

describe('reloader', () => {
  test('loads without crashing', async () => {
    const bundle = await rollup(config)
    const { output } = await bundle.write(config.output)

    expect(output).toBeDefined()
    expect(Object.keys(browsers).length).toBe(0)
  })
})

describe('reloader watch', () => {
  let watcher

  beforeAll(() => {
    process.env.ROLLUP_WATCH = 'true'
  })

  afterAll(() => {
    process.env.ROLLUP_WATCH = undefined
  })

  test('loads without crashing', async () => {
    watcher = watch(config)

    await watcher.next('END')

    watcher.close()
  })
})
