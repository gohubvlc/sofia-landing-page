console.log("SofiA: 👋 Hi also from console! Let's rock 🚀")

$(document).ready(function() {
    // Referencias a objetos y variables
    var logo = $(".c-sofia__logo");
    var sofia = $(".c-sofia__webgl");
    var wrapper = $(".c-sofia__wrapper");
    var title = $(".c-sofia__text h1");
    var subtitle = $(".c-sofia__text h2");
    var btn = $(".c-sofia__text a");
    var footer = $(".c-sofia__footer");
    
    // Evitamos "flickeos" iniciales
    TweenLite.set(wrapper, {visibility:"visible"});
    // Definimos la líne de tiempo
    var tl = new TimelineLite();
    // Añadimos animaciones a la línea de tiempo
    TweenLite.fromTo(sofia,1, {autoAlpha:0},{autoAlpha:1,delay:1});
   
    tl.from(logo, 0.5, { opacity: 0,  y:50, ease: Power1.easeOut });
    tl.from(title, 0.5, { opacity: 0,  y:50, ease: Power1.easeOut },"-=0.25");
    tl.from(subtitle, 0.5, { opacity: 0,  y:50, ease: Power1.easeOut },"-=0.25");
    tl.from(btn, 0.5, { opacity: 0,  y:50, ease: Power1.easeOut },"-=0.25");
    tl.from(footer, 0.5, { opacity: 0,  y:50, ease: Power1.easeOut },"-=0.25");


  
  });