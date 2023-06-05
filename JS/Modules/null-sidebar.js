/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Sidebar */

/**
 * Initializes a null tabs component.
 */
 
const null_sidebar = () => {

	const nullSideBarIcon = document.querySelector(".null-sidebar-icon"); // Get the Icon To Open The Side Bar
	const nullSideBarSection = document.querySelector(".null-sidebar-section"); // Get Side Bar Section
	let nullSideBarBackDrop; // Variable to store the back drop element

	// Function to create the back drop element
	const null_create_back_drop = () => {
		nullSideBarBackDrop = document.createElement("div");
		nullSideBarBackDrop.classList.add("null-sidebar-back-drop");
		document.body.appendChild(nullSideBarBackDrop);
	};

	// Function to toggle the side bar and handle back drop creation/removal
	const null_toggle_sidebar = () => {
		nullSideBarSection.classList.toggle("active");
		document.body.classList.toggle("null-sidebar-body-overflow-hidden");

		if (nullSideBarSection.classList.contains("active")) {
			null_create_back_drop();
			nullSideBarBackDrop.addEventListener("click", null_toggle_sidebar);
		} else {
			nullSideBarBackDrop.remove();
		}
	};

	// Attach click event listener to the sidebar icon
	nullSideBarIcon?.addEventListener("click", null_toggle_sidebar);
};

null_sidebar();

/* End Sidebar */
