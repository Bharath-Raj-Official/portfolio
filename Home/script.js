// Wait for the entire DOM content to be loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements that will be manipulated
  const contentWrapper = document.querySelector(".content-wrapper");
  const svgContainer = document.querySelector(".svg-container");
  const blankSpace = document.querySelector(".blank-space");
  const mountBg = document.querySelector(".mountBg");
  const mountMg = document.querySelector(".mountMg");
  const mountFg = document.querySelector(".mountFg");
  const cloud1 = document.querySelector(".cloud1");
  const cloud2 = document.querySelector(".cloud2");
  const cloud3 = document.querySelector(".cloud3");
  const combinedContainer = document.querySelector(".combined-container");
  const overlayText = document.querySelector(".overlay-text");
  const textElement = document.getElementById("text");
  const secondTextElement = document.getElementById("second-text");
  const cursorElement = document.getElementById("cursor");
  const descriptionElement = document.getElementById("description");
  const learnMoreButton = document.getElementById("learn-more");
  const popup = document.getElementById("popup");

  // State to track whether the text has been translated and to control scroll event handling
  let textTranslated = false;
  let ticking = false;

  function setTransform(el, x, y) {
    el.setAttribute("transform", `translate(0, ${y})`);
  }

  // Main parallax effect function, adjusts positions of elements based on scroll position
  function parallax() {
    const scrollTop = window.pageYOffset; // Current scroll position
    const maxScroll = contentWrapper.offsetHeight - window.innerHeight; // Maximum scrollable height

    // Parallax effect for images
    setTransform(mountBg, 0, scrollTop * -0.01); 
    setTransform(mountMg, scrollTop * 0.05, scrollTop * -0.03);
    setTransform(mountFg, scrollTop * -0.05, scrollTop * -0.07);
    setTransform(cloud1, scrollTop * -0.1, scrollTop * -0.07);
    setTransform(cloud2, scrollTop * -0.125, scrollTop * -0.07);
    setTransform(cloud3, scrollTop * -0.15, scrollTop * -0.07);

    // Move the blank space upwards faster as the user scrolls down
    blankSpace.style.transform = `translateY(${-scrollTop * 1.1}px)`;

    // Handle text animation based on scroll progress
    const progress = scrollTop / maxScroll;
    if (progress > 0.05 && !textElement.classList.contains("typed")) {
      textElement.classList.add("typed"); // Add class to mark the text as typed
      untypeText(textElement, "Hello,", () => { // Start un-typing the initial text
        secondTextElement.style.opacity = "1"; // Show the second text element
        typeText(secondTextElement, "I'm Bharath", () => { // Type the second text
          cursorElement.style.display = "none"; // Hide the blinking cursor once typing is done
        });
      });
    }

    // Check if the bottom of the blank space has been reached and text has not been translated yet
    if (scrollTop / maxScroll >= 1 && !textTranslated) {
      textTranslated = true;

      // After text translation, fade in the description
      combinedContainer.addEventListener(
        "transitionend",
        () => {
          descriptionElement.style.opacity = "1";
        },
        { once: true } // Ensure the event listener only triggers once
      );
    }
  }

  // Throttle the scroll event handling for better performance
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        parallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Add scroll event listener to trigger the parallax effect
  window.addEventListener("scroll", onScroll);

  // Add a second scroll event listener for safety
  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(parallax);
  });

  // Function to simulate typing of text one character at a time
  function typeText(element, text, callback) {
    let index = 0;
    const interval = setInterval(() => {
      element.textContent += text[index++]; // Add the next character in the text
      if (index === text.length) { // Checks if all characters are typed
        clearInterval(interval);
        if (callback) callback(); 
      }
    }, 100); // Delay between each character
  }

  // Function to simulate un-typing of text one character at a time
  function untypeText(element, text, callback) {
    let index = text.length;
    const interval = setInterval(() => {
      element.textContent = text.slice(0, index--); // Remove the last character
      if (index < 0) { // Checks if all characters are removed
        clearInterval(interval);
        if (callback) callback();
      }
    }, 50); // Delay between each character removal
  }

  // Type initial text
  typeText(textElement, "Hello,", () => {
    // Once the initial typing is done, the parallax function handles the rest
  });

  // Add click event listener to the "Learn More" button to toggle the popup visibility
  learnMoreButton.addEventListener("click", () => {
    popup.classList.toggle("hidden");
  });

  // Add an event listener to the "Learn More" button to show the popup
  document.getElementById("learn-more").addEventListener("click", () => {
    document.getElementById("popup").classList.remove("hidden");
  });

  // Add an event listener to the popup to close it when clicked outside of its content
  document.getElementById("popup").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.add("hidden"); // Hide the popup if the background is clicked
    }
  });
});
