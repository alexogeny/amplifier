import assert = require('assert')
import { getAndDeleteAmpCache, getAndDeleteAmpInQueryParams, getAndDeleteAmpViewFromUrl, redirectToCanonical } from '../src/helpers'

describe('amp query', function () {

  it('Should strip ?amp=1', function () {
    assert.equal(getAndDeleteAmpInQueryParams(
      new URL('https://t.co/abc123?amp=1')
    ), 'https://t.co/abc123')

    assert.equal(getAndDeleteAmpInQueryParams(
      new URL('https://t.co/abc123?amp=0')
    ), 'https://t.co/abc123')

    assert.equal(getAndDeleteAmpInQueryParams(
      new URL('https://t.co/abc123?nest=1&amp=1&nested=2')
    ), 'https://t.co/abc123?nest=1&nested=2')
  })

  it('Should do nothing if no amp query present', function () {
    assert.equal(getAndDeleteAmpInQueryParams(
      new URL('https://t.co/')
    ), undefined)

    assert.equal(getAndDeleteAmpInQueryParams(
      new URL('https://t.co/?')
    ), undefined)

    assert.equal(getAndDeleteAmpInQueryParams(
      new URL('https://t.co/?wasRedirected=true')
    ), undefined)
  })

})

describe('amp viewer', function () {

  it('Should remove amp view from url', function () {
    assert.equal(getAndDeleteAmpViewFromUrl(
      new URL('https://www.bing.com/amp/s/www.example.org/')
    ), 'https://www.example.org/')

    assert.equal(getAndDeleteAmpViewFromUrl(
      new URL('https://www.google.com/amp/www.example.org')
    ), 'https://www.example.org')

    assert.equal(getAndDeleteAmpViewFromUrl(
      new URL('https://www.google.com/amp/www.example.org/is-this-a-blog-post%f3')
    ), 'https://www.example.org/is-this-a-blog-post%f3')

  })

})

describe('the amp cache', function () {
  it('should remove amp cache from url', function () {
    assert.equal(getAndDeleteAmpCache(
      new URL('https://cdn.ampproject.org/c/s/www.example.org/amp/info')
    ), 'https://www.example.org/amp/info')

    assert.equal(getAndDeleteAmpCache(
      new URL('https://www-example-org.cdn.ampproject.org/c/s/www.example.org/amp/info')
    ), 'https://www.example.org/amp/info')

    assert.equal(getAndDeleteAmpCache(
      new URL('https://www-example-org.cdn.ampproject.org/c/www.example.org/amp/info')
    ), 'https://www.example.org/amp/info')

    assert.equal(getAndDeleteAmpCache(
      new URL('https://bing-amp.com/c/s/www.example.org/amp/info')
    ), 'https://www.example.org/amp/info')

    assert.equal(
      getAndDeleteAmpCache(new URL('https://www-example-org.bing-amp.com/c/www.example.org/amp/info')),
      'https://www.example.org/amp/info'
    )

    assert.equal(getAndDeleteAmpCache(
      new URL('https://www-example-org.bing-amp.com/c/s/www.example.org/amp/info')
    ), 'https://www.example.org/amp/info')

  })

  it('should do nothing if not amp cache', function () {
    assert.equal(getAndDeleteAmpCache(
      new URL('https://www.example.org/amp/info')
    ), undefined)
  })
})

describe('redirect to canonical', function () {
  it('should correctly redirect amp query', function () {
    assert.deepEqual(
      redirectToCanonical({ url: 'https://t.co/abc123?nest=1&amp=1&nested=2' }),
      { redirectUrl: 'https://t.co/abc123?nest=1&nested=2' }
    )
  })

  it('should correctly redirect amp viewer', function () {
    assert.deepEqual(
      redirectToCanonical({ url: 'https://www.google.com/amp/www.example.org/is-this-a-blog-post%f3' }),
      { redirectUrl: 'https://www.example.org/is-this-a-blog-post%f3' }
    )
  })

  it('should correctly redirect amp cache', function () {
    assert.deepEqual(
      redirectToCanonical({ url: 'https://www-example-org.cdn.ampproject.org/c/s/www.example.org/amp/info' }),
      { redirectUrl: 'https://www.example.org/amp/info' }
    )
  })

  it('should do nothing if no amp detected', function () {
    assert.equal(
      redirectToCanonical({ url: 'https://news.ycombinator.com' }),
      undefined
    )
  })
})
