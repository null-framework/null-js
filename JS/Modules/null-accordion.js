/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Accordion */

/**
 * Initializes a null accordion component.
 * @param {string} parentSelector - Selector for the parent div containing the accordions
 * @param {boolean} showFirst - If true, the first section is expanded by default
 */

function null_accordion(parentSelector, showFirst = false) {

  const parent = document.querySelector(parentSelector);

  if (parent) {

    // Initialize variables
    var buttons, contents, icons;

    // Get all buttons, contents, and icons within the parent element

    buttons = parent.querySelectorAll('.null-accordion');
    contents = parent.querySelectorAll('.null-accordion-content-container');
    icons = parent.querySelectorAll('.null-accordion-icon');

    // Loop through all buttons and set attributes for accessibility
    buttons.forEach((button, i) => {


      // Set id, aria-expanded, and aria-controls attributes for each button
      button.setAttribute('id', `null-${i}`);
      button.setAttribute('aria-expanded', false);
      button.setAttribute('aria-controls', `null-panel-id-${i}`);

      const number = i + 1; // Calculate the number value based on index i
      const isEven = number % 2 === 0;
      const numberType = isEven ? "even" : "odd";
      button.parentElement.setAttribute("data-null-number", numberType);

      // Get the content container and set attributes for accessibility
      const content = button.nextElementSibling;
      content.setAttribute('aria-labelledby', `null-${i}`);
      content.setAttribute('role', 'region');
      content.setAttribute('id', `null-panel-id-${i}`);

      // Get the icon and set textContent attribute
      const icon = button.querySelector('.null-accordion-icon');
      icon.textContent = '+';

      // Add click event listener to each button
      button.addEventListener('click', () => {
        // Expand or collapse the content container
        if (parseInt(content.style.height) !== content.scrollHeight) {
          content.style.height = `${content.scrollHeight}px`;
          icon.textContent = '-';
        } else {
          content.style.height = '0px';
          icon.textContent = '+';
        }

        // Collapse all other content containers except the one that was clicked
        contents.forEach((c, b) => {
          if (b !== i) {
            c.style.height = '0px';
            const otherIcon = buttons[b].querySelector('.null-accordion-icon');
            otherIcon.textContent = '+';
          }
        });

      });
    });

    // Expand the first section by default if showFirst is true
    if (showFirst) {
      const firstContent = contents[0];
      const firstButton = buttons[0];
      firstContent.style.height = 'auto';
      const height = `${firstContent.offsetHeight}px`;
      firstContent.style.height = height;
      const icon = firstButton.querySelector('.null-accordion-icon');
      icon.textContent = '-';
    }

  }

}

/* End Accordion */