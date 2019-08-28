---
title: Doubling the number of performant Apps using kaizen
date: "2018-08-08T09:40:32.169Z"
template: "post"
draft: false
slug: "/posts/doubling-the-number-of-performant-apps-using-kaizen/"
category: "Web Performance"
tags:
  - "Web Performance"
  - "Lean IT"
description: "In February, I teamed up with Kévin Jean, also a Software Architect, to improve the performance of our apps. We turned to Lean and Kaizen to make this happen."
socialImage: "/media/doubling-the-number-of-performant-apps-using-kaizen/hero-image.jpg"
---

![Two persons pair programming](/media/doubling-the-number-of-performant-apps-using-kaizen/hero-image.jpg)

Photo by [Helloquence](https://unsplash.com/photos/5fNmWej4tAA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/code?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

The consensus today is that a Web app should load in under three seconds under normal conditions. However, the fact that performance is often overlooked during development – coupled with the growing complexity of the Web – typically leads to the creation of rather slow Apps.

This is a problem that we at Theodo are very much aware of. In early 2018, nearly 80% of the applications we were working on were considered too slow. This was a pain point for our clients, and for their users.

In February, I teamed up with Kévin Jean, also a Software Architect, to improve the performance of our apps. As we both believe that lean thinking is a powerful framework for solving complex problems, our effort quickly turned into a [kaizen](http://planet-lean.com/scale-product-theodo-lean-improvement/).

## Investigating the State of the Art

Our first step was to research what the best companies out there had already achieved in terms of Web Performance. The first we looked at was Uber.

Confronted with a growing user base in emerging countries, Uber faced the challenge of delivering a streamlined user experience to entry-level devices on poor network conditions. They built [m.uber.com](https://m.uber.com), which packs the core of the Uber customer flow into a mind-bogglingly lightweight App:

![m.uber.com is an uber-performant app](/media/doubling-the-number-of-performant-apps-using-kaizen/Uber-simple-App.png)

The Uber team used skillful techniques to shrink the App’s size to a mere 50 kilobytes — a 97% reduction from the average size. A lighter App means a shorter download time, which in turn means that the user can interact with the page more quickly. This outstanding achievement was a major source of inspiration for us.

## Identifying the Performance Value Flow

For our first foray into Web Performance, Kévin and I focused on the obvious: our own projects. Using our expertise and following our intuition, we managed to code our way through to reach the three seconds threshold. However, it became clear that we had not learned anything with regards to the kaizen. Indeed, there had been no concerted effort to analyze our clients’ websites in a lean-oriented way.

Thus, we began thinking about an analytic framework that could help us analyze any website, not just our own. We tried to think of a website like it was a factory. A factory takes a customer’s order, processes it and delivers the finished good. A website takes a user interaction (clicking on a link), processes it, and delivers the result (the home page). **Our performance problem had turned into a lead-time problem**.

To analyze the lead-time, we started by identifying the value flow: what steps does a Web browser go through to go from a click to a Web page? We began by [dividing this process](http://planet-lean.com/lean-work-theodo-software-development/) into three main steps: the HTML, the Assets, and the Data. (The HTML is the basic structure of a website, the assets are what makes it pretty – like images, style, interactivity – and the data is what makes it useful, like the contents of a user’s cart in an e-commerce website.)

![First version of the Performance Value Flow](/media/doubling-the-number-of-performant-apps-using-kaizen/HTML-Assets-and-data-for-Theodo-Apps.png)

This approach looked promising, although it turned out to be too simplistic when applied to other projects: there are many reasons why the assets step might take too long. We then zoomed in further. We completed the value flow by setting up standard timings adding up to 3 seconds. (The timings were devised based on our experience and on what we learned from our state-of-the-art research.)

![Second version of the Performance Value Flow](/media/doubling-the-number-of-performant-apps-using-kaizen/Standard-timings-on-the-Web-apps-value-flow.png)

We now had a performance value flow that had the potential to show specific problems in Web applications. We set out to use it to help Theodo build faster apps.

Our Theodo colleagues came to see us for help with the performance of their own products. Their problems were similar, although the causes varied (there can be many reasons behind a slow Web page). We taught them to map out their value flows so that potential performance bottlenecks became visible:

![Examples of Value Flows of Theodo projects](/media/doubling-the-number-of-performant-apps-using-kaizen/More-value-flows-in-other-Theodo-teams.png)

Then, by researching specific issues, we began collecting information on how to fix specific parts of the flow. We turned this knowledge into standards that were associated to different parts of the value flow, to directly link solutions to problems. Of course, the more projects used the value flow, the more standards were written — in a virtuous-circle fashion.

## Reducing Waste in web apps

One advantage of the value flow is that it helps us to identify the Pareto ratio of performance. A quick look at the biggest gap between the standard timings and the actual loading times now tells us what to focus on next.

A critical step in terms of performance is typically the sixth one – “the browser downloads the assets”. This is where a heavy App causes an unsatisfactory download time.

Our kaizen showed us that developers often load libraries (reusable pieces of code developed and distributed by the community) that are not necessary to the application code, which often leads to wasteful downloads of chunks of code that will never be executed. One example of this is Lodash, a popular Javascript library that encapsulates 100+ often-used functions (it’s basically the Swiss Army knife of the Javascript developer). Say a developer needs to use the “flatten” method of the Lodash library to transform complex data structures into simpler ones. The naive way to use it would be to import it as is:

```javascript
import { flatten } from ‘lodash’; // weighs 71Kb
```

This, however, has the unexpected side effect of loading all of the 100+ Lodash functions, even though we only need to use one.

To avoid waste, a lesser-known approach to load only the specific function needed would be the following:

```javascript
import flatten from `lodash/flatten`; // weighs 2.8Kb
```

This simple trick brings a size reduction of 68Kb, enough to speed up the loading time by 1 second for a 3G user!

Today, 60% of the Theodo Web applications load in under three seconds. We have also built a knowledge base of over 10 standards, covering many performance problems.

Our next challenge is to go from being reactive (fixing apps) to proactive (making performant apps from the get-go). To get there, we will need to learn how to code right first time for optimal Web Performance… I have no doubt kaizen will show us the way.

_Originally published on [Planet Lean](https://planet-lean.com/doubling-performant-apps-using-kaizen/)._
