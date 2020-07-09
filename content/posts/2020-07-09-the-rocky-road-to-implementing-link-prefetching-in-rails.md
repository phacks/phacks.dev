---
template: post
title: The rocky road to implementing link prefetching in Rails
slug: the-rocky-road-to-implementing-link-prefetching-in-rails
draft: true
date: 2020-07-09T12:44:49.281Z
description: >-
  I set up to implement link prefetching in our Ruby on Rails application, and
  boy was it a wild ride. Buckle up!
category: Web Performance
tags:
  - Web Performance
---
_Cover image credits: Photo by [Melanie Dretvic](https://unsplash.com/@designwilde?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/rocky-road?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)_

Web performance matters for many reasons: a [better](https://developers.google.com/web/fundamentals/performance/why-performance-matters), [more inclusive](http://marcysutton.github.io/a11y-perf/#/) user experience; less [waste](https://timkadlec.com/remembers/2019-01-09-the-ethics-of-performance/) of resources (your user’s devices will thank you); and an increase in business metrics like [conversion](https://blog.dareboost.com/en/2018/08/continuous-improvement-web-performance-dareboost-m6web/), [SEO traffic](https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7#.wwimdmkpp), and even [revenue](https://jobs.zalando.com/tech/blog/loading-time-matters/index.html).

It also happens that it is one of my favorite technical topics, and I fell down the rabbit hole of optimizations (and got to talk about it) [more](https://youtu.be/p14g-Sep7HY) [than](https://www.youtube.com/watch?v=m3XL0LVJaUo) [one](https://www.youtube.com/watch?v=wMaJ8sCuZcg) time.

Yesterday, I found a new itch I had to scratch, and it all started by the release of InstantPage v5 by [Alexandre Dieulot](https://twitter.com/Dieulot).

https://twitter.com/Dieulot/status/1261665346030895105

[Instant Page](https://instant.page/) has a very enticing promise: what if, by dropping a _single line of code_ into your app, you could make it _feel instant_?

InstantPage achieves this by using a technique called _[link prefetching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ)_. Traditionally, a website loads the HTML contents of a new page when the user has clicked on its link. InstantPage takes full advantage of the fact that to click a link, the user has to get there, and usually spends a few hundred milliseconds _hovering_ on it. By triggering the page load on _hover_, instead of on _click_, we can shave off those few hundred milliseconds of load time, making the transition to the new page _feel instant_.

You can see this pattern in action on this very website, [dev.to](https://dev.to)! Feels fast, doesn't it?

So I set up to implement that in our Ruby on Rails application, and boy was it a wild ride. Buckle up!

_Note: Although my engineering background is heavily leaning on JavaScript, I joined the fine folks at [Orbit](https://orbit.love) a few weeks ago and this is my first experience with Ruby on Rails. So please, if I made a mistake somewhere, or missed an opportunity for a more idiomatic solution, let me know in the comments! Consider this my first attempt to [#LearnInPublic](https://www.swyx.io/writing/learn-in-public/)._

# The naive approach: using InstantPage itself

So, InstantPage says that a _single line of code_ can make this work. Well… in our case, it didn’t. I could see the prefetching happen in the DevTools, but clicking on a link resulted in the same experience as before.

It turns out that InstantPage and Turbolinks (Rails integrated library to make navigation faster and Single Page App-like) do not pair well together: 

{% github https://github.com/instantpage/instant.page/issues/52#issuecomment-541359775 %}

Damn. Well, maybe Turbolinks already solved that problem and I don’t even need InstantPage?

# A prefetching solution based on Turbolinks

A quick search in the Turbolinks repository issues showed that I was not the first one to want link prefetching:

{% github https://github.com/turbolinks/turbolinks/issues/313 %}

Reading through that 50+ comments discussion (!), I found that GitHub user 
[hopsoft](https://github.com/hopsoft) helpfully shared a [gist](https://gist.github.com/hopsoft/ab500a3b584e2878c83137cb539abb32) implementing a link prefetching strategy leaning on Turbolinks cache.

We’re making progress! I can see the prefetch request going out as I hover a link, and the navigation after I click feels faster.

However… I was not 100% convinced by this approach. Leveraging Turbolinks cache meant relying on Turbolinks _preview_ behavior: if a page is warm in the cache, then Turbolinks will show that cached version as a _preview_ (a static, non-interactive version) and then trigger a new request, using its results to _really_ update the page.

With that in mind, this solution had the drawback of making *two* requests:

- One on hover, which would warm Turbolinks cache;
- One on click, which would be displayed after “flashing” the cached version.

This seemed a bit wasteful, as there was a very small chance that those two requests would differ—they were triggered a few hundred milliseconds apart after all.

Back to the drawing board!

# Getting closer with InstantClick, InstantPage’s predecessor

In the GitHub comment highlighted previously, Alexandre piqued my curiosity:

> I also plan to make an alternative to Turbolinks that uses them (in fact I already did so with InstantClick, but it lacks good documentation and a bunch of other things, I plan to reboot it).

Undeterred by the lack of documentation (I can’t decide if that’s brave or just plain dumb), I set out to try InstantClick and see if it could solve that duplicate request issue.

The [InstantClick repository](https://github.com/dieulot/instantclick) is pretty straightforward: an `instantclick.js` file that implements link prefetching, and a `loading-indicator.js` file that takes care of showing a _fake_ loading indicator if a page load takes too long. _Fake_ because it doesn’t reflect the real progress of the page, it just goes forward until the page finishes loading. This is a technique used by GitHub and dev.to that is easy to set up and is _good enough_ for the vast majority of use cases, so that’ll do!

I copied and pasted both those files, and after a bit of Rails plumbing (I had to remove Turbolinks as it was clashing with InstantClick) and fixing some problems with React and forms (more on that later), it was all set up.

And… it worked!

Prefetching happened on hover, and no extra request went off on click. The app felt _much_ faster, with most page transitions appearing _instant_. Happy times!

However, I noticed something off: hovering the same link multiple times triggered multiple requests. Again, this seemed a bit wasteful! I was curious about whether dev.to showed this behavior (they use a custom implementation of InstantClick). I fired up the Dev Tools on this very website, and lo and behold, it didn’t. Meaning that they found a way to fix it.

How? Well, let’s find out!

# The beauty of Open Source: diving into dev.to’s codebase

The dev.to codebase is open source (which, by the way, is awesome), which meant that the solution to my problem was somewhere in the [repository](https://github.com/thepracticaldev/dev.to). 

A quick GitHub in-repository search for `InstantClick` led me directly to their [custom implementation](https://github.com/thepracticaldev/dev.to/blob/2d26318cf96c0f1c5c2e827b74bbfa6d27d292d3/app/assets/javascripts/base.js.erb) which, to my surprise, was quite heavily integrated with their codebase. So copy-pasting the whole file wasn’t an option, and I had to put on my detective hat and figure out what is going on.

I knew I was looking at some kind of cache pattern, so I tried and find the method that was responsible for making HTTP requests—I figured that that method would check whether the results were already in said cache. 

That was a hit!

The dev.to folks added a variable `$fetchedBodies` to InstantClick code that would save the URL, title, and body of any preload, which would then be available as a cache for subsequent requests.

Here is a simplified representation of that mechanism:

```javascript
var $fetchedBodies = {}

function processXHR(xhr, url) {
  // Makes the XHR call, the response body and title are available
  // Use that response to add a new cache entry
  $fetchedBodies[url] = {body:body, title:title};
}

function preload(url) {
  // Responsible for preloading URLs
  // If the URL is already in the cache, then do not make the request
  if (!$fetchedBodies[url]){
    $url = url
    $xhr.open('GET', internalUrl)
    $xhr.send()
  }
}

function removeExpiredKeys(option) {
  // Handles the cache expiration
  if ( Object.keys($fetchedBodies).length > 13 || option == "force" ) {
    $fetchedBodies = {};
  }
}
```

Once I felt I had sufficiently grasped how it worked on dev.to, I ported it to our codebase, nearly as is. The only difference is in the cache expiration mechanism, where we forced an expiration with `removeExpiredKeys("force")` after each navigation to make sure that users do not see stale versions of a page.

Hurrah! No more multiple requests if a user hovers the same link multiple times. We just got ourselves a working, optimized, and mobile-friendly link prefetching implementation in Rails.

# Getting it to work with React and interactive navigations

As mentioned previously, we had a bit more work to do to make InstantClick work with our existing app. In case it might help anyone else, I’m going to go over those bumps in the road and the fix we found.

First, it appeared that our React components were broken after navigating a link. According to [this issue](https://github.com/reactjs/react-rails/issues/1053), React Rails do not automatically mount components when using prefetched links and we had to do that ourselves by calling `ReactRailsUJS.mountComponents()` in the JS initialization step.

Second, after the initial move to InstantClick some of table filtering/searching features stopped working, because they relied on programmatically tell Turbolinks to visit a URL with the proper query params:

```html
<select onchange="if(event.target.value) Turbolinks.visit(event.target.value);")>…</select>
```

The InstantClick source code does not provide a method to navigate to a given URL. Luckily, [this GitHub comment](https://github.com/dieulot/instantclick/issues/97#issuecomment-284716200) offered a clever solution: have JavaScript create a new link in the DOM with that URL and click on it. 

```javascript
InstantClick.go = function(url) {
  var link = document.createElement('a');
  link.href = url;
  document.body.appendChild(link);
  link.click();
}
```

We can now change the previous HTML code into this:

```html
<select onchange="if(event.target.value) InstantClick.go(event.target.value);")>…</select>
```

Unfortunately… this crashes the JS of the page: the console tells us that `InstantClick` is undefined. The workaround to _that_ [came from Stack Overflow](https://stackoverflow.com/a/61133205), and required some Webpack black magic to make `InstantClick` available as a global variable:

```javascript
// in webpack.environment.js

// run yarn add --dev expose-loader exports-loader beforehand

const { environment } = require("@rails/webpacker");

const webpack = require("webpack");

environment.loaders.append("InstantClick", {
  test: /instantclick/,
  use: [
    {
      loader: "expose-loader",
      options: "InstantClick",
    },
    {
      loader: "exports-loader",
      options: "InstantClick",
    },
  ],
});

module.exports = environment;
```

It took many different helpful answers from around the internet, but all our problems are now solved!

# Going further

Our custom InstantClick setup is available as a [gist](https://gist.github.com/phacks/9be4a4ceb27e51f60f7670f28e7f5280), feel free to use it!

We are pretty happy with our implementation for now, but it is important to point out that it can be improved even further:

- Featured in the tweet that sparked all this (but absent from our implementation), the new release of InstantPage uses a clever trick: trigger the click event on `mousedown`, instead of the usual `mousedown` then `mouseup`. While this is promising in terms of perceived performance, I’m curious to hear about people’s reaction to this change in such a foundational experience as a _click_;
- Our implementation does not respect the [`Save Data` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Save-Data), which might be an issue for users looking to reduce their bandwidth consumption (e.g. when traveling abroad);
- [Guess.js](https://guess-js.github.io/) is a library that takes this whole idea of link prefetching one step further: using your analytics data and machine learning, it prefetches links the user is _most likely to click on next_. Ain’t that amazing?

Thanks for reading!
