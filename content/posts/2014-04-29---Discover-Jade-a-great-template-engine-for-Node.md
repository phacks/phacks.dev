---
title: Discover Jade, a great template engine for Node
date: "2014-04-29T09:02:12.169Z"
template: "post"
draft: false
slug: "/posts/discover-jade-a-great-template-engine-for-node/"
category: "Web Technologies"
tags:
  - "Personal Projects"
  - "Web Development"
  - "Web Technologies"
description: "Jade is a powerful tool that makes writing HTML easier than ever. We use it extensively in our project and wanted to share our experience."
socialImage: "/media/discover-jade-a-great-template-engine-for-node/jade.png"
---

Jade is a powerful tool that makes writing HTML easier than ever. We use it extensively in our project and wanted to share our experience.

![Jade logo](/media/discover-jade-a-great-template-engine-for-node/jade.png)

## What is Jade ?

<figure>
	<blockquote>
		<p>Jade is a robust, elegant, feature rich template engine for nodejs.</p>
		<footer>
			<cite>— Jade documentation</cite>
		</footer>
	</blockquote>
</figure>

A web template engine is a tool that allow developers to write simpler HTML, while adding some nice features that quickly become essential.
These templates are then rendered in standard, W3C-compliant HTML and are completely transparent to your users.

## What does it look like ?

As a simple example, this :

```pug
doctype html
html(lang="en")
    head
        title Shawt !
    body
        h1 Home page
        ul#menu
            li.menuitem Item 1
            li.menuitem Item 2
            li.menuitem Item 3
```

is rendered as :

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Shawt !</title>
  </head>
  <body>
    <h1>Home page</h1>
    <ul id="menu">
      <li class="menuitem">Item 1</li>
      <li class="menuitem">Item 2</li>
      <li class="menuitem">Item 3</li>
    </ul>
  </body>
</html>
```

## What about those features ?

Jade adds some essential features to HTML, such as conditionals, loops, and mixins.

### Conditionals

```pug
- var user = { name: 'John' }
if user
    div.welcomebox
          // Filtered inline output
          p.
              Welcome, #{user.name}
else
    div.loginbox
        form(name="login", action="/login", method="post")
              input(type="text", name="user")
              input(type="password", name="pass")
              input(type="submit", value="login")
```

is rendered as :

```html
<div class="welcomebox">
  <!-- Filtered inline output-->
  <p>Welcome, John</p>
</div>
```

### Loops

```pug
ul
    each val in [1, 2, 3, 4, 5]
        li= val
```

is rendered as :

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

### Mixins

Mixins allow developers to create snippets to reduce redundancy and increase code reusability.

```pug
//- Declaration
mixin list
    ul
        li foo
        li bar
        li baz
//- Use
+list()
+list()
```

is rendered as :

```html
<ul>
  <li>foo</li>
  <li>bar</li>
  <li>baz</li>
</ul>
<ul>
  <li>foo</li>
  <li>bar</li>
  <li>baz</li>
</ul>
```

## Great then, how do I get it ?

Jade is a great, simple tool that gives more freedom to web developers to build what they want, the way they want. We highly recommend you to try it :)

You can visit the official website [here](www.jade-lang.com), or install Jade through `npm` via `npm install jade`.

Hope this helps !

_Originally published on [Svbtle](https://shawt.svbtle.com/discover-jade-a-great-template-engine-for-node)._
