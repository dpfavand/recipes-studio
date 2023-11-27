import {createCliConfig} from 'sanity/cli'
import type {UserConfig} from 'vite'

export default createCliConfig({
  api: {
    projectId: '4m16m8l4',
    dataset: 'production'
  },
  vite: (config: UserConfig): UserConfig => ({
    ...config,
    define: {
      ...config.define,
      // satisfy `convert-units` package
      global: 'globalThis'
    }
  })
})
