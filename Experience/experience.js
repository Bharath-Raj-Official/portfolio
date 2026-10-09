// Select all elements with the class 'nav-link'
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

// Add an event listener to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the class 'skill-per'
  const skills = document.querySelectorAll('.skill-per');
  
  // Iterate over the skills and animate the width
  skills.forEach(skill => {
    // Get the percentage attribute
    let percentage = skill.getAttribute('per');
    // Set the width to 0%
    skill.style.width = '0%';
    
    // Use setTimeout to animate the width after 500ms
    setTimeout(() => {
      skill.style.width = percentage + '%';
    }, 500);

    // Fade in the percentage text after the animation
    setTimeout(() => {
      // Select the percentage text element
      const percentageText = skill.parentNode.nextElementSibling;
      // Set the opacity to 1
      percentageText.style.opacity = '1';
    }, 1900); // 1900ms = 1.9s (1.9s for the bar animation)
  });
});

// Define an array of frameworks
const frameworks = [
  { 
    name: 'Keras', 
    logo: '../Assets/Keras.png', 
    percentage: 70, 
    description: 'Keras is the high-level API of the TensorFlow platform. It provides an approachable, highly-productive interface for solving machine learning (ML) problems, with a focus on modern deep learning.' 
  },
  { 
    name: 'TensorFlow', 
    logo: '../Assets/Tensorflow.png', 
    percentage: 90, 
    description: 'TensorFlow is an open-source library for numerical computation, large-scale machine learning, deep learning, and other statistical and predictive analytics workloads.' 
  },
  { 
    name: 'PyTorch', 
    logo: '../Assets/Pytorch.png', 
    percentage: 82, 
    description: 'PyTorch is an optimized Deep Learning tensor library based on Python and Torch. It is favored over other Deep Learning frameworks like TensorFlow and Keras since it uses dynamic computation graphs and is completely Pythonic.' 
  },
  { 
    name: 'OpenNN', 
    logo: '../Assets/OpenNN.png', 
    percentage: 80, 
    description: "OpenNN is a tool used for creating neural networks, a type of AI that mimics how the human brain works. It's written in C++ and is known for being fast and efficient." 
  }
];

// Compile the framework template using Handlebars
const frameworkTemplate = Handlebars.compile(document.getElementById('framework-template').innerHTML);

// Create a new div element for the framework grid
const frameworkGrid = document.createElement('div');
frameworkGrid.className = 'framework-grid';

// Set the innerHTML of the framework grid to the compiled template
frameworkGrid.innerHTML = frameworkTemplate({ frameworks });

// Append the framework grid to the body
document.body.appendChild(frameworkGrid);

// Select all elements with the class 'framework-square'
const frameworkSquares = document.querySelectorAll('.framework-square');

// Add an event listener to each framework square click event
frameworkSquares.forEach(square => {
  square.addEventListener('click', () => {
    // Get the name, percentage, description, and logo from the square
    const name = square.getAttribute('data-name');
    const percentage = square.getAttribute('data-percentage');
    const description = square.getAttribute('data-description');
    const logo = square.querySelector('img').src;

    // Display the popup
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    // Update the popup content
    const popupLogo = popup.querySelector('.popup-logo');
    popupLogo.src = logo;
    const popupNameValue = popup.querySelector('.popup-name-value');
    popupNameValue.textContent = name;
    const popupProficiencyValue = popup.querySelector('.popup-proficiency-value');
    popupProficiencyValue.textContent = percentage + '%';
    const popupDescription = popup.querySelector('.popup-description');
    popupDescription.textContent = description;
  });
});

// Add an event listener to the popup to close it when clicked outside
document.getElementById('popup').addEventListener('click', (e) => {
  // Check if the click was outside the popup content
  if (e.target === e.currentTarget) {
    // Hide the popup
    e.currentTarget.style.display = 'none';
  }
});

// Create a close button for the popup
const closeButton = document.createElement('button');
closeButton.textContent = 'Close';

// Append the close button to the popup
document.getElementById('popup').appendChild(closeButton);

// Add an event listener to the close button to close the popup
closeButton.addEventListener('click', () => {
  // Hide the popup
  document.getElementById('popup').style.display = 'none';
});