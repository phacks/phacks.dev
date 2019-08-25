---
title: Web Performance metrics explained in a single tweet each
date: "2019-03-25T09:40:32.169Z"
template: "post"
draft: false
slug: "/posts/web-performance-metrics-explained-in-a-single-tweet-each/"
category: "Web Performance"
tags:
  - "Web Performance"
description: "A blog post adaptation of my Twitter thread explaining Web Performance metrics."
---

_Note: this blog post is an adaptation of [my Twitter thread](https://twitter.com/Phacks/status/1110161414025555968) explaining Web Performance metrics._

I noticed recently that many colleagues are not familiar with most of the Web Performance metrics. It can feel overwhelming as there are A LOT; their key differences might be difficult to catch (FP vs. FCP vs. FMP, TTI vs. FID?), and deciding which one(s) to monitor is hard.

In the next tweets, I’ll try my best to explain the most prominent metrics in a single tweet each that read as follow:

**Metric Name**<br />
⚙️ What does it measure?<br />
👩‍💻 What’s the impact on your users?<br />
⚛️ Is it useful for my technical stack?

Let’s get started!

**Load Time**<br />
⚙️ Triggered when network is quiet and page is fully loaded<br />
👩‍💻 Everything is loaded, including under-the-fold content & third party scripts (analytics, etc…)<br />
⚛️ Considered deprecated today — doesn’t really reflect how modern websites (like SPAs) work or the actual UX

**Speed Index**<br />
⚙️ Measure how fast pixels of the page reach their final position<br />
👩‍💻 Focused on what the user sees first. Penalizes websites where elements jump around while loading<br />
⚛️ Waaay better than Load Time. Relevant for all websites. Crucial for SEO

**Time To First Byte**<br />
⚙️ The time it takes for the browser to receive the first byte from the server, usually HTML<br />
👩‍💻 Not visible by the user<br />
⚛️ Particularly relevant for Server Rendered (Django) or Server-Side Rendered (NextJS) websites, where most computations happen server-side

**First Paint & First Contentful Paint**<br />
⚙️ FP is the time it takes for the first pixel to be drawn on the screen. FCP represents the first painting of a DOM element (text, image…)<br />
👩‍💻 The screen is not blank anymore.<br />
⚛️ Server-rendered and SSR websites where the HTML is big

**First Meaningful Paint**<br />
⚙️ The “hero” element of the page (a big element at the top center) is visible<br />
👩‍💻 The purpose of the user’s visit to the website is visible (tweet, video…)<br />
⚛️ All stacks. The “meaningful” element can be specified manually by using Custom Metrics

**Time To Interactive**<br />
⚙️ (Roughly) the time where CPU computations and network requests are few and far between<br />
👩‍💻 Approximates the moment where users can reliably interact without lag or jank<br />
⚛️ A must-have for SPAs (React, Vue…), although not a silver-bullet as it’s an estimate

**First Input Delay**<br />
⚙️ Similar to (but not exactly like) TTI, measures the time between the first user interaction and the page updating accordingly. Measured on PageSpeed Insights<br />
👩‍💻 When users click on something, the page responds quickly<br />
⚛️ Useful for SPAs, complements the TTI

**Lighthouse Score**<br />
⚙️ Aggregates many of the previous metrics, simulates middle-end device & poor network conditions. Measured via Dev Tools or https://web.dev/fast<br />
👩‍💻 The page overall feels fast even on 3G / your old neighbor’s desktop<br />
⚛️ Useful for all websites

**Critical Path Resource Size / Bundle Size**<br />
⚙️ Measures how many bytes of resources / JS the user needs for the page to be usable<br />
👩‍💻 A high size means poor performance & lagginess on low-end devices and slow networks<br />
⚛️ Critical for SPAs, set up a Performance Budget to keep track

That’s all, folks! Should you want to dig deeper, I recommend the following:

- WebPageTest : https://webpagetest.org
- Rendering on the Web: https://developers.google.com/web/updates/2019/02/rendering-on-the-web
- User Centric Performance Metrics: https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics
- Performance Budgets 101: https://web.dev/performance-budgets-101

And I’d also like to thank the many Web Performance peeps in here for teaching me many of that stuff, and I highly encourage you to follow them: [@hdjirdeh](https://twitter.com/hdjirdeh), [@borisschapira](https://twitter.com/borisschapira), [@theystolemynick](https://twitter.com/theystolemynick), [@patmeenan](https://twitter.com/patmeenan), [@addyosmani](https://twitter.com/addyosmani), [@WalterStephanie](https://twitter.com/WalterStephanie), [@csswizardry](https://twitter.com/csswizardry).
