/*
* Null JS v1.0.0 (https://null-js.com)
* Copyright (c) 2023 Null JS
* Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/**
 * Scroll to top button functionality with gradient fill based on scroll position.
 * @param {number} [scrollY=300] - The minimum scroll position to show the button.
 */

function null_scroll_to_top(scrollY = 300) {
    // Select the scroll-to-top container element
    const nullToTop = document.querySelector(".null-scroll-to-top-container");

    // If the container element is not found, exit the function
    if (nullToTop == null) return;

    // Add a scroll event listener
    window.addEventListener("scroll", function () {
        // Get the current scroll position
        const nullScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Calculate the window height
        const nullWindowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        // Calculate the scroll percentage
        const nullScrollPercent = nullScrollTop / nullWindowHeight * 100;

        // Update the conic-gradient background based on the scroll percentage
        nullToTop.style.background = `conic-gradient(var(--null-color-main) ${nullScrollPercent}%, var(--null-color-light-grey) ${nullScrollPercent}%)`;

        // Show the button if the scroll position is greater than or equal to the specified threshold
        if (nullScrollTop >= scrollY) {
            nullToTop.classList.add("active");

            // Add a click event listener to smoothly scroll back to the top
            nullToTop.onclick = function () {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                });
            };

            // If the scroll position is below the threshold, hide the button
        } else {
            if (nullToTop.classList.contains("active")) {
                nullToTop.classList.remove("active");
            }
        }
    }); // End EventListener
} // End Function

// Initialize the scroll-to-top button
null_scroll_to_top();


