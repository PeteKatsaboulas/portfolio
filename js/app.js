// Register 
gsap.registerPlugin(Draggable)
gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scroll
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

// Project slider
function projectSlider(){
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
}

// Hero parallax
if(window.innerWidth > 600) {
  gsap.to(".hero", {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      scrub: true
    }, 
  });
}

// Window load
let loader = document.querySelector(".loader")
loader.classList.add("load");

window.onload = () => {
  loader.style.display = "none";
  gsap.to([".headline", ".cta", ".work", ".theme__mode-toggle"], {y: 0, opacity:1, duration:0, stagger: 0.1});
  requestAnimationFrame(raf)
  projectSlider()
}

// Resize / Fix for ios trigger resize on scroll
let windowWidthResize = window.innerWidth,
    styles            = getComputedStyle(document.documentElement),   
    largeSlide        = parseInt(styles.getPropertyValue('--large-slide'), 10), 
		smallSlide        = parseInt(styles.getPropertyValue('--small-slide'), 10)

window.onresize = () => {   
	if (window.innerWidth != windowWidthResize) {
		// Update the window and slide widths
		windowWidthResize = window.innerWidth;
		gsap.to(".project__slides", {x: 0, duration: 0});  
	}        
}

// Toogle dark mode
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



    






