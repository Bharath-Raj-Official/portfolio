// Get the container element and initialize arrays/variables
const container = document.getElementById('container');
const boxes = [];
const navbarLinks = document.querySelectorAll('.nav-link');
const currentPageUrl = window.location.href;

// Add event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');
  
    // Toggle hamburger menu and navbar when clicked
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navbar.classList.toggle('active');
    });
  
    // Close menu when a navigation link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navbar.classList.remove('active');
      });
    });
});

// Hide the current page's link in the navigation
navbarLinks.forEach((link) => {
    if (link.href === currentPageUrl) {
      link.style.display = 'none';
    }
});

// Define Box class for creating and managing bouncing boxes
class Box {
    constructor(x, y, vx, vy, text, backgroundColor) {
        // Initialize box properties
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.text = text;
        this.backgroundColor = backgroundColor;

        // Create box element using Handlebars template
        const template = Handlebars.compile(document.getElementById('box-template').innerHTML);
        this.element = document.createElement('div');
        this.element.innerHTML = template({ text: this.text, backgroundColor: this.backgroundColor });
        this.element = this.element.firstElementChild;
        container.appendChild(this.element);

        // Set initial position
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        // Get the actual dimensions after rendering
        this.width = this.element.offsetWidth;
        this.height = this.element.offsetHeight;
    }

    // Update box position and handle bouncing
    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off container edges
        if (this.x <= 0 || this.x >= container.offsetWidth - this.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= container.offsetHeight - this.height) this.vy *= -1;

        // Update box position
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
}

// Define initial box data
const boxData = [
    { text: "Very knowledgable and skillfull!", backgroundColor: "#ff4742" },
    { text: "Saved me from a fire once", backgroundColor: "#4285f4" },
    { text: "Excellent work ethic", backgroundColor: "#0e76a8" },
    { text: "Incredible teamplayer that is proficient in managing conflicts", backgroundColor: "#333" },
    { text: "Critical thinker and is capable of coming up with innovative solutions", backgroundColor: "#1da1f2" }
];

// Create boxes based on boxData
boxData.forEach((data) => {
    const x = Math.random() * (container.offsetWidth - 200);
    const y = Math.random() * (container.offsetHeight - 100);
    const vx = (Math.random() - 0.5) * 2;
    const vy = (Math.random() - 0.5) * 2;
    boxes.push(new Box(x, y, vx, vy, data.text, data.backgroundColor));
});

// Animation function to update box positions
function animate() {
    boxes.forEach(box => box.update());
    requestAnimationFrame(animate);
}
animate();

// Add mouse interaction to repel boxes
container.addEventListener('mousemove', function(event) {
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    boxes.forEach(box => {
        const dx = (box.x + box.width / 2) - mouseX;
        const dy = (box.y + box.height / 2) - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
            const angle = Math.atan2(dy, dx);
            const newVx = Math.cos(angle) * 1.2;
            const newVy = Math.sin(angle) * 1.2;
            box.vx = newVx;
            box.vy = newVy;
        }
    });
});

// Add new review box when send review button is clicked
document.getElementById('send-review').addEventListener('click', function() {
    const reviewText = document.getElementById('review-text').value.trim();
    if (reviewText) {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        const newReview = {
            text: reviewText,
            backgroundColor: "#" + randomColor
        };
        boxData.push(newReview);
        
        // Create a new box for the review
        const x = Math.random() * (container.offsetWidth - 200);
        const y = Math.random() * (container.offsetHeight - 100);
        const vx = (Math.random() - 0.5) * 2;
        const vy = (Math.random() - 0.5) * 2;
        const newBox = new Box(x, y, vx, vy, newReview.text, newReview.backgroundColor);
        boxes.push(newBox);

        // Clear the textarea
        document.getElementById('review-text').value = '';
    }
});

// Handle contact form submission
document.getElementById('send-contact').addEventListener('click', function() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (name && email && message) {
        if (isValidEmail(email)) {
            // Replace contact box with success message
            document.getElementById('contact-box').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
        } else {
            alert('Please enter a valid email address.');
        }
    } else {
        alert('Please fill in all fields.');
    }
});

// Email validation function
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}