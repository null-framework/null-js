/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

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