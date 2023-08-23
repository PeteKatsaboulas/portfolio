// Register 
gsap.registerPlugin(Draggable)
gsap.registerPlugin(ScrollTrigger)

// Loader
var num        = 0;
var loader     = document.getElementById("load-stuff")
var loader_num = document.getElementById("load-num");
var content    = document.getElementById("work ");

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
      loader.style.visibility = "visible";
      imgLoad(document.images[num]);
  } else {
    window.scrollTo(0, 0);
    loader.style.display = "none";
    gsap.to([".headline", ".cta", ".work"], {y: 0, opacity:1, duration:0, stagger: 0.1});
  }
};


function imgLoad(img) {
	var img_length = document.images.length ;
	img.src = img.dataset.loadsrc ||img.getAttribute("src");

  setTimeout (function(){ 
      loader_num.style.display = "block";
      loader_num.textContent = Math.ceil((num)/(img_length)*100);
      num ++;
      if(num < img_length){
        imgLoad(document.images[num]);	
      }
	},100)
}







// Lenis smooth scroll
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Project slider
let styles      = getComputedStyle(document.documentElement),
    largeSlide  = parseInt(styles.getPropertyValue('--large-slide'), 10), 
    smallSlide  = parseInt(styles.getPropertyValue('--small-slide'), 10),
    projects = document.querySelectorAll(".project")
    
projects.forEach( (project) => {
    let sections      = project.querySelectorAll(".project__slide"),
        blur          = project.querySelector(".project__blur"), 
        blurSlides    = blur.querySelector(".project__slides"),
        square        = project.querySelector(".project__square")

    let projectSlider = project.querySelector(".project__slider"),
        clone         = projectSlider.cloneNode(true)  
        square.appendChild(clone);

    let squareSlides  = square.querySelector(".project__slides")

    Draggable.create(blurSlides, {
        type: "x",
        trigger: project,
        onDrag: function() {
            gsap.to(squareSlides, {
                x: this.x * largeSlide / smallSlide,
                duration: 0,
            })
        },
        onDragEnd: function() {
          let snapped = gsap.utils.snap(smallSlide, this.x);
        
          gsap.to(blurSlides, {
            x: gsap.utils.clamp((sections.length - 1) * -smallSlide, 0, snapped) 
          })
          gsap.to(squareSlides, {
            x: gsap.utils.clamp((sections.length - 1 ) * -largeSlide, 0, snapped * largeSlide / smallSlide) 
          })
        },
        snap: {
          x: gsap.utils.snap(smallSlide / sections.length * sections.offsetWidth )
        }
    });

})

if(window.innerWidth > 600) {
  gsap.to(".hero", {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      scrub: true
    }, 
  });
}

window.onresize = () => {
  largeSlide  = parseInt(styles.getPropertyValue('--large-slide'), 10) 
  smallSlide  = parseInt(styles.getPropertyValue('--small-slide'), 10)

  gsap.to(".project__slides", {x: 0, duration: 0});
}






    






