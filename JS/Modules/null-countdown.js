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

const Countdown = (() => {
  function countdown(countdownDate, options = {}) {
    // Validate countdownDate input
    if (!isValidDate(countdownDate)) {
      throw new Error('Invalid countdownDate');
    }

    const { interval = 1000, onTick, onEnd } = options;
    const countdownTime = getCountdownTime(countdownDate);
    const countdownElements = document.querySelectorAll('[data-null-countdown]');

    if (!countdownElements.length) {
      throw new Error('No countdown elements found');
    }

    const counter = setInterval(() => {
      const now = Date.now();
      const dateDiff = countdownTime - now;

      countdownElements.forEach((element) => {
        const unit = element.dataset.nullCountdown.toLowerCase();
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

        if (onTick && typeof onTick === 'function') {
          onTick(element, value, unit);
        } else {
          element.textContent = value < 10 ? `0${value}` : value;
        }
      });

      if (dateDiff < 0) {
        clearInterval(counter);
        countdownElements.forEach((element) => {
          element.parentNode.remove();
        });

        if (onEnd && typeof onEnd === 'function') {
          onEnd();
        }
      }
    }, interval);
  }

  function isValidDate(date) {
    return date instanceof Date || typeof date === 'number' || /^\d{4}-\d{2}-\d{2}$/.test(date);
  }

  function getCountdownTime(countdownDate) {
    if (countdownDate instanceof Date) {
      return countdownDate.getTime();
    }

    if (typeof countdownDate === 'number') {
      return countdownDate;
    }

    // Assume the date format is 'yyyy-mm-dd'
    return new Date(countdownDate).getTime();
  }

  return {
    countdown,
  };
})();

// Example usage
const countdownDate = new Date('2023-12-31');
const options = {
  interval: 1000, // Update every 1 second
  onTick: (element, value, unit) => {
    // Custom onTick callback to format countdown display
    element.textContent = `${value} ${unit}`;
  },
  onEnd: () => {
    // Custom onEnd callback
    console.log('Countdown has ended!');
  },
};

try {
  Countdown.countdown(countdownDate, options);
} catch (error) {
  console.error(error.message);
}

/* End Countdown */
