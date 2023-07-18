// toggle icon navbar 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop -100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }  
    });
 
    // sticky header
    let header =document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}
const additionalTexts = ["","Laundry", "Dry Cleaning", "Stain Removal", "Ironing"];
let textIndex = 0; // Index for tracking the current additional text
let isDeleting = false; // Flag to indicate if the text is being deleted
let typingDelay = 200; // Delay between typing characters
let deletingDelay = 100; // Delay before deleting characters
let additionalTextElement = document.querySelector('#additional-text'); // Reference to the additional text element

function typeAdditionalText() {
  const currentText = additionalTexts[textIndex]; // Get the current additional text
  if (isDeleting) {
    // Deleting text
    additionalTextElement.textContent = currentText.slice(0, additionalTextElement.textContent.length - 1);
  } else {
    // Typing text
    additionalTextElement.textContent = currentText.slice(0, additionalTextElement.textContent.length + 1);
  }

  if (!isDeleting && additionalTextElement.textContent === currentText) {
    // Finished typing current text, wait before deleting
    setTimeout(() => {
      isDeleting = true;
    }, 1000);
  } else if (isDeleting && additionalTextElement.textContent === '') {
    // Finished deleting current text, move to the next text
    isDeleting = false;
    textIndex++;
    if (textIndex === additionalTexts.length) {
      textIndex = 0; // Reset to the first text
    }
  }

  // Schedule the next character typing or deletion
  setTimeout(typeAdditionalText, isDeleting ? deletingDelay : typingDelay);
}

// Start the typing animation for the additional text
typeAdditionalText();
