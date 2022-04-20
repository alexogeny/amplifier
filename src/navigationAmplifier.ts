import { browser } from 'webextension-polyfill-ts'
import { redirectToCanonical } from './helpers'
const isBrowser = typeof browser !== 'undefined'

if (isBrowser) {
  browser.webRequest.onBeforeRequest.addListener(
    redirectToCanonical,
    {
      urls: ["*://*/*"]
    },
    ["blocking"]
  )
}
