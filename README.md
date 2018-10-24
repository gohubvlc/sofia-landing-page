# Frontend AXIS IDE

A static full site with AXIS IDE project for CMS integration. To implement the project just use de *dist* folder wich contains all *.html *.css *.js images and webfonts compiled and transpiled. 

SRC includes:
* Sass/SCSS transpiling from ./src/scss/main.scss and partials to ./dist/css/main.css
* Handlebars templating from ./src/*.hbs and ./src/partials/**/*.hbs to ./dist/*.html
* ES6 minification & bundling from any ./src/js/*.js to ./dist/js/bundle.js
* Live injection/reload with BrowserSync 
* Images transfer from ./src/images to ./dist/images
* Webfonts transfer from ./src/webfonts to ./dist/webfonts
* Downloads files transfer from ./src/downloads to ./dist/downloads
* PHP files transfer from ./src/php to ./dist/php
* JS libs transfer from ./src/js/libs to ./dist/js/libs
* CSS libs transfer from ./src/css/libs to ./dist/css/libs

### Getting Started

Clone the repo using `git clone` or by clicking the *Download ZIP* button to the right.

```sh
git clone http://cd-gitlab.globalomnium.com/joseluisgj/frontend-axis-ide
```

Navigate to the directory to where it was cloned.

```sh
cd frontend-axis-ide
```

Install all dependencies using npm:

```sh
npm install
```

Run the default Gulp task to get started:

```sh
gulp
```

BrowserSync will automagically inject any changes you make to the stylesheets. You can view the website at one of the given access URLs:

```sh
[BS] Access URLs:
 ----------------------------------
       Local: http://localhost:3000
    External: http://10.0.X.XX:3000
 ----------------------------------
```



### Libraries used

- Bootstrap 4.1 [website](https://getbootstrap.com/) / [github](https://github.com/twbs/bootstrap)
- jQuery 3.3.1 [website](https://jquery.com/) / [github](https://github.com/jquery/jquery)
- Fontawesome 5.1 Pro (With Global Omnium licence) [website](https://fontawesome.com/) / [github](https://github.com/FortAwesome/Font-Awesome)
- Greenshock GSAP 2.0.1 [website](https://greensock.com/gsap) / [github](https://github.com/greensock/GreenSock-JS/)
- AOS 3.0.0 beta 4 (Animate On Scroll Library) [website](http://michalsnik.github.io/aos/) / [github](https://github.com/michalsnik/aos)
- Split Text 0.5.8 [website](http://greensock.com/club/) 
- Highlight.js 9.12.0 (Syntax highlighting for the Web) [website](hhttps://highlightjs.org/) 
- Clipboard.js 2.0 (A modern approach to copy text to clipboard) [website](https://clipboardjs.com/) 
- Perfect-scrollbar 1.4 (Minimalistic but perfect custom scrollbar plugin) [website](https://github.com/utatti/perfect-scrollbar/) 

