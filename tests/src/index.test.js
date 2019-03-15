import watch from '@bumble/rollup-watch-next'
import { rollup } from 'rollup'
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
  beforeEach(() => {
    process.env.ROLLUP_WATCH = 'true'
  })

  afterEach(() => {
    delete process.env.ROLLUP_WATCH
  })

  test('loads without crashing', async () => {
    const watcher = watch(config)

    await watcher.next('END')

    watcher.close()
  })
})
