// Register 
gsap.registerPlugin(Draggable)
gsap.registerPlugin(ScrollTrigger)

// Window load
let loader = document.querySelector(".loader")
loader.classList.add("load");

window.onload = () => {
  loader.style.display = "none";
  gsap.to([".headline", ".cta", ".work", ".theme__mode-toggle"], {y: 0, opacity:1, duration:0, stagger: 0.1});
  requestAnimationFrame(raf);
}

// Lenis smooth scroll
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

lenis.on("scroll", function(){
  document.querySelector(".hero").style.transform = "translateY(" + window.scrollY*0.035 + "%)";

  console.log(window.scrollY)

})

let projects = document.querySelectorAll(".project")

projects.forEach( (project) => {
    let thumbs  = project.querySelectorAll(".thumb"),
        target  = project.querySelector(".slide__active-inner"),
        infoBtn = project.querySelector(".project__info-btn")
        
    target.innerHTML = thumbs[0].innerHTML

    thumbs.forEach( (thumb) => {
        let src = thumb.innerHTML
        thumb.onmouseenter = () => {
           target.innerHTML = src
           gsap.fromTo(target, {scale:1.1}, {scale:1.01, duration: 0.6, ease: "power3.out"})
        }
    })
    infoBtn.onclick = () => {
        project.classList.toggle("info")
        if(project.classList.contains("info")){
            infoBtn.textContent = "close"
        } else{
            infoBtn.textContent = "info"
        }
    }
})

// Hero parallax


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
  document.querySelector("header").classList.toggle("dark");
}



    






