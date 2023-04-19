/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/*  Start Toast */

/**
 * Initializes a null circular progress component
 */

function null_toast() {
    
  // Get all null toast buttons
  const nullToastButton = document.querySelectorAll(".null-toast-button");

  // Get all null toast close buttons
  const nullToastCloseButton = document.querySelectorAll(".null-toast-close-container");

  // Variables to hold setTimeout ids
  let nullTimerOne;
  let nullTimerTwo;

  // Loop through each null toast button
  for (let i = 0; i < nullToastButton.length; i++) {

      // Add click event listener to null toast button
      nullToastButton[i].addEventListener("click", () => {

          // Get null toast container
          let nullToastContainer = nullToastButton[i].parentElement;

          // Get null toast and progress bar elements
          let nullToast = nullToastContainer.querySelector(".null-toast");
          let nullToastProgress = nullToastContainer.querySelector(".null-toast-progress");

          // disable the button
          nullToastButton[i].disabled = true; 
          nullToastButton[i].classList.add('null-button-disabled');

          // Add active class to null toast and progress bar
          nullToast.classList.add("active");
          nullToastProgress.classList.add("active");

          // Set timeout to remove active class from null toast after 5 seconds
          nullTimerOne = setTimeout(() => {
              nullToast.classList.remove("active");
              nullToastButton[i].disabled = false; // enable the button
              nullToastButton[i].classList.remove('null-button-disabled');

          }, 5000); //1s = 1000 milliseconds

          // Set timeout to remove active class from progress bar after 5.3 seconds
          nullTimerTwo = setTimeout(() => {
              nullToastProgress.classList.remove("active");
          }, 5300);
      });
  }

  // Loop through each null toast close button
  for (let i = 0; i < nullToastCloseButton.length; i++) {    

      // Add click event listener to null toast close button
      nullToastCloseButton[i].addEventListener("click", () => {

          // Get null toast and progress bar elements
          let nullToast = nullToastCloseButton[i].parentElement;
          let nullToastProgress = nullToast.querySelector(".null-toast-progress");

          // Remove active class from null toast and progress bar
          nullToast.classList.remove("active");
          nullToastButton[i].disabled = false; // enable the button
          nullToastButton[i].classList.remove('null-button-disabled');

          // Set timeout to remove active class from progress bar after 0.3 seconds
          setTimeout(() => {
              nullToastProgress.classList.remove("active");
          }, 300);

          // Clear timeouts set for null toast and progress bar
          clearTimeout(nullTimerOne);
          clearTimeout(nullTimerTwo);
      });
  }
}

null_toast();

/*  End Toast */