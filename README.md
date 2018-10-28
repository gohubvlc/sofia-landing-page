# SofiA (Social Fire Alarm)

Promotional landing page for Sofía project. See the [Online Demo](https://gohubvlc.github.io/sofia-landing-page/dist/index.html)

It's just and approch about how to report to the citicents the existence of Sofia Project and how it works. The main target was create a brand website with high user experience level redirecting the users to the APP stores because Sofia works in the background for you while you are watching this website. 

Also show in the map the active alarms created inside Sofia and the confirmed fires obtained externally.

![](https://github.com/gohubvlc/sofia-project/raw/master/images/Web%20mockup.png)
## More info

Space App Challenge / GO:HUB | SPOT THAT FIRE! [project website](https://2018.spaceappschallenge.org/challenges/volcanoes-icebergs-and-asteroids-oh-my/real-time-fire-app/teams/gohub/project/)





## How to run the project

To implement the project just use de *dist* folder wich contains all *.html *.css *.js images and webfonts compiled and transpiled. 

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
git clone https://github.com/gohubvlc/sofia-landing-page.git
```

Navigate to the directory to where it was cloned.

```sh
cd sofia-landing-page
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
- Fontawesome 5.1 [website](https://fontawesome.com/) / [github](https://github.com/FortAwesome/Font-Awesome)
- Greenshock GSAP 2.0.1 [website](https://greensock.com/gsap) / [github](https://github.com/greensock/GreenSock-JS/)
- AOS 3.0.0 beta 4 (Animate On Scroll Library) [website](http://michalsnik.github.io/aos/) / [github](https://github.com/michalsnik/aos)
- Split Text 0.5.8 [website](http://greensock.com/club/) 
- ThreeJS 88 [website](https://threejs.org/) / [github](https://github.com/mrdoob/three.js)
- Mapbox GL JS 0.50 [website](https://www.mapbox.com//) / [github](https://github.com/mapbox/mapbox-gl-js)

