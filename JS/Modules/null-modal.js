/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Modal */

/**
 * Initializes a null modal component.
 */

// Function to add the 'active' class to a modal to show it
function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
}

// Global variable to store modal close callbacks
const modalCloseCallBack = {};

function null_modal() {
    // Select all the elements with the appropriate data attributes and classes
    const openModalButton = document.querySelectorAll('[data-null-modal-target]');
    const closeModalButton = document.querySelectorAll('[data-null-close-button]');
    const modal = document.querySelectorAll('.null-modal-container');
    const body = document.body;

    // Add click event listeners to all the close buttons
    closeModalButton.forEach(function (button) {
        button.addEventListener('click', () => {
            const modal = button.closest(".null-modal-container");

            const targetId = "#" + modal.getAttribute("id");

            // call set_modal_close_callback instead of closeModal
            set_modal_close_callback(targetId);
        });
    });

    // Add click event listeners to all the open modal buttons
    openModalButton.forEach(function (button) {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.nullModalTarget);
            // Add the 'modal-body-overflow-hidden' class to the body
            body.classList.add("null-modal-body-overflow-hidden");
            // Call the function to open the modal
            openModal(modal);
        });
    });

    // Add a click event listener to the window to close the modal when user clicks outside the modal (overlay)
    window.addEventListener('click', e => {
        modal.forEach(modalItem => {
            if (e.target === modalItem) {
                const targetId = `#${modalItem.getAttribute("id")}`;
                set_modal_close_callback(targetId);
            }
        });
    });
}

null_modal();

function set_modal_close_callback(targetId) {
    const modal = document.querySelector(targetId);
    if (modal != null) {
        modal.classList.remove('active');
        document.body.classList.remove("null-modal-body-overflow-hidden");
        // Check if a callback exists for this modal, if so, call it
        if (modalCloseCallBack[targetId]) {
            modalCloseCallBack[targetId]();
        }
    }
}

// Function to manually trigger a modal
function null_modal_open(targetId) {
    const modal = document.querySelector(targetId);
    document.body.classList.add("null-modal-body-overflow-hidden");
    openModal(modal);
}

// Function to set the callback for a modal close event
function null_modal_close(targetId, callBack) {
    if (callBack && typeof callBack === "function") {
        modalCloseCallBack[targetId] = callBack;
    }
}

/* End Modal */
