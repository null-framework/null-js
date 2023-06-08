/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Countdown */

/**
 * @name null_countdown
 * @description Start the countdown based on the given countdown date.
 * @param {string|number|Date} countdownDate - The countdown date. It can be a string representation of the date, a timestamp, or a Date object.
 */

function null_countdown(countdownDate) {
  let countdownTime;

  // Determine the countdown time based on the input type
  if (typeof countdownDate === 'string') {
    countdownTime = new Date(countdownDate).getTime();
  } else if (typeof countdownDate === 'number') {
    countdownTime = countdownDate;
  } else if (countdownDate instanceof Date) {
    countdownTime = countdownDate.getTime();
  } else {
    throw new Error('Invalid countdownDate');
  }

  let counter = setInterval(() => {
    // Get current timestamp
    let now = Date.now();

    // Calculate the difference between countdownTime and now
    let dateDiff = countdownTime - now;

    // Get elements with data-null-countdown attribute
    let countdownElements = document.querySelectorAll('[data-null-countdown]');

    if (countdownElements) {
      countdownElements.forEach((element) => {
        let unit = element.dataset.nullCountdown.toLowerCase();
        let value;

        switch (unit) {
          case 'days':
            value = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
            break;
          case 'hours':
            value = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            break;
          case 'minutes':
            value = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
            break;
          case 'seconds':
            value = Math.floor((dateDiff % (1000 * 60)) / 1000);
            break;
          default:
            throw new Error(`Invalid unit: ${unit}`);
        }

        element.textContent = value < 10 ? `0${value}` : value;
      });
    }

    // If the countdown is finished, clear the interval and remove the HTML code
    if (dateDiff < 0) {
      clearInterval(counter);
      countdownElements.forEach((element) => {
        element.parentNode.remove();
      });
    }
  }, 1);
}

/* End Countdown */
