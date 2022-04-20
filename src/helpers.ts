export function getAndDeleteAmpInQueryParams(url: URL): string | undefined {
  if (url.searchParams.get('amp') !== null) {
    url.searchParams.delete('amp')
    return url.toString()
  }
}

export function getAndDeleteAmpViewFromUrl(url: URL): string | undefined {
  const match = /(?:google\.com|bing\.com)(?:\/amp\/)(?:s\/)?(?<canonical>.*)/.exec(url.toString())
  if (match && match.groups) {
    return `https://${match.groups.canonical}`
  }
}

export function getAndDeleteAmpCache(url: URL): string | undefined {
  if (url.host.includes('cdn.ampproject.org') || url.host.includes('bing-amp.com')) {
    if (url.pathname.startsWith('/c/s/')) {
      return `https://${url.pathname.slice(5)}`
    } else if (url.pathname.startsWith('/c/')) {
      return `https://${url.pathname.slice(3)}`
    }
  }
}


export function redirectToCanonical(requestDetails: { url: string | URL }) {
  const url = new URL(requestDetails.url)
  let amped = null
  amped = getAndDeleteAmpCache(url)
  amped = !amped ? getAndDeleteAmpViewFromUrl(url) : amped
  amped = !amped ? getAndDeleteAmpInQueryParams(url) : amped
  if (amped) {
    return { redirectUrl: amped }
  }
}

export function deAmplifyLinks() {
  if (document && document.location.host.includes('.google.')) {
    const ampUrls = document.querySelectorAll('a[ampo_url]') as unknown as Array<HTMLAnchorElement>
    ampUrls.forEach(ampUrl => {
      ampUrl.onclick = function () {
        window.stop()
        document.location.replace(this.href)
      }
    })
    const ampLinks = document.querySelectorAll('a[data-amp][data-amp-cur]') as unknown as Array<HTMLAnchorElement>
    ampLinks.forEach(link => {
      link.href = link.dataset.ampCur!
      link.dataset.map = link.dataset.ampCur
    })
  }
}

export function deAmplifyContent() {
  if (document && document.head && document.location) {
    const canonical = document.head.querySelector('link[rel=canonical]') as unknown as HTMLLinkElement
    const hasAmpScript = document.head.querySelector('script[src*="cdn.ampproject.org"]') !== null
    if (canonical.href !== document.location.href && hasAmpScript) {
      document.location.replace(canonical.href)
    }
  }
}
