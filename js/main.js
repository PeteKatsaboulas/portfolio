
gsap.registerPlugin(Draggable);

const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)



/*
let navLinks = document.querySelectorAll("nav a")
let infoLink = document.querySelector(".info__link")
let infoSection = document.getElementById("info")

navLinks.forEach( (link) => {
  let target = link.querySelector("span")
  let clone  = target.cloneNode(true) 
  link.appendChild(clone); 

  if( !link.classList.contains("active") ) {
    link.onmouseenter = () => {
      gsap.to( link.querySelector("span:first-child"), {y: -20, opacity: 0, duration: 0.4, ease: "power2.out"} )
      gsap.to( link.querySelector("span:last-child"), {y: -17, opacity: 1, duration: 0.4, ease: "power2.out"} )
    }
  
    link.onmouseleave = () => {
      gsap.to( link.querySelector("span:first-child"), {y: 0, opacity: 1, duration: 0.4, ease: "power2.out"} )
      gsap.to( link.querySelector("span:last-child"), {y: 0, opacity: 0, duration: 0.4, ease: "power2.out"} )
    }
  }
})

infoLink.onclick = (e) => {
  e.preventDefault();
  
  infoSection.scrollIntoView({ behavior: 'smooth'});
}
*/



let projects = document.querySelectorAll(".project")
    
projects.forEach( (project) => {

    const styles      = getComputedStyle(document.documentElement),
          largeSlide  = parseInt(styles.getPropertyValue('--large-slide'), 10), 
          smallSlide  = parseInt(styles.getPropertyValue('--small-slide'), 10)
   
    let sections      = project.querySelectorAll(".project__slide"),
        blur          = project.querySelector(".project__blur"), 
        blurSlides    = blur.querySelectorAll(".project__slides"),
        square        = project.querySelector(".project__square")

    let projectSlider = project.querySelector(".project__slider"),
        clone         = projectSlider.cloneNode(true)  
        square.appendChild(clone);

    let squareSlides  = square.querySelectorAll(".project__slides")


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



    






