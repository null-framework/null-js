/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Download File Automatically (NullDownloader) */

/**
 * NullDownloader Class
 * @class
 * @classdesc This class is responsible for managing the downloading behavior of a file.
 */
class NullDownloader {
  /**
   * @constructor
   * @param {Object} options - Options to initialize the downloader.
   */
  constructor(options) {
    // Retrieve all necessary DOM elements
    this.downloadButton             = document.querySelector("[data-null-download='null-download-button']");
    this.downloadDownCount          = document.querySelector("[data-null-download='null-download-downcount']");
    this.downloadPleaseWaitText     = document.querySelector("[data-null-download='null-download-please-wait-text']");
    this.downloadManualDownloadText = document.querySelector("[data-null-download='null-download-manual-text']");
    this.downloadManualDownloadLink = document.querySelector("[data-null-download='null-download-manual-link']");
    this.downloadManualContainer    = document.querySelector(".null-download-manual-container");

    // Check if the button exists on the page, if not return to prevent further execution
    if (!this.downloadButton) return;

    // Store the link and remove it from the DOM initially to prevent users from accessing it
    this.nullFileDownloadLink = this.downloadManualDownloadLink.cloneNode(true);
    this.downloadManualDownloadLink.remove();

    // Store the link href and the countdown time
    this.nullFileDownload = this.nullFileDownloadLink.href;
    this.timeLeft = options.second || 10;

    // Hide the download message and link by default
    this.downloadDownCount.innerText = '';
    this.downloadManualDownloadText.classList.add("null-display-none");

    // Initially hide 'please wait' text
    this.downloadPleaseWaitText.classList.add("null-display-none");

    // Store the necessary messages
    this.textAfterClick = options.text["null-download-message-after-click"][document.documentElement.lang.toLowerCase()];
    this.textSeconds = options.text["null-download-second"][document.documentElement.lang.toLowerCase()];
    this.downloaded = options.text["null-download-downcount"][document.documentElement.lang.toLowerCase()];
    this.manualLinkText = options.text["null-download-manual-link"][document.documentElement.lang.toLowerCase()]; // Store manual link text

    // Execute translation for elements other than the download count and the manual link
    for (let key in options.text) {
      if (key !== "null-download-downcount" && key !== "null-download-manual-link") {
        null_translator(`[data-null-download='${key}']`, options.text[key]);
      }
    }

    // Start download when the button is clicked
    this.downloadButton.addEventListener("click", this.startDownload.bind(this));
  }

  /**
   * Start the download process when the button is clicked.
   */
  startDownload() {
    // Remove the download button from the DOM
    this.downloadButton.remove();

    // Start the countdown
    this.downloadDownCount.innerHTML = `${this.textAfterClick} <span>${this.timeLeft}</span> ${this.textSeconds}`;

    let downloadTimer = setInterval(() => {
      this.timeLeft--;
      this.downloadDownCount.innerHTML = `${this.textAfterClick} <span>${this.timeLeft}</span> ${this.textSeconds}`;

      if (this.timeLeft <= 0) {
        // Stop the timer, start the download and display 'please wait' text
        clearInterval(downloadTimer);
        this.downloadPleaseWaitText.classList.add("null-display-block");
        window.location.href = this.nullFileDownload;

        // After a short delay, update the download status and display the manual download link
        setTimeout(() => {
          this.downloadDownCount.innerText = this.downloaded;
          this.downloadPleaseWaitText.classList.remove("null-display-block");
          this.downloadPleaseWaitText.classList.add("null-display-none");
          this.downloadManualDownloadText.classList.add("null-display-block");

          // Add translated text to the link and append it back to the DOM after countdown finishes
          this.nullFileDownloadLink.innerText = this.manualLinkText;
          this.downloadManualContainer.appendChild(this.nullFileDownloadLink);
        }, 2000);
      }
    }, 1000);
  }
}

/* End Download File Automatically (NullDownloader) */
