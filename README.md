# amplifier

an extension to redirect to canonical pages. inspired by brave and by https://github.com/da2x/amp2html/

this works across the entire web instead of just focusing on bing and google

of course if another entity starts building an amp cache that will need to be added to the list of known amp caches

what this addon DOES

- redirects all bing and google amp cache urls to their canonical site
- redirect any `/amp/` views to the canonical page
- strip any `?amp=x` query parameters from pages you navigate to
- keep a count of how many amp redirects you've ever done
- introduce an imperceptible amount of latency when loading pages
- reads some page content on google news and google search (to intercept amp links)

what this addon DOES NOT

- care about the domain (i.e. will work on pages not specific to google)
- collect any data (even in local storage)

## todos

- add a counter to the extension icon for total number of amp links fixed
- add all time counter for amp links fixed

## getting started

`git clone git@github.com:alexogeny/amplified`

`npm install` from inside the package folder

## testing

you can either: `npm run test`

or with coverage: `npm run test:coverage`

## building from source

to compile the ts to js: `npm run build`

then in firefox: `about:debugging` -> `This Firefox` -> `Load Temporary Addon` -> select `manifest.json`

## creating an extension file to install

instead of the above, run: `npm run build:ext`

## credits

icon courtesy flaticon: <a href="https://www.flaticon.com/free-icons/energy" title="energy icons">Energy icons created by Freepik - Flaticon</a>
