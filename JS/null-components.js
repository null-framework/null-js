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


/* Start Alert */

/**
 * Initializes the null_alert function.
 * @description This function sets up event listeners for close icons on alert component
 */

function null_alert() {

    // Get all elements with class .null-alert-exit-icon.
    let nullAlertExit = document.querySelectorAll(".null-alert-exit-icon");

    if (nullAlertExit) {
        for (let i = 0; i < nullAlertExit.length; i++) {

            // Add a click event listener to the element.
            nullAlertExit[i].addEventListener("click", function () {

                // Get the parent element of the close icon.
                let nullAlertParent = nullAlertExit[i].parentNode.parentNode;

                // Set the opacity of the parent element to 0.
                nullAlertExit[i].parentNode.parentNode.style.opacity = '0';

                // Remove the parent element from the DOM after a 500 millisecond delay.
                setTimeout(function () { nullAlertParent.remove(); }, 500);
            })

        }
    }

}

null_alert(); // Invoke the function

/* End Alert */

/* Start Drop Down */

/**
 * Initializes a null dropdown component
 */

(function () {

    const dropDownButton = document.querySelectorAll(".null-dropdown-button");

    for (let i = 0; i < dropDownButton.length; i++) {

        dropDownButton[i].addEventListener("click", function () {

            let container = dropDownButton[i].nextElementSibling // get null-dropdown

            if (container.clientHeight) {

                if (container.classList.contains("show")) {
                    container.classList.remove("show"); //remove class show
                }

                container.style.height = 0; // assign 0 to height

                container.removeAttribute('style'); // remove style from dom

                if (dropDownButton[i].classList.contains("active")) {
                    dropDownButton[i].classList.remove("active");
                }

            } else {

                wrapper = container.querySelector(".null-dropdown-menu");

                container.style.height = wrapper.clientHeight + "px";
                container.style.opacity = 1;
                // add class show
                container.classList.add("show");

            }
            if (dropDownButton[i].querySelector("svg").classList.contains("active")) {
                dropDownButton[i].querySelector("svg").classList.remove("active");
            } else {
                dropDownButton[i].querySelector("svg").classList.add("active");
            }

        })

    }

    // Close the drop down while the next one is opening or user click out side the drop down

    document.addEventListener('click', function (e) {

        let dropdown = document.querySelectorAll(".null-dropdown.show ");

        dropdown.forEach(function (el) {

            el.parentElement.querySelector(".null-dropdown-button").classList.add("active"); // for border radius

            if (el != e.target.nextElementSibling && !e.target.matches('.null-drop-down-menu')) {

                el.style.height = 0;
                el.removeAttribute('style'); // remove style from dom

                if (el.classList.contains("show")) {
                    el.classList.remove("show"); //remove class show
                }

                if (el.parentElement.querySelector(".null-dropdown-button").classList.contains("active")) {
                    el.parentElement.querySelector(".null-dropdown-button").classList.remove("active");
                }

                if (el.parentElement.querySelector("button svg")) {
                    el.parentElement.querySelector("button svg").classList.remove("active");
                } else {
                    el.parentElement.querySelector("a svg").classList.remove("active");
                }


            }

        });
    })

    // Close the drop down while the next one is opening or user click out side the drop down

    // Trigger key down && up && enter

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("active");
        }
    }

    currentFocus = -1;

    document.addEventListener("keydown", function (e) {

        const buttonActive = document.querySelectorAll(".null-dropdown-button.active");

        for (let i = 0; i < buttonActive.length; i++) {

            e.preventDefault();

            if (e.keyCode == 40) {
                currentFocus++;
                addActive(buttonActive[i].parentElement.querySelector(".null-dropdown-menu").children);

            } else if (e.keyCode == 38) { //up

                currentFocus--;

                addActive(buttonActive[i].parentElement.querySelector(".null-dropdown-menu").children);

            } else if (e.keyCode == 13) {
                e.preventDefault();

                if (currentFocus > -1) {
                    buttonActive[i].parentElement.querySelector(".null-dropdown-menu li.active a").click();
                }

            }

        }

    });

})();

/* End Drop Down */

/* Start List */

/**
 * Initializes a null list component
 */

function null_list(listID) {

    // Get the search input element
    const nullSearchInput = document.querySelector(
        `${listID} #null-list-search-input`
    );

    // Get the parent element of the search results
    const nullSearchResults = document.querySelector(`${listID} .null-list-results`);

    // Get all the search result elements
    const nullSearchResult = document.querySelectorAll(`${listID} .null-list-result`);

    // Get the title elements of the search results
    const nullResultTitle = nullSearchResults?.querySelectorAll(
        `${listID} .null-list-result-name`
    );

    // Function to delay execution of a function
    function null_list_delay(func, ms) {
        let timer = 0;

        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(func.bind(this, ...args), ms || 0);
        };
    }

    // If the search input exists, add a keyup event listener to it
    if (nullSearchInput) {
        nullSearchInput.addEventListener(
            "keyup",
            null_list_delay(() => {
                // Get the search input value and convert to uppercase
                const nullSearchInputFilter = nullSearchInput.value
                    .replace(/\s/g, "")
                    .toUpperCase();

                // Flag to indicate if no results were found
                let nullNoResults = true;

                // Loop through each search result title element
                nullResultTitle?.forEach((match) => {
                    // Get the text content of the title element
                    const textValue = match.textContent || match.innerHTML;

                    if (textValue.toUpperCase().indexOf(nullSearchInputFilter) > -1) {
                        nullNoResults = false;
                        nullSearchResults.appendChild(match.closest(".null-list-result"));
                    } else {
                        const resultToRemove = match.closest(".null-list-result");

                        if (document.contains(resultToRemove)) {
                            resultToRemove.remove();
                        }
                    }

                    document.querySelector(
                        `${listID} .null-list-result-no-records-found`
                    ).innerHTML = nullNoResults ? "<div>No records found</div>" : "";
                });
            }, 500)
        );
    }

    let nullCountRecords = 0;
    // Add data attributes to each search result element
    const null_list_total_results = document.querySelector(
        `${listID} #null-list-total-results span`
    );

    nullSearchResult.forEach((result, i) => {
        nullCountRecords++;
        result.setAttribute("data-null-id", i + 1);

        if ((i + 1) % 2 == 0) {
            result.setAttribute("data-null-number", "even");
        } else {
            result.setAttribute("data-null-number", "odd");
        }
    });

    // Show the total number of search results
    if (nullSearchResults) {
        null_list_total_results.innerHTML = nullSearchResults.querySelectorAll('.null-list-result').length;
    }
}

/* End List */

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
    nullCloseModalButton.forEach(function (button) {
        button.addEventListener('click', () => {
            const modal = button.closest(".null-modal-container");
            // Remove the 'null-modal-body-overflow-hidden' class from the body
            nullBody.classList.remove("null-modal-body-overflow-hidden");
            // Call the function to close the modal
            nullCloseModal(modal);
        })
    });

    // Add click event listeners to all the open modal buttons
    nullOpenModalButton.forEach(function (button) {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.nullModalTarget);
            // Add the 'null-modal-body-overflow-hidden' class to the body
            nullBody.classList.add("null-modal-body-overflow-hidden");
            // Call the function to open the modal
            nullOpenModal(modal);
        })
    });

    // Function to add the 'active' class to a modal to show it
    function nullOpenModal(modal) {
        if (modal == null) return;
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


/* Start Navbar */

/**
 * Initializes a null modal component.
 */

(function () {

    const mobileIcon = document.querySelector(".null-navbar-menu-icon-contianer");
    const Menu = document.querySelector(".null-navbar-links");
    const backDrop = document.querySelector(".null-navbar-back-drop");
    const body = document.body;

    /*Search*/
    const search = document.querySelector(".null-navbar-search svg");
    const searchForm = document.querySelector(".null-navbar-form");
    const searchContainer = document.querySelector(".null-navbar-form-container");
    /*Search*/


    function null_nav_bar_back_drop() { // create drop back
        const newDiv = document.createElement("div");
        newDiv.classList.add("null-navbar-back-drop");
        document.body.appendChild(newDiv);

    }

    function null_nav_bar_back_drop_search() { //dropback

        let checkBackDrop = document.querySelector(".null-navbar-back-drop");
        checkBackDrop.onclick = () => {
            checkBackDrop.remove();
            if (body.classList.contains("null-navbar-body-overflow-hidden")) {
                body.classList.remove("null-navbar-body-overflow-hidden");
            }
            Menu.classList.remove("active");

        }
    }

    if (mobileIcon) {
        mobileIcon.onclick = () => { //mobile menu
            Menu.classList.add("active");
            body.classList.add("null-navbar-body-overflow-hidden");


            null_nav_bar_back_drop();
            null_nav_bar_back_drop_search();
        }
    }

    /* Prevent User from seeing the backdrop if they resize the computer screen */

    function hideBackDrop(x) {
        let elementExist = document.querySelector(".null-navbar-back-drop");
        let activeNav = document.querySelector(".null-navbar-links");
        let body = document.body;
        if (x.matches) { // If media query matches
            if (elementExist) {

                elementExist.removeAttribute('style');
                body.style.overflow = "";

                if (activeNav) {
                    if (activeNav.classList.contains("active")) {
                        activeNav.removeAttribute('style');
                    }
                }


            }

        } else {
            if (elementExist) {
                elementExist.style.display = "none";
                body.style.overflow = "auto";
            }

            if (activeNav) {
                if (activeNav.classList.contains("active")) {
                    activeNav.style.transition = "none";
                }
            }


        }
    }

    let mediaQuery = window.matchMedia("(max-width: 992px)");
    hideBackDrop(mediaQuery); // Call listener function at run time
    mediaQuery.addListener(hideBackDrop); // Attach listener function on state changes


    window.addEventListener("orientationchange", () => {
        if (backDrop) {
            backDrop.remove();
        }
        body.classList.remove("null-navbar-body-overflow-hidden");
        Menu.classList.remove("active");
    });

    /* Prevent User from seeing the backdrop if they resize the computer screen */

    /*Search*/
    if (search) {
        search.onclick = () => {
            if (searchForm.classList.contains("active")) {
                searchForm.classList.remove("active");
                searchContainer.classList.remove("active");
            } else {
                searchForm.classList.add("active");
                searchContainer.classList.add("active");
                searchForm.querySelector(".null-navbar-form-input").focus();

            }
        }
    }

    window.addEventListener('click', hideSearch);
    function hideSearch(e) {
        if (e.target != search && e.target.parentNode != searchContainer && e.target.parentNode != searchForm) {

            if (searchForm) {
                searchForm.classList.remove("active");
            }

            if (searchContainer) {
                searchContainer.classList.remove("active");
            }

        }
    }

})();

/* End Navbar */


/* Start Circular Progress */

/**
 * Initializes a null circular progress component.
 */

function null_circular_progress(id, args) {

    const nullCircularProgress = document.querySelector(`#${id} .null-circular-progress`);

    const nullCircularProgressValue = document.querySelector(`#${id} .null-circular-progress-value`);

    let defaults = {
        endValue: 100,
        speed: 50
    };

    let params = { ...defaults, ...args };

    let progressStartValue = 0,
        progressEndValue = params.endValue,
        speed = params.speed;

    if (nullCircularProgress) {
        let nullProgress = setInterval(() => {
            progressStartValue++;

            nullCircularProgressValue.textContent = `${progressStartValue}%`;

            nullCircularProgressValue.setAttribute("data-null-circular-progress-value", progressStartValue + '%');
            nullCircularProgressValue.setAttribute("data-null-circular-progress-degree", (progressStartValue * 3.6) + "deg");

            nullCircularProgress.style.background = `conic-gradient(var(--null-color-main) ${progressStartValue * 3.6}deg,#f6f7f9 0deg)`;

            if (progressStartValue == progressEndValue) {
                clearInterval(nullProgress)
            }

        }, speed);
    }
}

null_circular_progress("s1", {
    endValue: 30, // your dynamic  value
    speed: 50
});

/* End Circular Progress */

/* Start Tabs */

/**
 * Initializes a null tabs component.
 */

function null_tabs() {
    const nullTabs = document.querySelectorAll('[data-tab-target]');
    const nullTabContents = document.querySelectorAll('[data-tab-content]');

    let nullPrevTab = document.querySelector('[data-tab-target].active');

    // Get the tab to show based on the hash in the URL
    const nullHash = window.location.hash;
    const nullActiveTab = nullHash ? document.querySelector(`[data-tab-target="${nullHash}"]`) : null;

    // If there's no active tab based on the hash, default to the first tab
    const nullDefaultTab = nullTabs[0];


    // Return if there are no tabs on the page
    if (!nullTabs.length) {
        return;
    }

    // Set the initial active tab
    const nullInitialTab = nullActiveTab || nullDefaultTab;
    if (!nullInitialTab) {
        console.error(`No valid tab found for hash "${nullHash}"`);
        return;
    }
    nullInitialTab.classList.add('active');

    // Show the content for the initial active tab
    const nullInitialContent = document.querySelector(nullInitialTab.dataset.tabTarget);
    if (!nullInitialContent) {
        console.error(`No content found for tab "${nullInitialTab.dataset.tabTarget}"`);
        return;
    }

    nullInitialContent.classList.add('active');

    nullTabs.forEach(nullTab => {
        nullTab.addEventListener('click', (event) => {
            // To prevent href scroll
            event.preventDefault();
            if (nullPrevTab) {
                nullPrevTab.classList.remove('active');
            }

            const nullTarget = document.querySelector(nullTab.dataset.tabTarget);

            nullTabContents.forEach(nullTabContent => {
                nullTabContent.classList.remove('active');
            })

            nullTabs.forEach(nullTab => {
                nullTab.classList.remove('active');
            })
            nullTab.classList.add('active');

            nullTarget.classList.add('active');

            // Update the URL with the hash for the selected tab
            history.replaceState(null, null, `#${nullTarget.id}`);

            nullPrevTab = nullTab;
        })
    })

    // Listen for hash changes and update the active tab
    window.addEventListener('hashchange', () => {
        const nullHash = window.location.hash;
        const nullNewActiveTab = nullHash ? document.querySelector(`[data-tab-target="${nullHash}"]`) : null;
        const nullNewDefaultTab = nullTabs[0];
        const nullTabToActivate = nullNewActiveTab || nullNewDefaultTab;
        if (!nullTabToActivate) {
            console.error(`No valid tab found for hash "${nullHash}"`);
            return;
        }
        if (nullPrevTab) {
            nullPrevTab.classList.remove('active');
        }
        nullTabToActivate.click();
        nullPrevTab = nullTabToActivate;
    });
}

null_tabs();

/* End Tabs */

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

/* Start Scroll To Top */

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

// Invoke the function
null_scroll_to_top();

/* End Scroll To Top */

/* Start Sidebar */

/**
 * Initializes a null sidebar component.
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

