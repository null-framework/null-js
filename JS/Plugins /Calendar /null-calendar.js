/*
 * Null JS v1.0.0 (https://null-js.com)
 * Copyright (c) 2023 Null JS
 * Licensed under MIT (https://opensource.org/licenses/MIT)
*/

/* Start Calendar */

/**
 * NullCalendar class represents a custom calendar object.
 */
class NullCalendar {

    /**
     * Creates an HTML element with the given tag name and arguments.
     * @param {string} tag - The HTML tag name for the new element.
     * @param {Object} args - The arguments for the new element. 
     */
    null_create_element(tag, args) {
        // Default values for parameters of the new element
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

    /**
     * Creates a new NullCalendar object.
     * @param {string} targetId - The ID of the target HTML element where the calendar will be drawn.
     */
    constructor(targetId) {
        this.date = new Date(); // Current date
        this.currentYear = this.date.getFullYear(); // Current year
        this.currentMonthNumber = this.date.getMonth(); // Current month number
        this.targetId = targetId; // ID of the target HTML element where the calendar will be drawn
        this.drawCalendar(this.targetId); // Draw the calendar
    }

    /**
     * Draws the calendar in the target HTML element with the given ID.
     * @param {string} targetId - The ID of the target HTML element where the calendar will be drawn.
     */
    drawCalendar(targetId) {

        // Clear the previous calendar
        const container = document.getElementById(targetId);
        while (container.firstChild) {
            container.firstChild.remove();
        }

        let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let currentMonth = monthNames[this.currentMonthNumber];

        let today = new Date();
        let todayDate = today.getDate();
        let todayMonth = today.getMonth();
        let todayYear = today.getFullYear();

        let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dayName = daysOfWeek[today.getDay()];


        let firstDayOfMonth = new Date(this.currentYear, this.currentMonthNumber, 1).getDay();
        let lastDateOfMonth = new Date(this.currentYear, this.currentMonthNumber + 1, 0).getDate();
        let lastDateOfLastMonth = new Date(this.currentYear, this.currentMonthNumber, 0).getDate();


        let daysNameHTML = "";

        for (let i = 0; i < daysOfWeek.length; i++) {
            let dayAbbreviation = daysOfWeek[i].slice(0, 3); // Extract the first three letters of each day
            daysNameHTML += `<li>${dayAbbreviation}</li>`;
        }


        let daysHTML = "";

        // Days from the previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysHTML += `<li class="inactive">${lastDateOfLastMonth - firstDayOfMonth + i + 1}</li>`;
        }

        // Days of the current month
        for (let i = 0; i < lastDateOfMonth; i++) {
            let day = i + 1;
            let isToday = (day === todayDate && this.currentMonthNumber === todayMonth && this.currentYear === todayYear) ? "active" : "";
            daysHTML += `<li class="${isToday}">${day}</li>`;
        }

        // Days of the next month
        let extraDays = 42 - (daysHTML.split('</li>').length - 1); // 42 because we want 6 weeks (6 * 7 = 42)
        for (let i = 0; i < extraDays; i++) {
            daysHTML += `<li class="inactive">${i + 1}</li>`;
        }

        let eventsHTML = "";


        if (this.eventsHTML) {
            eventsHTML = this.eventsHTML;
        }

        this.null_create_element("div", {
            attributes: {
                "data-null-day": dayName,
                "data-null-month": currentMonth,
                "data-null-year": this.currentYear,
            },
            html: `
                <div class="null-calendar-container">

                    <div class="null-calendar-header-container null-display-flex null-align-items-center null-justify-content-space-between null-margin-bottom-20">
                        
                        <span class="null-calednar-header-current-day null-font-weight-bold null-font-size-25">
                            ${currentMonth} ${this.currentYear}
                        </span>

                        <div class="null-calednar-header-icons null-display-flex null-gap-10 null-align-items-center">

                            <svg id="left" class="null-cursor-pointer" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20px" width="20px"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z">
                                </path>
                            </svg>

                            <svg id="right" class="null-cursor-pointer" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20px" width="20px"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
                                </path>
                            </svg>

                        </div>

                    </div>

                    <div class="null-calendar-body-container null-margin-bottom-20">
                        <ul class="null-calendar-body-weeks-container null-display-flex null-flex-wrap-wrap null-text-align-center">
                            ${daysNameHTML}
                        </ul>
                        <ul class="null-calendar-body-days-container null-display-flex null-flex-wrap-wrap null-text-align-center">
                            ${daysHTML}
                        </ul>
                    </div>

                </div>`,
            append: {
                position: "inside",
                target: document.getElementById(targetId)
            },
            callBack: (element) => {
                let leftIcon = element.querySelector('#left');
                let rightIcon = element.querySelector('#right');

                leftIcon.addEventListener("click", () => {
                    this.prevMonth();

                });

                rightIcon.addEventListener("click", () => {
                    this.nextMonth();
                });
            }
        });

    }


    /**
     * Moves the calendar to the previous month and redraws it.
     */
    prevMonth() {
        this.currentMonthNumber--;
        if (this.currentMonthNumber < 0) {
            this.currentMonthNumber = 11; // December
            this.currentYear--;
        }
        this.drawCalendar(this.targetId);
    }

    /**
     * Moves the calendar to the next month and redraws it.
     */
    nextMonth() {
        this.currentMonthNumber++;
        if (this.currentMonthNumber > 11) { // January of next year
            this.currentMonthNumber = 0;
            this.currentYear++;
        }
        this.drawCalendar(this.targetId);
    }

}

/* End Calendar */
