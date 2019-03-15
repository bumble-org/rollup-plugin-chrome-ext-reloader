import loadExt from '@bumble/chrome-ext-loader'
import nodeCleanup from 'node-cleanup'
import nanoid from 'nanoid'

const closeEvent = 'rollup-watch:close'

export const browsers = {}

export const reloader = () => {
  let extPath
  let browser
  let extPage

  return {
    name: 'chrome-ext-reloader',

    outputOptions({ dir }) {
      if (!dir) {
        throw new Error(
          'chrome-ext-reloader: output.dir must be defined',
        )
      }

      extPath = dir
    },

    async writeBundle() {
      console.count('writeBundle')
      if (!process.env.ROLLUP_WATCH) {
        console.count('writeBundle not watch')
        return null
      }

      if (extPage && browser) {
        console.count('writeBundle reload')
        // TODO: validate manifest.json before reload
        return extPage.evaluate(() => {
          chrome.runtime.reload()
        })
      }

      const loaded = await loadExt(extPath)
      browser = loaded.browser
      extPage = loaded.extension

      const id = nanoid()
      browsers[id] = browser

      const cleanup = (exitCode, signal) => {
        browser
          .close()
          .then(() => delete browsers[id])
          .then(
            () => signal && process.kill(process.pid, signal),
          )

        nodeCleanup.uninstall()
        return false
      }

      // Close browser on rollup-watch-next event
      process.on(closeEvent, cleanup)

      // TODO: handle browser closed externally.
      // TODO: handle extension crash
      nodeCleanup(cleanup)
    },
  }
}
