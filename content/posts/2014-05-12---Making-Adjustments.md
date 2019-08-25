---
title: Making Adjustments
date: "2014-05-12T16:21:32.169Z"
template: "post"
draft: false
slug: "/posts/making-adjustments/"
category: "Personal Projects"
tags:
  - "Personal Projects"
  - "Web Development"
description: "By now, our app looks okay and works reasonably well. But we were still stuck on local testing, meaning that we couldn’t test it on mobile platforms to see what it rendered. Thus, we decided to deploy our app."
socialImage: "/media/making-adjustments/shawt-new-design.png"
---

Our app is finally up and running. In case you would like to have a sneak peek, it’s available [here](http://shawt.nicolasgoutay.fr/). _Update Aug. 2019: the site is not up and visible anymore._

The last few days were then dedicated to the daunting task of fixing the “small details”.

We have tried and enhanced the app in three directions: **Performance**, **Design** and **User Experience**.

## Improving the performance

When we first deployed the app, a single page weighted more than 800kb. That was a lot, given that the app is meant to be primarily accessed on mobile devices (i.e. data consumption and broadband speed can be a problem).

We took several decisions to try and reduce the load.

- Minifying the CSS and JS using Grunt’s `uglify` and `cssmin` routines saved us around 60kb
- Generating a custom build of JQuery UI tailored to our needs (namely, the range slider) saved us around 400kb

## Improving the design

As neither of us has any experience in graphic design, we tried to do our best to make the app as pleasant to the eye as we could — however, we know that our designer skills are limited.

![Shawt new design](/media/making-adjustments/shawt-new-design.png)

We experienced several directions to make our app look better:

- We have changed the default, Helvetica font and choosen the open source [Open Sans](http://www.google.com/fonts/specimen/Open+Sans) for better legibility.
- We changed the color palette for one we found on [ColourLovers](http://www.colourlovers.com/) which allowed us a lighter, less aggressive design

## Improving the User Experience

One of our first goals when designing the flow of the app was to make the user feel comfortable really quick with all the possibilities, while making errors (both geolocation and database errors) non-intrusive and friendly.

To achieve this we took a few actions:

- We added a tutorial. It is displayed automatically at the first visit of a new user (although it can be skipped), and is always available in tha menu
- Localisation and database errors are from now on non intrusive and explicit (“Username already taken”, “Geolocation denied by browser”, etc…)

_Originally published on [Svbtle](https://shawt.svbtle.com/deploying-our-app)._
