// Define an array of phone data objects
const phonesData = [
{ 
    gifUrl: '../Assets/Self Driving Car (Test 1).gif', 
    title: 'Self Driving Car', 
    description: 'Mini Project of a car that will learn to navigate any road the user draws using Artificial Intelligence (AI).', 
    orientation: 'vertical', 
    count: 1 
},
{ 
    gifUrl: '../Assets/ITP Game.gif', 
    title: 'Video Game', 
    description: 'Platformer-type video game made solely by me.', 
    orientation: 'horizontal', 
    count: 2 
},
];

// Compile the phone template using Handlebars
const phoneTemplate = Handlebars.compile(document.getElementById('phone-template').innerHTML);

// Create the HTML for the phones by mapping the phone data to the template
const phonesHtml = phonesData.map(phoneTemplate).join('');

// Set the innerHTML of the phones container to the compiled template
document.getElementById('phones-container').innerHTML = phonesHtml;

// Select all phone elements
const phones = document.querySelectorAll('.phone');

// Select all navbar link elements
const navbarLinks = document.querySelectorAll('.nav-link');

// Get the current page URL
const currentPageUrl = window.location.href;

// Add an event listener to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
// Select the hamburger menu and navbar elements
const hamburger = document.querySelector('.hamburger-menu');
const navbar = document.querySelector('.navbar');

// Add an event listener to the hamburger menu click event
hamburger.addEventListener('click', function() {
    // Toggle the 'active' class on the hamburger menu and navbar
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
    // Remove the 'active' class from the hamburger menu and navbar
    hamburger.classList.remove('active');
    navbar.classList.remove('active');
    });
});
});

// Hide the current page link in the navbar
navbarLinks.forEach((link) => {
if (link.href === currentPageUrl) {
    link.style.display = 'none';
}
});

// Iterate over the phones and add event listeners
phones.forEach((phone, index) => {
// Select the image element inside the phone
const img = phone.querySelector('img');

// Initialize a flag to track whether the GIF is playing
let isPlaying = false;

// Create a canvas element to "pause" the GIF
const canvas = document.createElement('canvas');
canvas.width = img.width;
canvas.height = img.height;
const ctx = canvas.getContext('2d');

// Define a function to pause the GIF
function pauseGif() {
    if (isPlaying) {
    // Draw the current frame of the GIF on the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // Hide the image and show the canvas
    img.style.display = 'none';
    canvas.style.display = 'block';
    // Set the playing flag to false
    isPlaying = false;
    }
}

// Define a function to play the GIF
function playGif() {
    if (!isPlaying) {
    // Show the image and hide the canvas
    img.style.display = 'block';
    canvas.style.display = 'none';
    // Force the GIF to restart by reloading the image
    img.src = img.src;
    // Set the playing flag to true
    isPlaying = true;
    }
}

// Insert the canvas after the image
img.parentNode.insertBefore(canvas, img.nextSibling);

// Create an IntersectionObserver to detect when the phone is in the viewport
const observer = new IntersectionObserver((entries) => {
    // Get the first entry (the phone element)
    const entry = entries[0];
    // Get the bounding rectangle of the phone
    const boundingRect = entry.boundingClientRect;
    // Get the window height
    const windowHeight = window.innerHeight;

    // Calculate the top and bottom positions of the phone
    const elementTop = boundingRect.top;
    const elementBottom = boundingRect.bottom;

    // Adjust the viewport calculation based on the phone's orientation
    const isHorizontal = phone.classList.contains('horizontal');
    const viewportStart = isHorizontal ? windowHeight * 0.2 : windowHeight * 0.3;
    const viewportEnd = isHorizontal ? windowHeight * 0.8 : windowHeight * 0.7;

    // Check if the phone is in the viewport
    const isInViewport = (elementTop >= viewportStart) && (elementBottom <= viewportEnd);

    // Play or pause the GIF based on whether it's in the viewport
    if (isInViewport) {
    playGif();
    } else {
    pauseGif();
    }

    // Log the phone's position and playing state to the console
    console.log(`Phone ${index + 1} - In viewport: ${isInViewport}, Playing: ${isPlaying}, Top: ${elementTop}, Bottom: ${elementBottom}, Window Height: ${windowHeight}`);
}, { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] });

// Observe the phone element
observer.observe(phone);
});

