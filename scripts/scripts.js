/////// nav bar ///////

const nav = document.querySelector(".navWrapper");
const hamburger = document.querySelector(".humberger");
const xMark = document.querySelector(".xMark");
const blackBg = document.querySelector(".blackBg");

hamburger.addEventListener('click', function () {
    nav.classList.toggle('open');
});

blackBg.addEventListener('click', function () {
    nav.classList.remove('open');
});

xMark.addEventListener('click', function () {
    nav.classList.remove('open');
});


/////// fade in when scrolling down ///////

let fadeInElm = document.querySelectorAll(".scrollFadeIn");
fadeInElm.forEach(function(fadeIn) {
    let windowHeight = window.innerHeight;

    window.addEventListener('scroll', function() {
        let offset = fadeIn.getBoundingClientRect().top;
        let scroll = window.screenY;

        if(scroll > offset - windowHeight + 100) {
            fadeIn.classList.add("scrollIn");
        } else {
            fadeIn.classList.remove("scrollIn");
        }
    })
})

/////// carousel ///////
const slideWrapper = document.querySelector('.carouselItems');
const slides = Array.from(slideWrapper.children);
const nextBtn = document.querySelector('.rightBtn');
const prevBtn = document.querySelector('.leftBtn');
const dotsNav = document.querySelector('.carouselNav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;
var currentWidth = window.innerWidth;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

// Reusable functions
const moveToSlide = (slideWrapper, currentSlide, targetSlide) => {
    slideWrapper.style.transform =  'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('currentSlide');
    targetSlide.classList.add('currentSlide');
  }
  
  const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('currentSlide');
    targetDot.classList.add('currentSlide');
  }
  
  const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
    if(targetIndex === 0) {
      prevBtn.classList.add('isHidden');
      nextBtn.classList.remove('isHidden');
    } else if (targetIndex === slides.length - 1) {
      prevBtn.classList.remove('isHidden');
      nextBtn.classList.add('isHidden');
    } else {
      prevBtn.classList.remove('isHidden');
      nextBtn.classList.remove('isHidden');
    }
  }
  // reusbale functions end

  // next button
nextBtn.addEventListener('click', e => {
    const currentSlide = slideWrapper.querySelector('.currentSlide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.currentSlide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    moveToSlide(slideWrapper, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
  });
  
  //previous button
prevBtn.addEventListener('click', e => {
    const currentSlide = slideWrapper.querySelector('.currentSlide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.currentSlide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    moveToSlide(slideWrapper, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
  });

  //  dot indicators
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    // prevent the code from workign if its not a button
    if(!targetDot) return;

    const currentSlide = slideWrapper.querySelector('.currentSlide');
    const currentDot = dotsNav.querySelector('.currentSlide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    console.log(targetIndex);
    const targetSlide = slides[targetIndex];
    console.log(targetSlide);
    moveToSlide(slideWrapper, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
  })
