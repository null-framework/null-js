/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/**
 * @name null_initialize_form_fields
 * @description Initializes form fields with the provided configuration.
 * @param {HTMLFormElement} form - The form element to initialize the fields for.
 * @param {Object} args - An object containing the configuration for each field.
 */

function null_initialize_form_fields(form, args) {

  for (let field in args) {
    let input = form.querySelector("#" + field);

    // Ensure the input exists
    if (!input) {
      console.error(`Input not found for field: ${field}`);
      continue;
    }

    // Update placeholder if provided
    if (args[field].placeholder) {
      input.setAttribute("placeholder", args[field].placeholder);
    }

    // Update type if provided
    if (args[field].type) {
      input.setAttribute("type", args[field].type);
    }

  }

}

/**
 * @name null_password_validation
 * @description Validates a password field value based on the provided options and custom error messages.
 * @param {string} fieldValue - The password field value to validate.
 * @param {Object} passwordOptions - An object containing password validation options.
 * @param {Object} customErrorMessages - An object containing custom error messages for each validation option.
 * @param {HTMLElement} errorContainer - The error container element to update.
 * @returns {string} - An empty string if validation passes, otherwise the error message.
 */

function null_password_validation(fieldValue, passwordOptions, customErrorMessages, errorContainer) {
  // If customErrorMessages is not provided, assign an empty object
  if (typeof customErrorMessages === "undefined") {
    customErrorMessages = {};
  }


  const letters = /[a-zA-Z]/;
  const numbers = /[0-9]/;
  const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
  const capital = /[A-Z]/;

  if (passwordOptions.letters && !letters.test(fieldValue)) {
    errorContainer.classList.add("null-form-error");
    return customErrorMessages.letters || "Password must contain at least one letter.";
  }

  if (passwordOptions.numbers && !numbers.test(fieldValue)) {
    errorContainer.classList.add("null-form-error");
    return customErrorMessages.numbers || "Password must contain at least one number.";
  }

  if (passwordOptions.symbols && !symbols.test(fieldValue)) {
    errorContainer.classList.add("null-form-error");
    return customErrorMessages.symbols || "Password must contain at least one symbol.";
  }

  if (passwordOptions.capital && !capital.test(fieldValue)) {
    errorContainer.classList.add("null-form-error");
    return customErrorMessages.capital || "Password must contain at least one capital letter.";
  }

  return "";
}

/**
 * @name null_process_field_value
 * @description Processes a field value based on the provided field parameters.
 * @param {string} fieldValue - The field value to process.
 * @param {Object} fieldParams - An object containing the parameters for processing the field value.
 * @returns {string} - The processed field value.
 */

function null_process_field_value(fieldValue, fieldParams) {
  // Remove spaces
  if (fieldParams.removeSpaces) {
    fieldValue = fieldValue.toLowerCase().replace(/\s+/g, ' ').trim();
  }

  // Capitalize the first word
  if (fieldParams.capitalizeFirstWord) {
    fieldValue = fieldValue.toLowerCase().charAt(0).toUpperCase() + fieldValue.slice(1);
  }

  // Capitalize each word
  if (fieldParams.capitalizeEachWord) {
    fieldValue = fieldValue.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return fieldValue;
}

/**
 * @name null_form_validate
 * @description Validates a form based on the provided configuration and error messages.
 * @param {string} selector - The CSS selector for the form's submit button.
 * @param {Object} args - An object containing the configuration for each field.
 * @param {Object} errorMessages - An object containing custom error messages for each validation option.
 */

function null_form_validate(selector, args, errorMessages) {

  // If errorMessages is not provided, assign an empty object
  if (typeof errorMessages === "undefined") {
    errorMessages = {};
  }

  // Get the button of the form
  let button = document.querySelector(selector);

  if (button == null) { return }


  // Get the form
  let form = button.parentElement;


  // Initialize form fields
  null_initialize_form_fields(form, args);

  button.addEventListener("click", function (e) {
    e.preventDefault();

    // Perform validation
    let hasError = false;

    // Create an object to store the processed data
    let processedData = {};

    // Iterate over the input fields in the form
    for (let field in args) {
      let input = form.querySelector("#" + field);

      // Get the error container using the data-null-for attribute
      let errorContainer = form.querySelector(`[data-null-for="${field}"]`);

      // Ensure the error container exists
      if (!errorContainer) {
        console.error(`Error container not found for field: ${field}`);
        continue;
      }

      // Clear any existing error message
      errorContainer.innerHTML = "";
      errorContainer.classList.remove("null-form-error");
      errorContainer.classList.remove("null-form-success");

      let fieldValue = input.value.trim();
      let fieldParams = args[field];

      // Process the field value
      fieldValue = null_process_field_value(fieldValue, fieldParams);

      // Store the processed value in the processedData object
      processedData[field] = fieldValue;

      // Log input ID and value if debugMode is true for the specific field
      if (args[field].debugMode) {
        console.log(`Input ID: ${field}, Value: ${fieldValue}`);
      }

      // Required check
      if (fieldParams.required && fieldValue === "") {
        hasError = true;
        errorContainer.innerHTML = errorMessages.required || `Field is required`;
        errorContainer.classList.add("null-form-error");
      }
      // Type check
      else if (fieldParams.type) {
        // Min length check
        if (fieldParams.min && fieldValue.length < fieldParams.min) {
          hasError = true;
          errorContainer.innerHTML = errorMessages.min || `Minimum length is ${fieldParams.min} characters.`;
          errorContainer.classList.add("null-form-error");
        }
        // Max length check
        else if (fieldParams.max && fieldValue.length > fieldParams.max) {
          hasError = true;
          errorContainer.innerHTML = errorMessages.max || `Maximum length is ${fieldParams.max} characters.`;
          errorContainer.classList.add("null-form-error");
        }
        else {
          if (fieldParams.type === "text" && !/^[a-zA-Z\s]*$/.test(fieldValue)) {
            hasError = true;
            errorContainer.innerHTML = errorMessages.text || "Invalid input. Only letters and spaces allowed.";
            errorContainer.classList.add("null-form-error");
          } else if (fieldParams.type === "text" && fieldParams.showSuccess) {
            errorContainer.innerHTML = fieldValue;
            errorContainer.classList.add("null-form-success");
          } else if (fieldParams.type === "password") {
            const passwordError = null_password_validation(fieldValue, fieldParams.passwordOptions, fieldParams.customPasswordErrorMessages, errorContainer);
            if (passwordError) {
              hasError = true;
              errorContainer.innerHTML = passwordError;
            }
          } else if (fieldParams.type === "number" && !/^\d+$/.test(fieldValue)) {
            hasError = true;
            errorContainer.innerHTML = errorMessages.number || `Invalid input. Only numbers allowed`;
            errorContainer.classList.add("null-form-error");
          } else if (fieldParams.type === "number" && fieldParams.showSuccess) {
            errorContainer.innerHTML = fieldValue;
            errorContainer.classList.add("null-form-success");
          } else if (fieldParams.type === "email" && !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(fieldValue)) {
            hasError = true;
            errorContainer.innerHTML = errorMessages.email || `Invalid email address`;
            errorContainer.classList.add("null-form-error");
          } else if (fieldParams.type === "email" && fieldParams.showSuccess) {
            errorContainer.innerHTML = fieldValue;
            errorContainer.classList.add("null-form-success");
          }
        }
      }

      // If there are no errors and showSuccess is true, display a success message
      if (!hasError && fieldParams.showSuccess) {
        errorContainer.innerHTML = fieldValue;
        errorContainer.classList.add("null-form-success");
      }

    }

    // If there are no errors, submit the form
    if (!hasError) {
      form.submit();
    }
  });
}