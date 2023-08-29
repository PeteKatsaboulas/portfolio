// ———————————————————————————————————————————————————————————————
// Loading stuff
// ———————————————————————————————————————————————————————————————
let loader = document.querySelector(".loader")

loader.classList.add("load");

window.onload = () => {
  loader.style.display = "none";
  gsap.to([".headline", ".cta", ".work", ".theme__mode-toggle"], {y: 0, opacity:1, duration:0, stagger: 0.1});
  requestAnimationFrame(raf);
}

// ———————————————————————————————————————————————————————————————
// Scrolling stuff
// ———————————————————————————————————————————————————————————————
const lenis = new Lenis()

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

lenis.on("scroll", function(){
  const header = document.querySelector("header")
      
  document.querySelector(".hero").style.transform = "translateY(" + window.scrollY*0.035 + "%)";

  if(window.scrollY > window.innerHeight){
    header.classList.add("active")
  } else{
    header.classList.remove("active")
  }
})

const logoTop = document.querySelector(".logo-top")

logoTop.onclick = () => {
  window.scrollTo({top:0, behavior: "smooth"})
}

// ———————————————————————————————————————————————————————————————
// Project stuff
// ———————————————————————————————————————————————————————————————
let projects = document.querySelectorAll(".project")

projects.forEach( (project) => {
    let thumbs  = project.querySelectorAll(".thumb"),
        featureImg  = project.querySelector(".slide__active-inner"),
        infoBtn = project.querySelector(".project__info-btn")
    // Project gallery 
    featureImg.innerHTML = thumbs[0].innerHTML
    thumbs[0].classList.add("active")

    thumbs.forEach( (thumb) => {
        thumb.onmousedown= (e) => {
           clone = thumb.cloneNode(true)
           featureImg.innerHTML = clone.innerHTML

           gsap.fromTo(featureImg, {scale:1.1}, {scale:1.01, duration: 0.6, ease: "power3.out"})

           thumbs.forEach( (thumb) => {
            thumb.classList.remove("active")
           })
           thumb.classList.add("active")
        }
    })
    // Project info reveal
    infoBtn.onmousedown = () => {
        project.classList.toggle("info")
        if(project.classList.contains("info")){
            infoBtn.textContent = "close"
        } else{
            infoBtn.textContent = "info"
        }
    }
})




    






