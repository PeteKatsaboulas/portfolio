// Register 
gsap.registerPlugin(Draggable)
gsap.registerPlugin(ScrollTrigger)

// Loader
//var loader = document.getElementById("load-stuff")

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
      //loader.style.visibility = "visible";
      console.log("loading...")
  } else {
    window.scrollTo(0, 0);
    //loader.style.display = "none";
    gsap.to([".headline", ".cta", ".work"], {y: 0, opacity:1, duration:0, stagger: 0.1});

    console.log("loaded!")
  }
};


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
    projects    = document.querySelectorAll(".project")
    
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


 
let windowWidthResize = window.innerWidth;

window.onresize = () => {   
    if (window.innerWidth != windowWidthResize) {
        // Update the window and slide widths
        windowWidthResize = window.innerWidth;
        largeSlide  = parseInt(styles.getPropertyValue('--large-slide'), 10) 
        smallSlide  = parseInt(styles.getPropertyValue('--small-slide'), 10)

        gsap.to(".project__slides", {x: 0, duration: 0});
        
    }        
}

let toggleTheme    = document.querySelector(".theme__mode-toggle")
let toggleThemeBtn = document.querySelector(".toggle-btn")

toggleTheme.onclick = () => {
  let theme = document.body.getAttribute("data-theme")

  if(theme == "light") {
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.body.setAttribute("data-theme", "light");
  }

  toggleTheme.classList.toggle("active");

}





    






