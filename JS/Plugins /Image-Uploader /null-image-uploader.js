/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Image Uploader */

/**
 * ImageUploader class represents a custom image uploader object.
 */

class NullImageUploader {

/**
 * Creates an HTML element with the given tag name and arguments.
 * @param {string} tag - The HTML tag name for the new element.
 * @param {Object} args - The arguments for the new element. 
 */
    null_create_element(tag, args) {
        let defaults = {
            html: null, // HTML content to be inserted into the element
            attributes: {}, // Object representing the attributes to be added to the element
            append: {}, // Object containing where to append the element and the target element
            callBack: null // Callback function to be called after the element is created
        };

        // Combine default values and given arguments
        let params = { ...defaults, ...args };

        // Create new HTML element with given tag
        const element = document.createElement(tag);


        // If html property is present, insert it as innerHTML of the element
        if (params.html) {
            element.innerHTML = params.html;
        }

        // If attributes property is present, set them as attributes of the element
        if (params.attributes) {
            for (const property in params.attributes) {
                element.setAttribute(property, params.attributes[property]);
            }
        }

        // If callBack property is present, call it with the element as argument
        if (params.callBack) {
            params.callBack(element);
        }

        // If append property is present, append the element to target element at specified position
        if (params.append) {
            const { position, target } = params.append;

            switch (position) {
                case "inside":
                    target.appendChild(element);
                    break;

                case "before":
                    target.parentNode.insertBefore(element, target);
                    break;

                case "after":
                    target.parentNode.insertBefore(element, target.nextSibling);
                    break;

                default:
                    throw new Error(`Invalid append position: ${position}`);
            }
        }

        // Return the created element
        return element;
    }

    constructor(id, args = {}) {
        // Setting default parameters for the uploader
        this.defaults = {
            allowedExtensions: ["jpg", "png", 'webp', 'jpeg', 'jfif'],
            size: 2.180707,
            generateHTML: false,
        };

        // Combining default values and given arguments
        this.params = { ...this.defaults, ...args };

        // Storing the id of the uploader container
        this.id = id;

        // If generateHTML argument is an object, generate the HTML for the uploader
        if (typeof this.params.generateHTML === "object" && this.params.generateHTML !== null) {
            let { container, fileName, imageSource, chooseFile } = this.params.generateHTML;

            this.generateHTML(id, container, fileName, imageSource, chooseFile);
        }

        // Getting elements from the DOM
        this.container = document.querySelector(`#${id}`);
        if (!this.container) {
            return false;
        }else{
            this.defaultInput = this.container.querySelector('#null-default-image-input');
            this.customButton = this.container.querySelector('[data-null-image-uploader="null-custom-image-button"]');
            this.image = this.container.querySelector('#null-image');
            this.imageCheck = this.container.querySelector('[data-null-image-uploader="null-image-check"]');
            this.imageContainer = this.container.querySelector('.null-image-container');
            this.imageInformation = this.container.querySelector('.null-image-icon-container');
            this.imageSource = this.image.getAttribute('src');
            this.reg = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
        }

        // Initialize the uploader
        this.init();
    }

    /**
     * Generates the HTML for the uploader.
     * @param {string} id - The id of the uploader container element.
     * @param {HTMLElement} containerElement - The element to append the uploader to.
     * @param {string} fileName - The name attribute for the file input.
     * @param {string} imageSource - The initial source of the image.
     * @param {boolean} chooseFile - Should the "Choose a file" button be displayed.
     */
    generateHTML(id, containerElement, fileName, imageSource, chooseFile = true) {

        // Early return if containerElement is not provided
        if (!containerElement){
            return;
        }

        // Creating the "Choose a file" button HTML if required
        let chooseFileHTML = chooseFile ? `
        <a data-null-image-uploader="null-custom-image-button" class="null-flex null-background-main null-color-white null-cursor-pointer null-font-size-16 null-border-radius">
            Choose a file 
        </a>
        ` : '';

        // Creating the uploader HTML
        this.container = this.null_create_element("div", {
            html: `
                <label class="null-color-main null-font-weight-bold null-display-block null-margin-bottom-10 null-cursor-pointer" for="null-default-image-input">
                    Image :
                </label>
                <div class="null-image-uploader null-cursor-pointer null-background-white null-display-flex null-align-items-center null-justify-content-center null-position-relative">
                    <div class="null-image-container null-display-flex null-align-items-center null-justify-content-center">
                        <img data-null-image-uploader="null-image" id="null-image" src="${imageSource ? imageSource : ''}">
                    </div>
                    <div class="null-image-icon-container">
                        <div class="null-color-main null-flex">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="80px" width="80px" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"></path>
                            </svg>
                        </div>
                        <div>No file chosen, yet!</div>
                    </div>
                </div>
                <div id="null-image-name" class="null-margin-top-10 null-margin-bottom-10">
                    <span>Image Name:</span>
                    <span data-null-image-uploader="null-image-check" class="null-font-size-13">No image uploaded</span>
                </div>
                <input id="null-default-image-input" type="file" name="${fileName ? fileName : ''}" hidden />

                ${chooseFileHTML}


            `,
            attributes: {
                class: "null-image-uploader-container null-padding-20 null-box-shadow null-border-radius",
                id: id
            },
            append: {
                position: "inside",
                target: containerElement // document.getElementById("ImageContainer")
            }
        });
    }


    init() {
        // Set initial image visibility
        this.image.style.display = this.image.getAttribute("src") == "" ? "none" : "block";

        // If image source is present i.e., in edit mode
        if (this.imageSource) {
            this.imageInformation.style.display = "none";
            let valueStore = this.image.src.match(this.reg);
            this.imageCheck.textContent = valueStore;
        }

        // Adding event listeners
        this.imageContainer?.addEventListener("click", () => this.defaultInput.click());
        this.customButton?.addEventListener("click", () => this.defaultInput.click());
        this.image?.addEventListener("error", function () { this.style.display = "none"; });

        // File input change event
        this.defaultInput?.addEventListener("change", (e) => this.handleFileChange(e));
    }


    handleFileChange(e) {
        const file = e.target.files[0];
        const fileExtension = file.type.split("/").pop();

        // Checking if the file type is allowed
        if (!this.params.allowedExtensions.includes(fileExtension)) {
            this.defaultInput.value = "";
            alert("Allowed extensions are " + this.params.allowedExtensions.join(', '));
            return;
        }

        // Checking file size limit
        if (file.size > this.params.size * 1000000) {
            alert("Max size is " + this.params.size + "Mb");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;

            // Updating DOM elements after successful file read
            this.image.style.display = "block";
            this.image.src = result;
            this.container.classList.add("active");
            this.imageInformation.style.display = "none";
            this.imageCheck.textContent = file.name;
        };

        // Reading the file as DataURL
        reader.readAsDataURL(file);
    }

    
}

/* End Image Uploader */
