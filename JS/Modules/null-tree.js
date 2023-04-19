/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Tree */

/**
 * Initializes the null_tree function.
 * @param {string} element - The selector for the element to initialize the function on.
 * @param {boolean} showFirst - Optional parameter to determine if the first item should be shown on page load.
 */

function null_tree(element, showFirst = false) {

  if (element) {
    // Get all elements with the specified selector.
    element = document.querySelectorAll(element);

    // Loop through each element using for...of loop.
    for (const el of element) {
      if (showFirst) {
        // Show the first item if showFirst is set to true.
        el.querySelector(".null-tree-list ul").classList.add("active");
      }
    }

  } else {

    // Get all elements with the class .null-tree-list.
    const nullTreeLists = document.querySelectorAll(".null-tree-list");

    // Loop through each element using for...of loop.
    for (const nullTreeList of nullTreeLists) {
      // Add a click event listener to each div element inside the .null-tree-list element.
      nullTreeList.querySelector("div").addEventListener("click", function () {
          // Toggle the 'active' class on the ul element inside the .null-tree-list element.
          nullTreeList.querySelector("ul").classList.toggle("active");
      });
    }

  }

}

null_tree(); // Invoke the function

/* End Tree */