/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/





/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll('section');
const navigationBar = document.getElementById('navbar__list');
const scrollToTopBtn = document.getElementById("scrollToTop");
let scrollTimer = -1;


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function sectionInViewPort(section){
    const rect = section.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight + 50)
    );
}

function scrollFinished() {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 20 ){
        document.getElementById("header").style.opacity = "0";  
        document.getElementById("header").style.transition = "visibility 0s, opacity 0.5s linear";
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
(function createNavigationBar(){
    const domFragment = document.createDocumentFragment();
    for(let section of sections){
        let name = section.getAttribute('data-nav');
        let id = section.getAttribute('id');
        let navButton = document.createElement('li');
        navButton.innerHTML = `<a class='menu__link' href='#${id}'>${name}</a>`;
        domFragment.appendChild(navButton);
    }
    navigationBar.appendChild(domFragment);
})();






// Scroll to anchor ID using scrollTO event
function scrollTo(event){
    event.preventDefault();
    let element = document.querySelector(event.target.getAttribute('href'));
    let bodyRect = document.body.getBoundingClientRect(),
    elemRect = element.getBoundingClientRect(),
    offset   = elemRect.top - bodyRect.top + 50;  
    window.scroll({
        top: offset, 
        left:0,  
        behavior: 'smooth'
    })
}


function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
navigationBar.addEventListener('click', scrollTo);
// Set sections as active
window.addEventListener('scroll',  () => {
        
    for (const [i, section] of sections.entries()) {
        let navbtn = navigationBar.childNodes[i].childNodes[0]
            if (sectionInViewPort(section)){
            if (!section.classList.contains('your-active-class')) {
                    section.classList.add('your-active-class');
                    navbtn.classList.add('your-active-class');
                }
            }else {
                try {
                    section.classList.remove('your-active-class');
                    navbtn.classList.remove('your-active-class');
                  }
                  catch(err) {
                    // if any error, Code throws the error
                  }
                
            }  
                 
        }
        
    });



// To show nav bar while scrolling

// Back to top button
scrollToTopBtn.addEventListener("click", scrollToTop);
