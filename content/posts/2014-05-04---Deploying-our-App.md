---
title: Deploying our App
date: "2014-05-04T16:21:32.169Z"
template: "post"
draft: false
slug: "/posts/deploying-our-app/"
category: "Personal Projects"
tags:
  - "Personal Projects"
  - "Web Development"
description: "By now, our app looks okay and works reasonably well. But we were still stuck on local testing, meaning that we couldn’t test it on mobile platforms to see what it rendered. Thus, we decided to deploy our app."
socialImage: "/media/deploying-our-app/nodejitsu.png"
---

By now, our app looks okay and works reasonably well. But we were still stuck on local testing, meaning that we couldn’t test it on mobile platforms to see what it rendered.

Thus, we decided to **deploy our app**.

## Hosting our app

As NodeJS is getting a wider and wider audience, more and more hosting services have emerged, the choice is now huge.

We settled on [Nodejistu](http://www.nodejitsu.com/), but we could have used others, like [Heroku](http://www.heroku.com/) or [Joyent](http://www.joyent.com/).

Nodejitsu has a great client for deploying node apps (more about that later), and offers 20\$ for new users, which is enough to host our app for this course.

Moreover, Nodejitsu has partnerships with databases providers (we used [MongoLab](http://www.mongolab.com/)) that allowed us to bootstrap MongoDB very quickly.

## Deploying our app

Here is the best part : **deploying a node app in incredibly easy**. We have been baffled by how fast and straightforward it was.

We used Nodejitsu’s `jitsu` command line interface and it only took four steps

- _Step 1_. Install `jitsu` using `npm` : `npm install jitsu -g`
- _Step 2_. Login : `jitsu login`
- _Step 3_. Get to the app directory : `cd ~/Documents/Shawt`
- _Step 4_. Deploy the app : `jitsu deploy`

And that’s it. The app is online.

And when we have changes we want to push, we just have to deploy it again.

One more reason to enjoy Node ;)

_Originally published on [Svbtle](https://shawt.svbtle.com/deploying-our-app)._
