
// navbar
const navbar = document.querySelector('.navbar')
const navbarHandle = document.querySelector('.navbar__handle')

navbarHandle.addEventListener('click', (e) => {
    navbarHandle.classList.toggle('pulled')
    navbar.classList.toggle('pulled')
})

// slider
const btnLeft = document.querySelector('.arrow--left')
const btnRight = document.querySelector('.arrow--right')
const texts = document.querySelectorAll('.text')
const years = document.querySelectorAll('.about__year span')
const progressContainer = document.querySelector('.about__progress')

let currentSlide = 0;
let maxSlide = texts.length - 1;

const createDots = function(){
    texts.forEach((_, i) => {
        progressContainer.insertAdjacentHTML('beforeend', 
            `<div class="progress" data-slide="${i}"></div>`)
    })
}

createDots()

const activateDot = function(slide) {
    document.querySelectorAll('.progress').forEach(dot => {
            dot.classList.remove('active')
        })
    
    document.querySelector(`.progress[data-slide= "${slide}"]`).classList.add('active')
}

activateDot(0)



const goToSlide = function(slide) {

    texts.forEach((text, i) => {
        text.style.transform = `translateX(${100 * (i - slide)}%)`
    })

    years.forEach((year, i) => {
        year.style.transform = `translateX(${100 * (i - slide)}%)`
    })
}

const nextSlide = function() {
    if(currentSlide === maxSlide) {
        currentSlide = 0
    } else {
        currentSlide++
    }
    goToSlide(currentSlide)
    activateDot(currentSlide)
}

const prevSlide = function(){
    if(currentSlide === 0){
        currentSlide = maxSlide
    } else {
        currentSlide--
    }
    goToSlide(currentSlide)
    activateDot(currentSlide)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

progressContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('progress')){
        const slide = e.target.dataset.slide
        goToSlide(slide)
        activateDot(slide)
    }
})


// window.addEventListener('load', (e) => {
//     showcaseImg.style.marginLeft = `100px`;
// })

// photovideo
const photographyBtns = document.querySelector('.photography__btns')
const video = document.querySelector('.video')
const photo = document.querySelector('.photo')

photographyBtns.addEventListener('click', (e) => {
    if(!e.target.classList.contains('btn')) return;

    const btns = document.querySelectorAll('.btn')
    btns.forEach(btn => {
        btn.classList.remove('btn--active')
    })

    if(e.target.classList.contains('btn--video')){
        photo.classList.add('hidden')
        video.classList.remove('hidden')
        e.target.classList.add('btn--active')
    } else if(e.target.classList.contains('btn--photo')){
        video.classList.add('hidden')
        photo.classList.remove('hidden')
        e.target.classList.add('btn--active')
    }

})

// typing text
const typingText = document.querySelector('.typing-text')
const cursor = document.querySelector('.cursor')

const textArr = ['$', 'ce']
let wordIndex = 0
let letterIndex = 0
const typingDelay = 200
const erasingDelay = 100
const nextWordDelay = 1500
const initialLoadDelay = 700

const erasing = function(){
    if(letterIndex > 0) {
        cursor.classList.add('typing')
        typingText.textContent = textArr[wordIndex].slice(0, letterIndex - 1)
        letterIndex--
        setTimeout(erasing, erasingDelay)
    } else if(wordIndex < textArr.length - 1) {
        wordIndex++
        cursor.classList.remove('typing')
        setTimeout(typing, nextWordDelay)
    } else {
        wordIndex = 0
        cursor.classList.remove('typing')
        setTimeout(typing, nextWordDelay)
    }
}

const typing = function(){
    if(letterIndex < textArr[wordIndex].length){
        cursor.classList.add('typing')
        typingText.textContent = textArr[wordIndex].substring(0, letterIndex + 1)
        letterIndex++
        setTimeout(typing, typingDelay);
    } else{
        cursor.classList.remove('typing')
        setTimeout(erasing, nextWordDelay)
    }

}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typing, initialLoadDelay)
})

// Create a condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(max-width: 800px)')

function handleTabletChange(e) {
  // Check if the media query is true
    if (e.matches) {
    // Then log the following message to the console
    console.log('Media Query Matched!')
    photo.classList.remove('hidden')
    video.classList.remove('hidden')
} else {
    photo.classList.add('hidden')
    
    }
}

// Register event listener
mediaQuery.addListener(handleTabletChange)

// Initial check
handleTabletChange(mediaQuery)