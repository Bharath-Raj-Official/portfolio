// Select all navigation links
const navbarLinks = document.querySelectorAll('.nav-link');

// Get the current page's URL
const currentPageUrl = window.location.href;

// Loop through each link in the navbar
navbarLinks.forEach((link) => {
  // If the link's href matches the current page's URL, hide that link
  if (link.href === currentPageUrl) {
    link.style.display = 'none';
  }
});

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Select the hamburger menu icon
  const hamburger = document.querySelector('.hamburger-menu');
  // Select the navbar element
  const navbar = document.querySelector('.navbar');

  // Add a click event listener to the hamburger menu
  hamburger.addEventListener('click', function() {
    // Toggle the 'active' class on both the hamburger menu and navbar
    hamburger.classList.toggle('active');
    navbar.classList.toggle('active');
  });

  // Close the menu when a navbar link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      // Remove the 'active' class from both the hamburger menu and navbar
      hamburger.classList.remove('active');
      navbar.classList.remove('active');
    });
  });
});

// Add a scroll event listener to the window
window.addEventListener("scroll", fnOnScroll);
// Add a resize event listener to the window
window.addEventListener("resize", fnOnResize);

// Select the timeline container
const timelineContainer = document.querySelector(".timeline-container");
// Select all chat bubbles within the timeline container
const chatBubbles = document.querySelectorAll(".chat-bubble");

// Initialize variables for scroll position and viewport height
let agPosY = 0;
let agHeight = window.innerHeight;
// Flag to prevent multiple animation frames
let agFlag = false;

// Function to handle the scroll event
function fnOnScroll() {
  // Update the current scroll position
  agPosY = window.scrollY;
  // Call the function to update the frame
  fnUpdateFrame();
}

// Function to handle the resize event
function fnOnResize() {
  // Update the current scroll position
  agPosY = window.scrollY;
  // Update the viewport height
  agHeight = window.innerHeight;
  // Call the function to update the frame
  fnUpdateFrame();
}

// Function to update the window (triggered by requestAnimationFrame)
function fnUpdateWindow() {
  // Reset the flag
  agFlag = false;
  // Call the function to update the progress (chat bubbles)
  fnUpdateProgress();
}

// Function to update the progress (chat bubbles visibility)
function fnUpdateProgress() {
  // Get the position of the timeline container relative to the viewport
  const containerRect = timelineContainer.getBoundingClientRect();
  const containerTop = containerRect.top + window.scrollY;
  const containerBottom = containerRect.bottom + window.scrollY;
  
  // Loop through each chat bubble
  chatBubbles.forEach((bubble, index) => {
    // Get the position of the chat bubble relative to the viewport
    const bubbleRect = bubble.getBoundingClientRect();
    const bubbleTop = bubbleRect.top + window.scrollY;
    
    // Check if the chat bubble is within the visible area
    if (bubbleTop <= agPosY + agHeight * 0.8 && bubbleTop >= containerTop) {
      // If the chat bubble is not already visible, make it visible with a staggered effect
      if (!bubble.classList.contains('visible')) {
        setTimeout(() => {
          bubble.classList.add('visible');
        }, index * 100); // Stagger the appearance of bubbles based on their index
      }
    } else {
      // If the chat bubble is outside the visible area, hide it
      bubble.classList.remove('visible');
    }
  });
}

// Function to request an animation frame to update the window
function fnUpdateFrame() {
  // If no animation frame is pending, request one
  agFlag || requestAnimationFrame(fnUpdateWindow);
  // Set the flag to true to prevent multiple requests
  agFlag = true;
}

// Initial call to set the initial state of the chat bubbles
fnUpdateProgress();
