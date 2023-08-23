// Register 
gsap.registerPlugin(Draggable)
gsap.registerPlugin(ScrollTrigger)

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



window.onresize = () => {
  largeSlide  = parseInt(styles.getPropertyValue('--large-slide'), 10) 
  smallSlide  = parseInt(styles.getPropertyValue('--small-slide'), 10)

  gsap.to(".project__slides", {x: 0, duration: 0});
}


gsap.to(".hero", {
  yPercent: 100,
  ease: "none",
  scrollTrigger: {
    scrub: true
  }, 
});


document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
      document.querySelector("#load-stuff").style.visibility = "visible";
  } else {
    window.scrollTo(0, 0);
    document.querySelector("#load-stuff").style.display = "none";
    gsap.to([".headline", ".cta", ".work"], {y: 0, opacity:1, duration:0, stagger: 0.1});
  }
};


    






