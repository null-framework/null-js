/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Modal */

/**
 * Initializes a null modal component.
 */

function null_modal() {

  // Select all the elements with the appropriate data attributes and classes
  const nullOpenModalButton = document.querySelectorAll('[data-null-modal-target]');
  const nullCloseModalButton = document.querySelectorAll('[data-close-button]');
  const nullModal = document.querySelectorAll('.null-modal-container');
  const nullBody = document.body;

  // Add click event listeners to all the close buttons
  nullCloseModalButton.forEach(function(button) {
    button.addEventListener('click',() => {
      const modal = button.closest(".null-modal-container");
      // Remove the 'null-modal-body-overflow-hidden' class from the body
      nullBody.classList.remove("null-modal-body-overflow-hidden");
      // Call the function to close the modal
      nullCloseModal(modal);
    })
  });

  // Add click event listeners to all the open modal buttons
  nullOpenModalButton.forEach(function(button) {
    button.addEventListener('click',() => {
      const modal = document.querySelector(button.dataset.nullModalTarget);
      // Add the 'null-modal-body-overflow-hidden' class to the body
      nullBody.classList.add("null-modal-body-overflow-hidden");
      // Call the function to open the modal
      nullOpenModal(modal);
    })
  });

  // Function to add the 'active' class to a modal to show it
  function nullOpenModal(modal){
    if(modal == null) return;
    modal.classList.add('active');
  }

  // Function to remove the 'active' class from a modal to hide it
  function nullCloseModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
  }

  // Add a click event listener to the window to close the modal when user clicks outside the modal (overlay)
  window.addEventListener('click', nullOutSideClick);

  // Function to close the modal when user clicks outside the modal (overlay)
  function nullOutSideClick(e) {

    for (let i = 0; i < nullModal.length; i++) {

      if (e.target == nullModal[i]) {
        // Remove the 'active' class from the modal to hide it
        nullModal[i].classList.remove('active');
        // Remove the 'null-modal-body-overflow-hidden' class from the body
        nullBody.classList.remove("null-modal-body-overflow-hidden");

      }
    }

  }


}

null_modal();

/* End Modal */